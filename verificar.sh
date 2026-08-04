#!/usr/bin/env bash
# Punto de entrada del verificador. Usa python3 del sistema.
set -euo pipefail
exec python3 "$(dirname "$0")/verificador.py" "$@"
