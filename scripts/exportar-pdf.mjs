#!/usr/bin/env node
/* Exporta el curso a un PDF descargable.
 *
 * Usa el Chrome que ya está instalado en la máquina en vez de Playwright: para
 * imprimir una página estática, una dependencia de 300 MB no se justifica.
 *
 * El curso es una sola página con todos los módulos, así que basta con servirlo,
 * abrirlo con `--headless --print-to-pdf` y quitar por CSS lo que no tiene
 * sentido en papel (la barra lateral, la búsqueda, los botones de checkpoint).
 *
 * Uso:  node scripts/exportar-pdf.mjs [salida.pdf]
 */
import { spawn, spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, writeFile, unlink, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITIO = join(RAIZ, 'sitio');
const SALIDA = process.argv[2] || join(RAIZ, 'pdf', 'claude-code-de-cero-a-configurado.pdf');

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((p) => existsSync(p));

if (!CHROME) {
  console.error(
    'No se encontró Chrome ni Chromium.\n' +
      'Instala uno, o exporta CHROME_BIN con la ruta al binario.',
  );
  process.exit(1);
}

/* Lo que sobra en papel: la navegación no navega, la búsqueda no busca, y los
   botones de checkpoint no se pueden pulsar. El contenido sí se conserva
   entero, incluidos los módulos que en pantalla están plegados. */
const CSS_IMPRESION = `
  @page { margin: 18mm 14mm; }
  aside, nav, .topbar, .buscar, .search, .progreso, .tema, button, .checkpoint button,
  [role="search"], .sidebar, .barra { display: none !important; }
  main, .contenido, body { margin: 0 !important; padding: 0 !important; max-width: none !important; }
  details { display: block !important; }
  details > * { display: revert !important; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  pre, table, figure, .cristiano, .trap, .ej { break-inside: avoid; }
  h1, h2, h3 { break-after: avoid; }
  a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 0.75em; opacity: .6; }
`;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

// Sirve `sitio/` e inyecta el CSS de impresión en el HTML al vuelo, para no
// tener que tocar el curso ni dejar restos en el repositorio.
function servir() {
  return new Promise((resolve) => {
    const srv = createServer(async (req, res) => {
      const ruta = (req.url || '/').split('?')[0];
      const archivo = join(SITIO, ruta === '/' ? 'index.html' : ruta.slice(1));
      try {
        let cuerpo = await readFile(archivo);
        const ext = extname(archivo);
        if (ext === '.html') {
          cuerpo = Buffer.from(
            cuerpo.toString('utf8').replace('</head>', `<style>${CSS_IMPRESION}</style></head>`),
          );
        }
        res.writeHead(200, { 'content-type': TIPOS[ext] || 'application/octet-stream' });
        res.end(cuerpo);
      } catch {
        res.writeHead(404).end('no encontrado');
      }
    });
    srv.listen(0, '127.0.0.1', () => resolve({ srv, puerto: srv.address().port }));
  });
}

const { srv, puerto } = await servir();
await mkdir(dirname(SALIDA), { recursive: true });

const args = [
  '--headless',
  '--disable-gpu',
  '--no-sandbox',
  '--no-pdf-header-footer',
  // El motor despliega los módulos con JavaScript; sin espera se imprime vacío.
  '--virtual-time-budget=12000',
  `--print-to-pdf=${SALIDA}`,
  `http://127.0.0.1:${puerto}/`,
];

const chrome = spawn(CHROME, args, { stdio: ['ignore', 'ignore', 'pipe'] });
let err = '';
chrome.stderr.on('data', (d) => (err += d));

const codigo = await new Promise((r) => chrome.on('close', r));
srv.close();

if (codigo !== 0 || !existsSync(SALIDA)) {
  console.error(`Chrome terminó con código ${codigo}`);
  if (err.trim()) console.error(err.trim().split('\n').slice(-5).join('\n'));
  process.exit(1);
}

const { size } = await stat(SALIDA);
// Un PDF de una sola página casi vacía pesa unos pocos KB: si sale así, el
// contenido no llegó a renderizarse y el archivo no sirve de nada.
const MINIMO = 60 * 1024;
if (size < MINIMO) {
  await unlink(SALIDA);
  console.error(
    `El PDF salió de ${(size / 1024).toFixed(0)} KB, por debajo de ${MINIMO / 1024} KB: ` +
      'el contenido no se renderizó. Se borró para no publicar un archivo vacío.',
  );
  process.exit(1);
}

console.log(`${SALIDA.replace(RAIZ + '/', '')} · ${(size / 1024 / 1024).toFixed(2)} MB`);
