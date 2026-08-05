---
description: Revisa los cambios sin commitear y reporta solo lo que rompería algo
---

Revisa `git diff` de los cambios sin commitear en este proyecto.

Reporta **solo** lo que causaría un fallo real: errores de lógica, casos no
contemplados, condiciones de carrera, consultas SQL sin parametrizar, secretos
en el código. No reportes preferencias de estilo ni nombres de variables.

Para cada hallazgo:
- El archivo y la línea
- Qué entrada concreta lo hace fallar
- La corrección mínima

Si no encuentras nada, dilo en una línea. No inventes hallazgos para parecer útil.
