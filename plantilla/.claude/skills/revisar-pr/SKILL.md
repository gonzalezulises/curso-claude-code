---
name: revisar-pr
description: >-
  Revisa un pull request de este proyecto siguiendo su checklist. Úsalo cuando
  se pida revisar un PR, revisar cambios antes de mergear, o comprobar si una
  rama está lista.
---

# Revisar un pull request

Un procedimiento, no una regla: se sigue paso a paso y cada paso tiene una
salida comprobable.

## Pasos

1. `git diff main...HEAD` para ver el alcance real, no solo el último commit.
2. Comprueba que las pruebas pasan: ejecuta el comando de pruebas del proyecto.
3. Revisa el diff buscando **solo** lo que rompería algo en producción.
4. Comprueba que el PR no toca nada de la sección «Qué no tocar» de `CLAUDE.md`.
5. Escribe el veredicto: bloqueante, con observaciones, o listo.

## Qué es bloqueante

- Las pruebas no pasan
- Toca archivos de la lista de «no tocar» sin justificarlo
- Introduce un secreto en el código
- Cambia comportamiento sin una prueba que lo cubra

## Qué no lo es

Estilo, nombres, y preferencias personales. Si el proyecto tiene formateador
automático, no comentes formato.
