#!/usr/bin/env python3
"""
Comprueba que las cifras que anuncia el sitio coincidan con la realidad.

Escribir "15 checkpoints auto" en el hero y tener 17 es facil, no da ningun
error y nadie lo nota. Este script compara lo que dice la portada con lo que
declaran el curso y el verificador.

Uso: python3 scripts/comprobar-sitio.py
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
HTML = RAIZ / "sitio" / "index.html"
CURSO = RAIZ / "sitio" / "curso.js"
VERIF = RAIZ / "verificador.py"

errores: list[str] = []


def hero(etiqueta: str) -> int | None:
    """Lee el número de una tarjeta del hero por su etiqueta."""
    html = HTML.read_text("utf-8")
    m = re.search(r"<b>(\d+)</b><span>" + re.escape(etiqueta) + r"</span>", html)
    return int(m.group(1)) if m else None


# --- lo que declara el verificador ---
salida = subprocess.run([sys.executable, str(VERIF), "--listar"],
                        capture_output=True, text=True)
if salida.returncode != 0:
    print("no se pudo listar el verificador", file=sys.stderr)
    sys.exit(2)
tipos = re.findall(r"\d+\.\d+ \[(auto|manual)\]", salida.stdout)
auto_real = tipos.count("auto")
manual_real = tipos.count("manual")
total_real = len(tipos)

# --- lo que hay en el curso ---
texto = CURSO.read_text("utf-8")
ejercicios_real = texto.count('k:"ej"')
modulos_real = len(re.findall(r"^\{ n:\d+, t:\"", texto, re.M))

# --- lo que anuncia la portada ---
comparaciones = [
    ("checkpoints auto", auto_real),
    ("checkpoints manuales", manual_real),
    ("ejercicios guiados", ejercicios_real),
    ("módulos", modulos_real),
]
for etiqueta, real in comparaciones:
    dicho = hero(etiqueta)
    if dicho is None:
        continue                       # esa tarjeta no está en este curso
    if dicho != real:
        errores.append(f"la portada dice {dicho} {etiqueta}, y son {real}")

# contador del progreso y eyebrow
html = HTML.read_text("utf-8")
m = re.search(r'id="gnum">0/(\d+)<', html)
if m and int(m.group(1)) != total_real:
    errores.append(f"el contador dice 0/{m.group(1)} y hay {total_real} checkpoints")
m = re.search(r'class="eyebrow">(\d+) módulos · (\d+) checkpoints', html)
if m:
    if int(m.group(1)) != modulos_real:
        errores.append(f"el encabezado dice {m.group(1)} módulos y hay {modulos_real}")
    if int(m.group(2)) != total_real:
        errores.append(f"el encabezado dice {m.group(2)} checkpoints y hay {total_real}")

print(f"módulos {modulos_real} · checkpoints {total_real} "
      f"({auto_real} auto, {manual_real} manuales) · ejercicios {ejercicios_real}")
if errores:
    print("\n" + "\n".join("  ✗ " + e for e in errores))
    sys.exit(1)
print("\nla portada coincide con el contenido")
