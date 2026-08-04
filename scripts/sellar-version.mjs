/* Sella version.json y lo escribe dentro de index.html.
   El curso es un solo archivo sin paso de build, así que la versión tiene que
   quedar escrita en el HTML; este script es el único que la escribe y
   tests/verify.js comprueba que los dos no se hayan separado.

   La fecha sale del último commit que tocó index.html, no del día del build:
   redesplegar sin cambios no debe anunciar una actualización. */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const V = new URL('../version.json', import.meta.url);
const H = new URL('../sitio/index.html', import.meta.url);
const meta = JSON.parse(readFileSync(V, 'utf8'));

const bump = process.argv[2];
if (bump) {
  const [ma, mi, pa] = meta.version.split('.').map(Number);
  meta.version = bump === 'major' ? `${ma + 1}.0.0`
    : bump === 'minor' ? `${ma}.${mi + 1}.0`
    : `${ma}.${mi}.${pa + 1}`;
}
try {
  meta.actualizado = execSync('git log -1 --format=%cs -- sitio/', { encoding: 'utf8' }).trim()
    || meta.actualizado;
} catch { /* sin git: se conserva la fecha guardada */ }

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
function fechaLarga(iso) {
  const [a, m, d] = iso.split('-').map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}

let html = readFileSync(H, 'utf8');
/* se comprueba que los tres anclajes existan, no que el texto cambie: si la
   versión ya era la correcta no cambia nada y eso no es un error */
const ANCLAS = [
  [/<meta name="curso-version" content="[^"]*">/, `<meta name="curso-version" content="${meta.version}">`],
  [/<meta name="curso-actualizado" content="[^"]*">/, `<meta name="curso-actualizado" content="${meta.actualizado}">`],
  [/<span id="ver-pie">[^<]*<\/span>/,
   `<span id="ver-pie">Versión ${meta.version} · actualizado el ${fechaLarga(meta.actualizado)}</span>`],
];
const perdidas = ANCLAS.filter(([re]) => !re.test(html));
if (perdidas.length) {
  console.error(`no se encontraron ${perdidas.length} anclajes de versión en index.html`);
  process.exit(1);
}
for (const [re, valor] of ANCLAS) html = html.replace(re, valor);

writeFileSync(V, JSON.stringify(meta, null, 2) + '\n');
writeFileSync(H, html);
console.log(`v${meta.version} · actualizado ${meta.actualizado} — sellado en version.json e index.html`);
