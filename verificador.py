#!/usr/bin/env python3
"""
Verificador del curso «Claude Code a fondo».

Cada checkpoint se comprueba contra tu instalacion real: la CLI, los archivos
de configuracion y lo que `claude` responde. Lo que solo vive en la sesion
interactiva se marca como MANUAL y lo confirmas tu.

Uso:
    ./verificar.sh                 tabla completa
    ./verificar.sh 3.1             un checkpoint
    ./verificar.sh -m 5            todo el modulo 5
    ./verificar.sh 2.2 --hecho     marca un checkpoint MANUAL
    ./verificar.sh --resumen       progreso por modulo
    ./verificar.sh --listar        ids y tipos (lo usa coherencia.py)
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
PROGRESO = RAIZ / "progreso.json"
HOME = Path.home()
CLAUDE_DIR = HOME / ".claude"

AUTO, MANUAL = "auto", "manual"

VERDE, ROJO, AMBAR, GRIS, NEGRITA, FIN = (
    "\033[32m", "\033[31m", "\033[33m", "\033[90m", "\033[1m", "\033[0m")
if not sys.stdout.isatty() or os.environ.get("NO_COLOR"):
    VERDE = ROJO = AMBAR = GRIS = NEGRITA = FIN = ""


# ---------------------------------------------------------------- utilidades

def corre(cmd: list[str], timeout: int = 25) -> tuple[int, str]:
    try:
        p = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
        return p.returncode, (p.stdout + p.stderr).strip()
    except FileNotFoundError:
        return 127, "no encontrado"
    except subprocess.TimeoutExpired:
        return 124, "se agoto el tiempo de espera"
    except Exception as e:                                    # noqa: BLE001
        return 1, str(e)


def carga_progreso() -> dict:
    if PROGRESO.exists():
        try:
            return json.loads(PROGRESO.read_text("utf-8"))
        except json.JSONDecodeError:
            return {}
    return {}


def guarda_progreso(d: dict) -> None:
    PROGRESO.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", "utf-8")


def proyecto() -> Path | None:
    """Proyecto donde el alumno practica. Se declara con CURSO_PROYECTO.

    No se adivina: recorrer carpetas del usuario que nadie pidio inspeccionar
    seria pasarse, y ademas daria falsos positivos de otros proyectos.
    """
    p = os.environ.get("CURSO_PROYECTO")
    if not p:
        return None
    r = Path(p).expanduser()
    return r if r.is_dir() else None


def settings_usuario() -> dict | None:
    f = CLAUDE_DIR / "settings.json"
    if not f.exists():
        return None
    try:
        return json.loads(f.read_text("utf-8"))
    except json.JSONDecodeError:
        return None


def md_con_contenido(ruta: Path, minimo: int = 60) -> tuple[bool, int]:
    if not ruta.exists():
        return False, 0
    # se descuenta el frontmatter para no contar metadatos como contenido
    txt = ruta.read_text("utf-8", errors="ignore")
    cuerpo = re.sub(r"^---[\s\S]*?---", "", txt, count=1).strip()
    return len(cuerpo) >= minimo, len(cuerpo)


def falta_proyecto() -> tuple[bool, str]:
    return False, ("primero declara donde practicas: "
                   "export CURSO_PROYECTO=/ruta/a/tu-proyecto")


# ------------------------------------------------------------------- MÓDULO 0

def c_instalado():
    ruta = shutil.which("claude")
    if not ruta:
        return False, ("el comando `claude` no esta en el PATH. Instalalo desde "
                       "claude.com/code y reabre la terminal")
    cod, out = corre(["claude", "--version"])
    if cod != 0:
        return False, f"`claude --version` fallo: {out.splitlines()[0] if out else 'sin salida'}"
    return True, f"{out.splitlines()[0].strip()} en {ruta}"


def c_doctor():
    cod, out = corre(["claude", "doctor"])
    if cod != 0 and not out:
        return False, "`claude doctor` no respondio"
    datos = {}
    for linea in out.splitlines():
        if ":" in linea:
            k, _, v = linea.partition(":")
            datos[k.strip().lower()] = v.strip()
    metodo = datos.get("config install method") or datos.get("running", "?")
    if "not" in out.lower() and "installed" in out.lower():
        return False, f"doctor reporta un problema de instalacion: {out.splitlines()[0]}"
    return True, f"instalacion sana ({metodo})"


def c_autenticado():
    """No se imprime nada de la credencial: solo si hay una via configurada."""
    if os.environ.get("ANTHROPIC_API_KEY"):
        return True, "autenticado con ANTHROPIC_API_KEY (variable de entorno)"
    for f in (CLAUDE_DIR / ".credentials.json", CLAUDE_DIR / "credentials.json"):
        if f.exists():
            return True, f"credenciales guardadas en ~/.claude/{f.name}"
    st = settings_usuario() or {}
    if "apiKeyHelper" in st:
        return True, "autenticado con apiKeyHelper desde settings.json"
    return False, ("no se detecto ninguna via de autenticacion. Abre `claude` y sigue "
                   "el inicio de sesion, o define ANTHROPIC_API_KEY")


# ------------------------------------------------------------------- MÓDULO 1

def c_claude_md_global():
    ok, n = md_con_contenido(CLAUDE_DIR / "CLAUDE.md")
    if not ok and n == 0:
        return False, ("no existe ~/.claude/CLAUDE.md. Ahi van tus preferencias para "
                       "todos los proyectos")
    if not ok:
        return False, f"~/.claude/CLAUDE.md existe pero tiene {n} caracteres utiles"
    return True, f"~/.claude/CLAUDE.md con {n} caracteres"


def c_claude_md_proyecto():
    p = proyecto()
    if not p:
        return falta_proyecto()
    for nombre in ("CLAUDE.md", "AGENTS.md"):
        ok, n = md_con_contenido(p / nombre)
        if ok:
            return True, f"{nombre} en {p.name} con {n} caracteres"
    return False, (f"{p.name} no tiene CLAUDE.md ni AGENTS.md con contenido. "
                   f"Ahi se escriben las reglas del proyecto")


# ------------------------------------------------------------------- MÓDULO 2

def c_settings():
    st = settings_usuario()
    if st is None:
        f = CLAUDE_DIR / "settings.json"
        if f.exists():
            return False, "~/.claude/settings.json existe pero no es JSON valido"
        return False, "no existe ~/.claude/settings.json todavia"
    return True, f"settings.json valido con {len(st)} ajustes: {', '.join(list(st)[:5])}…"


def c_permisos():
    st = settings_usuario() or {}
    perm = st.get("permissions")
    if not isinstance(perm, dict):
        return False, ("settings.json no tiene bloque `permissions`. Ahi decides que "
                       "puede hacer Claude sin preguntarte")
    allow = perm.get("allow") or []
    deny = perm.get("deny") or []
    if not allow and not deny:
        return False, "el bloque `permissions` existe pero no tiene reglas en allow ni deny"
    return True, f"permissions: {len(allow)} en allow, {len(deny)} en deny"


# ------------------------------------------------------------------- MÓDULO 3

def c_slash_command():
    d = CLAUDE_DIR / "commands"
    p = proyecto()
    dirs = [d] + ([p / ".claude" / "commands"] if p else [])
    hallados = []
    for carpeta in dirs:
        if carpeta.is_dir():
            hallados += [f for f in carpeta.glob("*.md")]
    if not hallados:
        return False, ("no hay ningun comando propio. Crea ~/.claude/commands/<nombre>.md "
                       "y se convierte en /<nombre>")
    nombres = ", ".join("/" + f.stem for f in hallados[:4])
    return True, f"{len(hallados)} comando(s) propio(s): {nombres}"


# ------------------------------------------------------------------- MÓDULO 4

def c_skill():
    d = CLAUDE_DIR / "skills"
    if not d.is_dir():
        return False, "no existe ~/.claude/skills"
    skills = [s for s in d.iterdir() if (s / "SKILL.md").exists()]
    if not skills:
        return False, ("no hay ningun skill. Un skill es una carpeta con SKILL.md dentro "
                       "de ~/.claude/skills/")
    return True, f"{len(skills)} skill(s) disponibles, por ejemplo: {skills[0].name}"


def c_skill_propio():
    """Un skill escrito por el alumno, no los que vienen instalados."""
    p = proyecto()
    if not p:
        return falta_proyecto()
    d = p / ".claude" / "skills"
    if not d.is_dir():
        return False, (f"no existe {p.name}/.claude/skills. Ahi va un skill que solo "
                       f"aplica a este proyecto")
    propios = [s for s in d.iterdir() if (s / "SKILL.md").exists()]
    if not propios:
        return False, f"{p.name}/.claude/skills existe pero no tiene ningun SKILL.md"
    return True, f"skill propio del proyecto: {propios[0].name}"


# ------------------------------------------------------------------- MÓDULO 5

def c_subagente():
    d = CLAUDE_DIR / "agents"
    p = proyecto()
    dirs = [d] + ([p / ".claude" / "agents"] if p else [])
    hallados = []
    for carpeta in dirs:
        if carpeta.is_dir():
            hallados += list(carpeta.glob("*.md"))
    if not hallados:
        return False, ("no hay subagentes definidos. Crea ~/.claude/agents/<nombre>.md "
                       "con su descripcion y sus herramientas")
    return True, f"{len(hallados)} subagente(s): {', '.join(f.stem for f in hallados[:4])}"


# ------------------------------------------------------------------- MÓDULO 6

def c_hook():
    st = settings_usuario() or {}
    hooks = st.get("hooks")
    if not isinstance(hooks, dict) or not hooks:
        return False, ("settings.json no define hooks. Un hook ejecuta algo tuyo cuando "
                       "pasa un evento (antes de una herramienta, al enviar un prompt…)")
    eventos = list(hooks)
    return True, f"{len(eventos)} evento(s) con hook: {', '.join(eventos[:5])}"


# ------------------------------------------------------------------- MÓDULO 7

def c_mcp():
    cod, out = corre(["claude", "mcp", "list"], timeout=45)
    if cod == 127:
        return False, "el comando `claude` no esta disponible"
    lineas = [l for l in out.splitlines()
              if ":" in l and not l.lower().startswith(("checking", "no mcp"))
              and "⚠" not in l]
    if not lineas:
        return False, ("no hay servidores MCP configurados. Se agregan con "
                       "`claude mcp add`")
    conectados = [l for l in lineas if "✔" in l or "Connected" in l]
    return True, (f"{len(lineas)} servidor(es) MCP configurado(s), "
                  f"{len(conectados)} conectado(s)")


# ------------------------------------------------------------------- MÓDULO 8

def c_plugin():
    cod, out = corre(["claude", "plugin", "list"], timeout=45)
    if cod == 127:
        return False, "el comando `claude` no esta disponible"
    if "no plugins" in out.lower() or not out.strip():
        return False, "no hay plugins instalados. Se instalan desde un marketplace"
    nombres = re.findall(r"[❯\s]\s*([\w.-]+@[\w.-]+)", out)
    if not nombres:
        return False, f"no se pudo leer la lista de plugins: {out.splitlines()[0][:70]}"
    return True, f"{len(set(nombres))} plugin(s): {', '.join(sorted(set(nombres))[:3])}"


# ------------------------------------------------------------------- MÓDULO 9

def c_modo_print():
    """Comprueba que la CLI ofrece el modo no interactivo, sin gastar tokens."""
    cod, out = corre(["claude", "--help"], timeout=20)
    if cod != 0:
        return False, "`claude --help` no respondio"
    if "--print" not in out and "-p," not in out:
        return False, "esta version no expone el modo no interactivo (-p/--print)"
    formatos = "--output-format" in out
    return True, ("modo no interactivo disponible (-p/--print)"
                  + (" con --output-format" if formatos else ""))


def c_script_propio():
    p = proyecto()
    if not p:
        return falta_proyecto()
    candidatos = list(p.glob("*.sh")) + list((p / "scripts").glob("*.sh") if (p / "scripts").is_dir() else [])
    usan = [f for f in candidatos
            if "claude" in f.read_text("utf-8", errors="ignore")
            and re.search(r"claude\s+(-p|--print)", f.read_text("utf-8", errors="ignore"))]
    if not usan:
        return False, (f"ningun script de {p.name} usa `claude -p`. Escribe uno que "
                       f"llame a Claude sin abrir la sesion interactiva")
    return True, f"script que usa `claude -p`: {usan[0].name}"


# ------------------------------------------------------------------- MÓDULO 10

def c_git_limpio():
    p = proyecto()
    if not p:
        return falta_proyecto()
    if not (p / ".git").exists():
        return False, f"{p.name} no es un repositorio git"
    cod, out = corre(["git", "-C", str(p), "log", "--oneline", "-1"])
    if cod != 0:
        return False, f"git no pudo leer el historial de {p.name}"
    return True, f"repositorio listo, ultimo commit: {out.splitlines()[0][:60]}"


# ------------------------------------------------------------------- catálogo

CHECKS: list[dict] = [
    # 0 · Arranque
    {"id": "0.1", "t": "Claude Code instalado y responde", "kind": AUTO, "fn": c_instalado},
    {"id": "0.2", "t": "La instalacion pasa el chequeo de salud", "kind": AUTO, "fn": c_doctor},
    {"id": "0.3", "t": "Tienes una via de autenticacion configurada", "kind": AUTO, "fn": c_autenticado},
    {"id": "0.4", "t": "Abriste una sesion y saliste con /exit", "kind": MANUAL},

    # 1 · Memoria
    {"id": "1.1", "t": "Tienes un CLAUDE.md global con tus preferencias", "kind": AUTO,
     "fn": c_claude_md_global},
    {"id": "1.2", "t": "Tu proyecto tiene su propio CLAUDE.md", "kind": AUTO,
     "fn": c_claude_md_proyecto},
    {"id": "1.3", "t": "Comprobaste que respeta una regla sin recordarsela", "kind": MANUAL},

    # 2 · Permisos
    {"id": "2.1", "t": "settings.json existe y es JSON valido", "kind": AUTO, "fn": c_settings},
    {"id": "2.2", "t": "Definiste reglas de permisos", "kind": AUTO, "fn": c_permisos},
    {"id": "2.3", "t": "Viste una peticion de permiso y la denegaste", "kind": MANUAL},

    # 3 · Comandos propios
    {"id": "3.1", "t": "Creaste un comando propio con /", "kind": AUTO, "fn": c_slash_command},
    {"id": "3.2", "t": "Lo ejecutaste dentro de una sesion", "kind": MANUAL},

    # 4 · Skills
    {"id": "4.1", "t": "Tienes skills disponibles", "kind": AUTO, "fn": c_skill},
    {"id": "4.2", "t": "Escribiste un skill para tu proyecto", "kind": AUTO, "fn": c_skill_propio},

    # 5 · Subagentes
    {"id": "5.1", "t": "Definiste al menos un subagente", "kind": AUTO, "fn": c_subagente},
    {"id": "5.2", "t": "Delegaste una tarea y viste su informe", "kind": MANUAL},

    # 6 · Hooks
    {"id": "6.1", "t": "Configuraste un hook en settings.json", "kind": AUTO, "fn": c_hook},
    {"id": "6.2", "t": "Viste el hook dispararse", "kind": MANUAL},

    # 7 · MCP
    {"id": "7.1", "t": "Tienes al menos un servidor MCP configurado", "kind": AUTO, "fn": c_mcp},

    # 8 · Plugins
    {"id": "8.1", "t": "Instalaste un plugin desde un marketplace", "kind": AUTO, "fn": c_plugin},

    # 9 · Sin sesion interactiva
    {"id": "9.1", "t": "Tu version ofrece el modo no interactivo", "kind": AUTO, "fn": c_modo_print},
    {"id": "9.2", "t": "Escribiste un script que llama a claude -p", "kind": AUTO,
     "fn": c_script_propio},

    # 10 · Git
    {"id": "10.1", "t": "El proyecto de practica es un repositorio git", "kind": AUTO,
     "fn": c_git_limpio},
    {"id": "10.2", "t": "Dejaste que preparara un commit y lo revisaste", "kind": MANUAL},
]

POR_ID = {c["id"]: c for c in CHECKS}


# --------------------------------------------------------------------- salida

def evalua(check: dict, progreso: dict) -> tuple[str, str]:
    if check["kind"] == MANUAL:
        if progreso.get(check["id"]):
            return "manual-ok", "lo marcaste tu"
        return "falta", f"manual — cuando lo hagas: ./verificar.sh {check['id']} --hecho"
    ok, ev = check["fn"]()
    return ("ok" if ok else "falta"), ev


def pinta(check: dict, estado: str, evidencia: str) -> None:
    marca = {"ok": f"{VERDE}✓{FIN}", "manual-ok": f"{VERDE}✓{FIN}", "falta": f"{ROJO}·{FIN}"}[estado]
    tipo = f"{GRIS}auto{FIN}" if check["kind"] == AUTO else f"{AMBAR}manual{FIN}"
    print(f"  {marca} {NEGRITA}{check['id']}{FIN}  {check['t']}  [{tipo}]")
    print(f"      {GRIS}{evidencia}{FIN}")


def main() -> int:
    ap = argparse.ArgumentParser(add_help=False)
    ap.add_argument("id", nargs="?")
    ap.add_argument("-m", "--modulo")
    ap.add_argument("--hecho", action="store_true")
    ap.add_argument("--resumen", action="store_true")
    ap.add_argument("--listar", action="store_true")
    ap.add_argument("-h", "--help", action="store_true")
    a = ap.parse_args()

    if a.help:
        print(__doc__)
        return 0

    if a.listar:
        for c in CHECKS:
            print(f"{c['id']} [{c['kind']}] {c['t']}")
        return 0

    progreso = carga_progreso()

    if a.hecho:
        if not a.id or a.id not in POR_ID:
            print(f"{ROJO}Dime que checkpoint marcar. Ejemplo: ./verificar.sh 1.3 --hecho{FIN}")
            return 2
        ch = POR_ID[a.id]
        if ch["kind"] == AUTO:
            print(f"{ROJO}El checkpoint {a.id} es automatico: no se marca a mano.{FIN}")
            print(f"{GRIS}Se comprueba contra tu instalacion. Corre: ./verificar.sh {a.id}{FIN}")
            return 2
        progreso[a.id] = True
        guarda_progreso(progreso)
        print(f"{VERDE}✓ {a.id} marcado como hecho.{FIN}")
        return 0

    seleccion = CHECKS
    if a.id:
        if a.id not in POR_ID:
            print(f"{ROJO}No existe el checkpoint {a.id}.{FIN}")
            return 2
        seleccion = [POR_ID[a.id]]
    elif a.modulo:
        seleccion = [c for c in CHECKS if c["id"].split(".")[0] == a.modulo]
        if not seleccion:
            print(f"{ROJO}El modulo {a.modulo} no tiene checkpoints.{FIN}")
            return 2

    if a.resumen:
        print(f"\n{NEGRITA}Progreso por modulo{FIN}\n")
        for mod in sorted({c["id"].split(".")[0] for c in CHECKS}, key=int):
            delmod = [c for c in CHECKS if c["id"].split(".")[0] == mod]
            hechos = sum(1 for c in delmod if evalua(c, progreso)[0] in ("ok", "manual-ok"))
            barra = "█" * hechos + "░" * (len(delmod) - hechos)
            print(f"  Modulo {mod:>2}  {barra}  {hechos}/{len(delmod)}")
        print()
        return 0

    print(f"\n{NEGRITA}Claude Code a fondo — checkpoints{FIN}\n")
    fallan = 0
    for c in seleccion:
        estado, ev = evalua(c, progreso)
        if estado == "falta":
            fallan += 1
        pinta(c, estado, ev)
    total = len(seleccion)
    print(f"\n  {total - fallan}/{total} completados\n")
    return 1 if fallan else 0


if __name__ == "__main__":
    sys.exit(main())
