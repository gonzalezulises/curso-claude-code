# Claude Code a fondo

Curso práctico de Claude Code: de la primera sesión a tenerlo trabajando dentro de tus scripts.
Once módulos, 24 checkpoints, y todo lo comprobable comprobado contra tu propia instalación.

**En vivo:** https://cursoclaudecode.rizo.ma

---

## Los dos entregables

La página es el mapa; **el verificador es la verdad**. Lo que marcas en el navegador vive en tu
navegador. Lo que cuenta lo comprueba `./verificar.sh` contra lo que tienes instalado.

```bash
git clone https://github.com/gonzalezulises/curso-claude-code
cd curso-claude-code

./verificar.sh              # la tabla completa
./verificar.sh -m 6         # solo el módulo 6
./verificar.sh 1.3 --hecho  # marcar un checkpoint manual
./verificar.sh --resumen    # progreso por módulo
```

Varios módulos trabajan sobre un proyecto tuyo. Se lo dices así:

```bash
export CURSO_PROYECTO=/ruta/a/tu-proyecto
```

No se adivina a propósito: recorrer carpetas que nadie pidió inspeccionar sería pasarse, y daría
falsos positivos de otros proyectos.

## Qué se comprueba de verdad

**17 automáticos y 7 manuales.** Los automáticos leen tu instalación real:

| Se comprueba con | Checkpoints |
|---|---|
| `claude --version`, `claude doctor` | instalación sana y autenticada |
| `~/.claude/CLAUDE.md` y el del proyecto | memoria, descontando el frontmatter |
| `settings.json` | JSON válido, bloque `permissions`, `hooks` |
| `~/.claude/commands`, `skills`, `agents` | lo que hayas creado tú |
| `claude mcp list`, `claude plugin list` | servidores y plugins |
| `claude --help` | que tu versión ofrezca `-p` |

Los manuales son lo que solo ocurre dentro de la sesión interactiva: ver un permiso denegado,
ver un hook dispararse, leer el informe de un subagente. **Los automáticos no se pueden marcar a
mano**; intentarlo devuelve el comando que sí los comprueba.

Cada checkpoint devuelve **evidencia**, no un «correcto»: la versión exacta, cuántas reglas hay
en `allow` y en `deny`, el nombre de tus comandos.

## Antes de publicar

```bash
node --check sitio/curso.js
python3 ~/.claude/skills/curso-cli-verificable/scripts/coherencia.py sitio/curso.js verificador.py
python3 scripts/comprobar-sitio.py
node scripts/sellar-version.mjs
```

- **coherencia.py** — que los identificadores y tipos del curso coincidan con los del verificador.
- **comprobar-sitio.py** — que las cifras del hero no mientan. Escribir «15 checkpoints auto»
  cuando son 17 no da ningún error y nadie lo nota; este script sí. Pasó de verdad al construir
  el curso.

## Sobre el contenido

Los comandos salen de ejecutar `claude --help` y los subcomandos reales, no de la memoria. La
advertencia de que **`claude mcp list` imprime las credenciales en texto plano** apareció
explorando la CLI para diseñar los checkpoints, y ahora es una de las trampas del módulo 7: es
justo el comando que uno enseña cuando comparte pantalla.
