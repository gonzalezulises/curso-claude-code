/* Contenido del curso «Claude Code a fondo» — Rizoma
   Bloques: p, ul, ol, cr, tr, term, ej, ck, tbl, glos, fig, diag, doc */

const SVG_CAPAS = `<svg viewBox="0 0 720 280" role="img" aria-label="Las capas de Claude Code: la sesión en el centro, y alrededor memoria, permisos, comandos, skills, subagentes y hooks">
<g font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="12">
<rect x="268" y="106" width="184" height="68" rx="10" fill="#289448" fill-opacity=".14" stroke="#289448" stroke-opacity=".65"/>
<text x="360" y="134" text-anchor="middle" fill="currentColor" font-size="13.5" font-weight="600">la sesión</text>
<text x="360" y="154" text-anchor="middle" fill="currentColor" fill-opacity=".65" font-size="11">tú y el agente</text>

<rect x="24" y="24" width="188" height="52" rx="8" fill="none" stroke="currentColor" stroke-opacity=".4"/>
<text x="40" y="46" fill="currentColor" font-size="12" font-weight="600">CLAUDE.md</text>
<text x="40" y="64" fill="currentColor" fill-opacity=".6" font-size="10.5">lo que no quieres repetir</text>

<rect x="508" y="24" width="188" height="52" rx="8" fill="none" stroke="currentColor" stroke-opacity=".4"/>
<text x="524" y="46" fill="currentColor" font-size="12" font-weight="600">permisos</text>
<text x="524" y="64" fill="currentColor" fill-opacity=".6" font-size="10.5">qué hace sin preguntar</text>

<rect x="24" y="204" width="188" height="52" rx="8" fill="none" stroke="#178A9A" stroke-opacity=".55"/>
<text x="40" y="226" fill="currentColor" font-size="12" font-weight="600">/comandos · skills</text>
<text x="40" y="244" fill="currentColor" fill-opacity=".6" font-size="10.5">lo que repites, guardado</text>

<rect x="508" y="204" width="188" height="52" rx="8" fill="none" stroke="#178A9A" stroke-opacity=".55"/>
<text x="524" y="226" fill="currentColor" font-size="12" font-weight="600">subagentes · hooks</text>
<text x="524" y="244" fill="currentColor" fill-opacity=".6" font-size="10.5">delegar y automatizar</text>

<g stroke="currentColor" stroke-opacity=".35" stroke-width="1.3" fill="none">
<path d="M212,58 C246,58 252,106 268,120"/><path d="M508,58 C474,58 468,106 452,120"/>
<path d="M212,222 C246,222 252,174 268,160"/><path d="M508,222 C474,222 468,174 452,160"/></g>
</g></svg>`;

const SVG_PERMISOS = `<svg viewBox="0 0 720 200" role="img" aria-label="Una acción del agente pasa por tres filtros: deny la bloquea, allow la deja pasar sola, y lo que no encaja te pregunta">
<defs><marker id="fx" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="currentColor"/></marker></defs>
<g font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="12">
<rect x="8" y="76" width="140" height="52" rx="8" fill="none" stroke="currentColor" stroke-opacity=".45"/>
<text x="78" y="100" text-anchor="middle" fill="currentColor" font-size="12" font-weight="600">el agente</text>
<text x="78" y="117" text-anchor="middle" fill="currentColor" fill-opacity=".6" font-size="10.5">quiere hacer algo</text>

<g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#fx)" stroke-opacity=".5">
<path d="M152,102 L196,102"/></g>

<rect x="200" y="20" width="160" height="46" rx="8" fill="#C32421" fill-opacity=".12" stroke="#C32421" stroke-opacity=".55"/>
<text x="280" y="42" text-anchor="middle" fill="currentColor" font-size="12" font-weight="600">deny</text>
<text x="280" y="58" text-anchor="middle" fill="currentColor" fill-opacity=".65" font-size="10.5">no, y no se pregunta</text>

<rect x="200" y="79" width="160" height="46" rx="8" fill="#289448" fill-opacity=".12" stroke="#289448" stroke-opacity=".55"/>
<text x="280" y="101" text-anchor="middle" fill="currentColor" font-size="12" font-weight="600">allow</text>
<text x="280" y="117" text-anchor="middle" fill="currentColor" fill-opacity=".65" font-size="10.5">sí, sin molestarte</text>

<rect x="200" y="138" width="160" height="46" rx="8" fill="#C26418" fill-opacity=".12" stroke="#C26418" stroke-opacity=".55"/>
<text x="280" y="160" text-anchor="middle" fill="currentColor" font-size="12" font-weight="600">lo demás</text>
<text x="280" y="176" text-anchor="middle" fill="currentColor" fill-opacity=".65" font-size="10.5">te pregunta</text>

<g stroke="currentColor" stroke-width="1.4" fill="none" marker-end="url(#fx)" stroke-opacity=".45">
<path d="M364,43 L410,43"/><path d="M364,102 L410,102"/><path d="M364,161 L410,161"/></g>

<rect x="414" y="20" width="298" height="164" rx="8" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-dasharray="5 4"/>
<text x="563" y="52" text-anchor="middle" fill="currentColor" font-size="11.5" font-weight="600">la regla de oro</text>
<text x="563" y="82" text-anchor="middle" fill="currentColor" fill-opacity=".75" font-size="11">en allow va lo que puedes deshacer</text>
<text x="563" y="104" text-anchor="middle" fill="currentColor" fill-opacity=".75" font-size="11">en deny lo que no tiene vuelta atrás</text>
<text x="563" y="134" text-anchor="middle" fill="#C26418" font-size="10.5">si dudas, déjalo preguntando:</text>
<text x="563" y="152" text-anchor="middle" fill="#C26418" font-size="10.5">molesta una vez, no un fin de semana</text>
</g></svg>`;

const CURSO = [

/* ══════════════════════════════════════════════════════════ MÓDULO 0 */
{ n:0, t:"Arranque", sub:"Qué es Claude Code, cómo comprobar que quedó bien instalado y cómo es una sesión.", les:[

{ t:"Un agente que vive en la terminal", b:[
  {k:"p", h:"Claude Code no es un editor ni una extensión: es un programa de terminal al que le hablas en español y que <strong>trabaja sobre la carpeta donde lo abriste</strong>. Lee tus archivos, los modifica, ejecuta comandos y lee lo que devuelven."},
  {k:"p", h:"Esa última parte es la que lo diferencia de un chat. Un chat te da una respuesta y te toca a ti probarla. Un agente en la terminal <strong>puede ejecutar la prueba, ver que falla y volver a intentarlo</strong> sin pasar por ti."},
  {k:"cr", t:"El bucle que lo define", h:"<p>Le pides algo. Lee lo que necesita, propone cambios, ejecuta lo que haga falta para comprobarlos, y mira el resultado. Si salió mal, corrige y repite.</p><p>Tú entras en dos momentos: cuando quiere hacer algo que no le has autorizado, y al final, cuando revisas lo que hizo. Todo el curso trata de <strong>afinar esos dos momentos</strong>: que te pregunte lo justo, y que lo que te entregue se pueda revisar.</p>"},
  {k:"p", h:"Y conviene decir lo que <strong>no</strong> es:"},
  {k:"ul", i:[
    "<strong>No es autónomo por defecto.</strong> Pide permiso antes de tocar cosas que no le autorizaste. Ese comportamiento se configura, y es el módulo 2.",
    "<strong>No recuerda entre sesiones.</strong> Cada vez empieza de cero, salvo lo que le dejes escrito en un archivo. Eso es el módulo 1.",
    "<strong>No es solo para programar.</strong> Cualquier cosa que se haga con archivos y comandos le sirve: renombrar cien archivos, revisar un CSV, preparar un despliegue."
  ]},
  {k:"diag", svg:SVG_CAPAS, cap:"En el centro, tú y el agente. Todo lo demás del curso son capas que hacen esa conversación más corta, más segura y más repetible."}
]},

{ t:"Comprobar que quedó bien instalado", b:[
  {k:"p", h:"Antes de pedirle nada conviene confirmar tres cosas: que el programa está, que su instalación está sana, y que sabe quién eres. Las tres se comprueban desde la terminal en menos de un minuto."},
  {k:"p", h:"El primero es el comando más útil del curso y casi nadie lo conoce: <code>claude doctor</code> revisa la instalación y te dice qué versión corre, cómo se instaló y si las actualizaciones automáticas funcionan."},
  {k:"ej", id:"0.1", min:"6 minutos", t:"revisar tu instalación",
    obj:"Confirmar que Claude Code está instalado, sano y autenticado, sin abrir todavía una sesión.",
    antes:"Necesitas una terminal. Si el comando <code>claude</code> no existe todavía, instálalo desde <a href=\"https://claude.com/code\" target=\"_blank\" rel=\"noopener\">claude.com/code</a> y reabre la terminal.",
    pasos:[
      {txt:"Descarga el kit del curso, que trae el verificador:", term:{t:"terminal", l:[{p:"$", c:"git clone https://github.com/gonzalezulises/curso-claude-code"},{p:"$", c:"cd curso-claude-code"}]}},
      {txt:"Pregunta qué versión tienes:", term:{t:"terminal", l:[{p:"$", c:"claude --version"}]}},
      {txt:"Pídele que se revise a sí mismo:", term:{t:"terminal", l:[{p:"$", c:"claude doctor"}]}},
      {txt:"Deja que el verificador confirme los tres puntos de este módulo:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh -m 0"}]}}
    ],
    ver:"<code>claude --version</code> devuelve algo como <code>2.1.221 (Claude Code)</code>. <code>claude doctor</code> muestra varias líneas: la versión que corre, la plataforma, el método de instalación y el estado de las actualizaciones. El verificador te confirma los checkpoints 0.1 a 0.3 con la versión y la ruta exactas.",
    falla:[
      "<strong><code>command not found: claude</code></strong> → o no está instalado, o la terminal se abrió antes de instalarlo. Cierra la ventana, abre otra y repite.",
      "<strong>El verificador dice que no detecta autenticación</strong> → abre <code>claude</code> una vez y sigue el inicio de sesión que te propone. Si usas una clave de API, tiene que estar en la variable <code>ANTHROPIC_API_KEY</code> de esa misma terminal.",
      "<strong>doctor menciona una versión distinta a <code>--version</code></strong> → suele haber dos instalaciones conviviendo. <code>claude doctor</code> te dice la ruta de la que manda."
    ],
    checks:[
      {id:"0.1", t:"Claude Code instalado y responde", kind:"auto"},
      {id:"0.2", t:"La instalación pasa el chequeo de salud", kind:"auto"},
      {id:"0.3", t:"Tienes una vía de autenticación configurada", kind:"auto"}
    ]}
]},

{ t:"Tu primera sesión", b:[
  {k:"p", h:"Una sesión se abre escribiendo <code>claude</code> dentro de la carpeta de un proyecto. A partir de ahí escribes en español. No hay sintaxis que aprender."},
  {k:"p", h:"Lo que sí conviene saber desde el principio son cuatro atajos que se escriben dentro de la sesión y empiezan por barra:"},
  {k:"tbl", head:["Escribes","Qué hace","Cuándo lo usas"], rows:[
    ["<code>/help</code>","Lista todo lo que puedes escribir","La primera vez, y cada vez que actualices"],
    ["<code>/clear</code>","Olvida la conversación y empieza limpio","Al cambiar de tarea: evita que mezcle contextos"],
    ["<code>/compact</code>","Resume lo hablado para liberar espacio","Cuando la conversación es larga y quieres seguir"],
    ["<code>/exit</code>","Cierra la sesión","Al terminar"]
  ]},
  {k:"tr", t:"El error de no usar /clear", h:"<p>La conversación entera viaja con cada mensaje. Si llevas una hora hablando de la pantalla de login y le pides algo del sistema de pagos, arrastra todo lo anterior: responde más lento, mezcla contextos y se le cuelan detalles del tema viejo.</p><p><strong>Una tarea, una sesión.</strong> Cuando cambies de asunto, <code>/clear</code>. Es gratis y arregla la mayoría de las quejas de «se puso tonto».</p>"},
  {k:"ej", id:"0.2", min:"8 minutos", t:"abrir, preguntar y salir",
    obj:"Tener una conversación completa con Claude Code sin pedirle todavía que cambie nada.",
    pasos:[
      {txt:"Entra en la carpeta de un proyecto tuyo y ábrelo:", term:{t:"terminal", l:[{p:"$", c:"cd /ruta/a/tu-proyecto"},{p:"$", c:"claude"}]}},
      {txt:"Pídele algo que no toque archivos. Por ejemplo: «explícame en tres frases qué hace este proyecto y por dónde empieza a ejecutarse»."},
      {txt:"Escribe <code>/help</code> y lee la lista una vez. No hace falta memorizarla."},
      {txt:"Sal con <code>/exit</code> y marca el checkpoint:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 0.4 --hecho"}]}}
    ],
    ver:"Una respuesta que menciona archivos reales de tu proyecto, no genéricos. Si te habla de «un archivo de configuración» sin nombrarlo, es que no leyó nada: pídele que lo mire.",
    falla:[
      "<strong>Pregunta si confía en la carpeta</strong> → es lo normal la primera vez en cada proyecto. Es la protección de la que trata el módulo 2.",
      "<strong>Responde en inglés</strong> → escríbele en español y seguirá en español. Si quieres fijarlo para siempre, se hace en el módulo 1."
    ],
    checks:[{id:"0.4", t:"Abriste una sesión y saliste con /exit", kind:"manual"}]},
  {k:"doc", i:[["https://docs.claude.com/en/docs/claude-code/overview","Documentación oficial: Claude Code"],["https://docs.claude.com/en/docs/claude-code/cli-reference","Referencia de la línea de comandos"]]}
]}
]},

/* ══════════════════════════════════════════════════════════ MÓDULO 1 */
{ n:1, t:"La memoria del proyecto", sub:"CLAUDE.md: lo que no quieres volver a explicar nunca más.", les:[

{ t:"Por qué cada sesión empieza de cero", b:[
  {k:"p", h:"Claude Code no recuerda la sesión de ayer. Es una decisión de diseño, no un defecto: así no arrastra suposiciones viejas ni datos de otro proyecto. Pero tiene un coste evidente — vuelves a explicar lo mismo cada mañana."},
  {k:"p", h:"La solución es un archivo de texto llamado <code>CLAUDE.md</code>. Se lee solo al abrir la sesión, y lo que pongas ahí es como si se lo hubieras dicho tú antes de empezar."},
  {k:"cr", t:"Dos alturas, dos propósitos", h:"<p><code>~/.claude/CLAUDE.md</code> — tus preferencias personales, para <strong>todos</strong> tus proyectos. Idioma, estilo, qué no quieres que haga nunca.</p><p><code>CLAUDE.md</code> en la raíz del proyecto — las reglas de <strong>ese</strong> proyecto: cómo se ejecutan las pruebas, qué carpetas no se tocan, qué librería se usa. Este se comparte con el equipo por git.</p><p>Los dos se leen y se suman. Lo personal no pisa lo del proyecto: conviven.</p>"},
  {k:"p", h:"La diferencia entre un archivo que funciona y uno que se ignora es la <strong>concreción</strong>. «Escribe código limpio» no cambia nada. «Las pruebas se ejecutan con <code>npm test</code>, nunca con <code>jest</code> directamente» sí."},
  {k:"tbl", head:["Regla que no sirve","Regla que sí"], rows:[
    ["Sigue las buenas prácticas","Los nombres de función en inglés y en <code>camelCase</code>"],
    ["Escribe tests","Toda función nueva en <code>src/core/</code> lleva su prueba al lado"],
    ["No rompas nada","No modifiques <code>migrations/</code>: son históricas"],
    ["Usa buen estilo de commits","Commits en inglés, formato <code>tipo: descripción</code>"]
  ]},
  {k:"ej", id:"1.1", min:"12 minutos", t:"escribir tus dos memorias",
    obj:"Un archivo personal con tus preferencias y otro con las reglas de tu proyecto, comprobando que los lee.",
    pasos:[
      {txt:"Dile al verificador dónde practicas:", term:{t:"terminal", l:[{p:"$", c:"export CURSO_PROYECTO=/ruta/a/tu-proyecto"}]}},
      {txt:"Crea o abre tu archivo personal. Escribe tres o cuatro líneas: en qué idioma quieres las respuestas, qué nunca debe hacer sin preguntar, cómo prefieres que te explique las cosas.", term:{t:"terminal", l:[{p:"$", c:"claude"},{p:">", c:"/memory"}]}},
      {txt:"En la raíz de tu proyecto, crea <code>CLAUDE.md</code> con cuatro o cinco reglas concretas de ese proyecto."},
      {txt:"Comprueba que los dos existen y tienen contenido:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh -m 1"}]}},
      {txt:"Abre una sesión nueva y pídele algo que toque una de tus reglas, <strong>sin mencionarla</strong>. Si dijiste que las pruebas van con <code>npm test</code>, pídele que añada una prueba y mira qué comando usa."},
      {txt:"Cuando confirmes que la respetó sola:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 1.3 --hecho"}]}}
    ],
    ver:"El verificador te dice cuántos caracteres útiles tiene cada archivo. Y en la sesión, el agente debería seguir tu regla sin que la repitas. Ese es el momento en que el archivo deja de ser teoría.",
    falla:[
      "<strong>El verificador dice que tiene pocos caracteres útiles</strong> → descuenta el encabezado de metadatos, así que cuenta solo lo que escribiste de verdad.",
      "<strong>Escribiste el archivo pero lo ignora</strong> → comprueba que está en la <strong>raíz</strong> del proyecto donde abres la sesión, no en una subcarpeta. Dentro de la sesión, <code>/memory</code> te muestra qué archivos cargó.",
      "<strong>Le pusiste demasiadas reglas</strong> → treinta reglas se diluyen. Empieza con cinco que de verdad te importen y añade cuando notes que falta una."
    ],
    checks:[
      {id:"1.1", t:"Tienes un CLAUDE.md global con tus preferencias", kind:"auto"},
      {id:"1.2", t:"Tu proyecto tiene su propio CLAUDE.md", kind:"auto"},
      {id:"1.3", t:"Comprobaste que respeta una regla sin recordársela", kind:"manual"}
    ]},
  {k:"doc", i:[["https://docs.claude.com/en/docs/claude-code/memory","Documentación oficial: memoria y CLAUDE.md"]]}
]}
]},

/* ══════════════════════════════════════════════════════════ MÓDULO 2 */
{ n:2, t:"Permisos", sub:"Decidir de antemano qué puede hacer sin preguntarte, y qué no debe hacer nunca.", les:[

{ t:"El equilibrio que hay que ajustar una vez", b:[
  {k:"p", h:"Recién instalado, Claude Code pregunta por casi todo. Eso es correcto al principio y cansa a la media hora: acabas dando a «sí» sin leer, que es exactamente el hábito que la protección quería evitar."},
  {k:"p", h:"El arreglo no es desactivar las preguntas, es <strong>decidir de antemano</strong> qué te da igual y qué no. Eso vive en <code>~/.claude/settings.json</code>, en un bloque llamado <code>permissions</code>."},
  {k:"diag", svg:SVG_PERMISOS, cap:"Cada acción pasa por los mismos tres filtros. Lo que no está en ninguna lista te pregunta."},
  {k:"cr", t:"Cómo se escribe una regla", h:"<p>Una regla nombra la herramienta y, entre paréntesis, a qué se aplica: <code>Bash(git status)</code>, <code>Bash(npm test)</code>, <code>Read(src/**)</code>. El asterisco vale como comodín, así que <code>Bash(git *)</code> cubre todos los comandos de git.</p><p>Van en tres listas: <code>allow</code> (hazlo sin preguntar), <code>deny</code> (no lo hagas nunca) y <code>ask</code> (pregunta siempre, aunque encaje en allow).</p>"},
  {k:"tr", t:"Lo que nunca debería estar en allow", h:"<p>La regla práctica: <strong>en <code>allow</code> va solo lo que puedes deshacer</strong>. Leer archivos, correr pruebas, ver el estado de git.</p><p>Fuera van los comandos sin vuelta atrás: <code>rm -rf</code>, <code>git push --force</code>, borrar ramas, cualquier cosa contra producción. Esos van en <code>deny</code>, y si necesitas uno alguna vez, lo escribes tú a mano en ese momento.</p><p>La asimetría importa: una autorización de más te puede costar un fin de semana; una pregunta de más te cuesta dos segundos.</p>"},
  {k:"ej", id:"2.1", min:"12 minutos", t:"escribir tus permisos",
    obj:"Dejar configurado qué puede hacer sin preguntarte y qué no debe hacer nunca, y comprobar que la lista de prohibidos funciona.",
    pasos:[
      {txt:"Mira cómo está hoy tu configuración:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh -m 2"}]}},
      {txt:"Abre los ajustes desde dentro de una sesión — es más seguro que editar el archivo a mano, porque valida lo que escribes:", term:{t:"terminal", l:[{p:"$", c:"claude"},{p:">", c:"/permissions"}]}},
      {txt:"Añade a <code>allow</code> tres cosas que hagas a diario y puedas deshacer. Buenas candidatas: <code>Bash(git status)</code>, <code>Bash(git diff)</code>, <code>Bash(npm test)</code>."},
      {txt:"Añade a <code>deny</code> lo que no quieres ni por accidente: <code>Bash(rm -rf *)</code>, <code>Bash(git push --force*)</code>."},
      {txt:"Comprueba que quedó guardado:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 2.2"}]}},
      {txt:"Pídele en la sesión que haga algo de tu lista de prohibidos. Debe negarse. Cuando lo veas:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 2.3 --hecho"}]}}
    ],
    ver:"El verificador cuenta cuántas reglas tienes en cada lista, por ejemplo <code>permissions: 32 en allow, 15 en deny</code>. Y al pedirle algo prohibido, el agente lo rechaza sin ofrecerte confirmarlo: eso es lo que distingue <code>deny</code> de una pregunta.",
    falla:[
      "<strong>Editaste el JSON a mano y dejó de funcionar</strong> → suele ser una coma de más al final de una lista. El verificador te dice si el archivo dejó de ser JSON válido.",
      "<strong>Pusiste una regla en allow y sigue preguntando</strong> → el patrón tiene que coincidir con el comando completo. <code>Bash(npm test)</code> no cubre <code>npm test -- --watch</code>; para eso, <code>Bash(npm test*)</code>.",
      "<strong>Te tienta desactivar todos los permisos</strong> → existe la opción y tiene su sitio: máquinas desechables sin acceso a tus datos. En tu equipo de trabajo, no."
    ],
    checks:[
      {id:"2.1", t:"settings.json existe y es JSON válido", kind:"auto"},
      {id:"2.2", t:"Definiste reglas de permisos", kind:"auto"},
      {id:"2.3", t:"Viste una petición de permiso y la denegaste", kind:"manual"}
    ]},
  {k:"doc", i:[["https://docs.claude.com/en/docs/claude-code/iam","Documentación oficial: permisos y control de acceso"],["https://docs.claude.com/en/docs/claude-code/settings","Referencia de settings.json"]]}
]}
]},

/* ══════════════════════════════════════════════════════════ MÓDULO 3 */
{ n:3, t:"Comandos propios", sub:"Convertir lo que escribes cada semana en algo que se llama con una barra.", les:[

{ t:"Un archivo de texto se vuelve un comando", b:[
  {k:"p", h:"Cuando llevas un tiempo notas que repites peticiones casi idénticas: «revisa este cambio buscando fallos de seguridad», «escribe el mensaje de commit siguiendo nuestro formato». Cambiar tres palabras cada vez es trabajo perdido."},
  {k:"p", h:"Un <strong>comando propio</strong> es un archivo de texto con esa petición dentro. Si lo guardas como <code>revisar.md</code>, dentro de la sesión lo llamas escribiendo <code>/revisar</code>."},
  {k:"cr", t:"Dónde se guardan", h:"<p><code>~/.claude/commands/</code> — disponibles en todos tus proyectos.</p><p><code>.claude/commands/</code> dentro del proyecto — solo ahí, y se comparten con el equipo por git.</p><p>El nombre del archivo es el nombre del comando. <code>desplegar.md</code> se convierte en <code>/desplegar</code>.</p>"},
  {k:"p", h:"Dentro del archivo escribes la petición como se la dirías tú. Si quieres que reciba datos al llamarlo, usas <code>$ARGUMENTS</code>, que se sustituye por lo que escribas después del comando."},
  {k:"ej", id:"3.1", min:"12 minutos", t:"crear tu primer comando",
    obj:"Convertir una petición que repites en un comando que se llama con una barra.",
    pasos:[
      {txt:"Piensa en algo que le pidas al menos una vez por semana. Si no se te ocurre, empieza por este: revisar un cambio antes de subirlo."},
      {txt:"Crea la carpeta y el archivo:", term:{t:"terminal", l:[{p:"$", c:"mkdir -p ~/.claude/commands"},{p:"$", c:"nano ~/.claude/commands/revisar.md"}]}},
      {txt:"Escribe dentro la petición completa, como se la dirías tú. Por ejemplo: «Revisa los cambios sin subir de este repositorio. Busca errores de lógica, datos sensibles escritos a mano y funciones que no se usen. Dime solo lo que haya que arreglar, ordenado por gravedad.»"},
      {txt:"Comprueba que quedó registrado:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 3.1"}]}},
      {txt:"Abre una sesión, escribe <code>/revisar</code> y confírmalo:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 3.2 --hecho"}]}}
    ],
    ver:"El verificador lista tus comandos con su nombre, por ejemplo <code>/build-check, /commit-push-pr</code>. Dentro de la sesión, <code>/</code> los muestra junto a los que vienen de serie.",
    falla:[
      "<strong>No aparece en la lista de la sesión</strong> → si la sesión ya estaba abierta cuando creaste el archivo, ciérrala y ábrela otra vez.",
      "<strong>El nombre tiene espacios o acentos</strong> → usa solo letras, números y guiones. <code>revisar-pr.md</code> sí, <code>revisar PR.md</code> no.",
      "<strong>Hace algo distinto cada vez</strong> → la petición es demasiado vaga. Un buen comando dice qué mirar, qué ignorar y en qué formato responder."
    ],
    checks:[
      {id:"3.1", t:"Creaste un comando propio con /", kind:"auto"},
      {id:"3.2", t:"Lo ejecutaste dentro de una sesión", kind:"manual"}
    ]},
  {k:"doc", i:[["https://docs.claude.com/en/docs/claude-code/slash-commands","Documentación oficial: comandos con barra"]]}
]}
]},

/* ══════════════════════════════════════════════════════════ MÓDULO 4 */
{ n:4, t:"Skills", sub:"Procedimientos completos que se cargan solos cuando hacen falta.", les:[

{ t:"La diferencia entre una regla y un procedimiento", b:[
  {k:"p", h:"Una regla de <code>CLAUDE.md</code> dice <em>cómo comportarse</em> y está siempre presente. Un <strong>skill</strong> enseña <em>cómo hacer algo concreto</em>: un procedimiento con sus pasos, y si hace falta con sus archivos de apoyo."},
  {k:"cr", t:"Por qué no es lo mismo que una regla", h:"<p>Las reglas están siempre cargadas y ocupan sitio en cada conversación. Un skill <strong>se carga solo cuando el agente decide que viene al caso</strong>, o cuando lo llamas escribiendo <code>/nombre-del-skill</code>.</p><p>Esa diferencia es la que permite tener cincuenta procedimientos guardados sin que ninguno estorbe cuando no toca.</p>"},
  {k:"p", h:"Un skill es una carpeta con un archivo <code>SKILL.md</code> dentro. Ese archivo lleva un encabezado con dos datos que importan mucho:"},
  {k:"ul", i:[
    "<strong><code>name</code></strong> — el nombre con el que lo llamas.",
    "<strong><code>description</code></strong> — cuándo debe usarse. Esta es la parte crítica: es lo único que el agente lee para decidir si cargarlo. Una descripción vaga hace que el skill no se active nunca, o que se active siempre."
  ]},
  {k:"tr", t:"La descripción decide si el skill existe", h:"<p>«Ayuda con despliegues» no le dice nada al agente. «Usar cuando se pida desplegar a producción, hacer rollback, o revisar por qué falló un despliegue» sí: nombra las situaciones concretas en las que aplica.</p><p>Si escribes un skill y nunca se activa, el problema casi siempre está en esa línea, no en el contenido.</p>"},
  {k:"ej", id:"4.1", min:"15 minutos", t:"escribir un skill para tu proyecto",
    obj:"Guardar un procedimiento de tu proyecto como skill y comprobar que queda disponible.",
    pasos:[
      {txt:"Mira qué skills tienes ya:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 4.1"}]}},
      {txt:"Elige un procedimiento de varios pasos que hagas de vez en cuando y siempre tengas que recordar: preparar una versión, cargar datos de prueba, revisar antes de un despliegue."},
      {txt:"Crea la carpeta dentro de tu proyecto:", term:{t:"terminal", l:[{p:"$", c:"mkdir -p $CURSO_PROYECTO/.claude/skills/mi-procedimiento"},{p:"$", c:"nano $CURSO_PROYECTO/.claude/skills/mi-procedimiento/SKILL.md"}]}},
      {txt:"Empieza el archivo con el encabezado entre tres guiones, y debajo los pasos:", term:{t:"archivo · SKILL.md", l:[{p:"", c:"---"},{p:"", c:"name: mi-procedimiento"},{p:"", c:"description: Usar cuando se pida preparar una versión nueva"},{p:"", c:"---"},{p:"", c:""},{p:"", c:"1. Comprobar que las pruebas pasan"},{p:"", c:"2. Actualizar el número de versión"},{p:"", c:"3. …"}]}},
      {txt:"Comprueba que quedó bien formado:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 4.2"}]}}
    ],
    ver:"El verificador confirma el skill y su nombre. En una sesión abierta en ese proyecto, escribir <code>/</code> debería mostrarlo entre las opciones.",
    falla:[
      "<strong>El verificador no lo encuentra</strong> → tiene que ser una carpeta con un archivo llamado exactamente <code>SKILL.md</code> en mayúsculas, dentro de <code>.claude/skills/</code>.",
      "<strong>Existe pero nunca se activa solo</strong> → reescribe la <code>description</code> nombrando las situaciones concretas. Mientras tanto puedes llamarlo a mano con <code>/mi-procedimiento</code>.",
      "<strong>Quieres que esté en todos tus proyectos</strong> → entonces va en <code>~/.claude/skills/</code> en vez de dentro del proyecto."
    ],
    checks:[
      {id:"4.1", t:"Tienes skills disponibles", kind:"auto"},
      {id:"4.2", t:"Escribiste un skill para tu proyecto", kind:"auto"}
    ]},
  {k:"doc", i:[["https://docs.claude.com/en/docs/claude-code/skills","Documentación oficial: skills"]]}
]}
]},

/* ══════════════════════════════════════════════════════════ MÓDULO 5 */
{ n:5, t:"Subagentes", sub:"Delegar una parte del trabajo a otro agente con su propio contexto.", les:[

{ t:"Para qué sirve tener más de uno", b:[
  {k:"p", h:"Hay tareas que ensucian la conversación: buscar en cuarenta archivos dónde se usa una función, revisar un cambio largo, leer registros. Todo eso entra en el contexto, ocupa sitio y te deja una sesión llena de ruido cuando lo que querías era el resumen."},
  {k:"p", h:"Un <strong>subagente</strong> hace ese trabajo en una conversación aparte y te devuelve solo la conclusión. La búsqueda de cuarenta archivos ocurre en su contexto, no en el tuyo."},
  {k:"cr", t:"Cuándo delegar y cuándo no", h:"<p><strong>Delega</strong> cuando el trabajo genera mucho texto intermedio que no necesitas: rastrear algo por el proyecto, revisar con un criterio concreto, resumir registros.</p><p><strong>No delegues</strong> lo que requiere ir y venir contigo. El subagente no te puede preguntar a mitad: recibe una tarea y devuelve un resultado.</p>"},
  {k:"p", h:"Se definen como archivos en <code>~/.claude/agents/</code> o en <code>.claude/agents/</code> del proyecto. Cada uno lleva su descripción, sus instrucciones y, opcionalmente, qué herramientas puede usar — un revisor que solo lee no debería poder escribir."},
  {k:"ej", id:"5.1", min:"14 minutos", t:"crear un revisor",
    obj:"Definir un subagente que revise cambios con tu criterio, y delegarle una revisión real.",
    pasos:[
      {txt:"Mira si ya tienes alguno:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 5.1"}]}},
      {txt:"Créalo con el asistente que trae la propia sesión, que es más rápido que escribir el archivo a mano:", term:{t:"terminal", l:[{p:"$", c:"claude"},{p:">", c:"/agents"}]}},
      {txt:"Descríbelo por lo que debe buscar, no por lo que debe ser. En vez de «eres un revisor experto», algo como: «revisa los cambios sin subir buscando datos sensibles escritos a mano, funciones sin usar y errores de lógica; responde con una lista ordenada por gravedad»."},
      {txt:"Dale solo las herramientas de lectura si su trabajo es revisar. Que no pueda escribir es parte del diseño."},
      {txt:"Comprueba que quedó guardado y después delégale una revisión de verdad:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 5.1"}]}},
      {txt:"Cuando veas su informe:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 5.2 --hecho"}]}}
    ],
    ver:"El verificador lista tus subagentes por nombre. Al delegarle una tarea, la sesión principal te muestra que arrancó y después te entrega su informe, sin todo el texto intermedio que generó por el camino.",
    falla:[
      "<strong>El informe es genérico</strong> → la descripción es vaga. Un subagente con instrucciones amplias devuelve resultados amplios.",
      "<strong>Tarda mucho</strong> → es lo esperado si le diste medio proyecto. Acota: «revisa solo los cambios sin subir», no «revisa el repositorio».",
      "<strong>Modificó archivos y no querías</strong> → no le quitaste las herramientas de escritura. Edítalo y déjale solo lectura."
    ],
    checks:[
      {id:"5.1", t:"Definiste al menos un subagente", kind:"auto"},
      {id:"5.2", t:"Delegaste una tarea y viste su informe", kind:"manual"}
    ]},
  {k:"doc", i:[["https://docs.claude.com/en/docs/claude-code/sub-agents","Documentación oficial: subagentes"]]}
]}
]},

/* ══════════════════════════════════════════════════════════ MÓDULO 6 */
{ n:6, t:"Hooks", sub:"Ejecutar algo tuyo, siempre, cuando pasa un evento. Sin depender de que el agente se acuerde.", les:[

{ t:"La diferencia entre pedirlo y garantizarlo", b:[
  {k:"p", h:"Puedes escribir en <code>CLAUDE.md</code> «ejecuta el formateador después de editar». A veces lo hará y a veces no: es una instrucción, y las instrucciones se interpretan."},
  {k:"p", h:"Un <strong>hook</strong> no se interpreta. Es un comando tuyo que el programa ejecuta <strong>siempre</strong> que ocurre un evento, decida el agente lo que decida. Es la diferencia entre pedir algo y garantizarlo."},
  {k:"cr", t:"Los eventos que más se usan", h:"<p><code>PreToolUse</code> — justo antes de que use una herramienta. Puede <strong>bloquearla</strong>: es el sitio para prohibir de verdad algo peligroso.</p><p><code>PostToolUse</code> — después. El sitio del formateador y del linter.</p><p><code>UserPromptSubmit</code> — cuando envías un mensaje. Sirve para inyectar contexto automáticamente.</p><p><code>Stop</code> — cuando el agente termina de responder. Para avisos y comprobaciones finales.</p>"},
  {k:"p", h:"Se configuran en <code>settings.json</code>, dentro del bloque <code>hooks</code>. Cada evento lleva una lista de comandos, y esos comandos reciben por la entrada estándar un JSON con lo que está pasando: qué herramienta, con qué argumentos, en qué archivo."},
  {k:"tr", t:"Un hook lento se nota en cada mensaje", h:"<p>Los hooks corren de forma síncrona: mientras tu comando no termine, la sesión espera. Un hook que tarda tres segundos convierte cada edición en tres segundos de pausa.</p><p>Que sean rápidos y silenciosos. Si necesitas algo pesado, que el hook lo lance en segundo plano y devuelva el control enseguida.</p>"},
  {k:"ej", id:"6.1", min:"15 minutos", t:"un hook que se note",
    obj:"Configurar un hook que haga algo visible después de cada edición, y verlo dispararse.",
    pasos:[
      {txt:"Mira si ya tienes hooks configurados:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 6.1"}]}},
      {txt:"Configúralo desde la sesión, que valida el formato:", term:{t:"terminal", l:[{p:"$", c:"claude"},{p:">", c:"/hooks"}]}},
      {txt:"Elige el evento <code>PostToolUse</code> y como comando algo inofensivo y visible. En un Mac, esto avisa cada vez que edita un archivo:", term:{t:"terminal", l:[{p:"$", c:"osascript -e 'display notification \"Archivo editado\" with title \"Claude Code\"'"}]}},
      {txt:"Si prefieres algo útil desde el primer día, pon el formateador de tu proyecto en su lugar."},
      {txt:"Comprueba que quedó guardado:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 6.1"}]}},
      {txt:"Pídele en la sesión que edite cualquier archivo. Cuando veas el hook dispararse:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 6.2 --hecho"}]}}
    ],
    ver:"El verificador te dice cuántos eventos tienen hook, por ejemplo <code>11 evento(s) con hook: UserPromptSubmit, PreToolUse, PostToolUse…</code>. Y al editar un archivo, tu comando se ejecuta sin que nadie se lo pida.",
    falla:[
      "<strong>No se dispara</strong> → los hooks se cargan al abrir la sesión. Si la tenías abierta, ciérrala y vuelve a entrar.",
      "<strong>La sesión se puso lenta</strong> → tu comando tarda demasiado. Pruébalo suelto en la terminal y cronométralo.",
      "<strong>El hook falla y bloquea todo</strong> → un hook que devuelve error en <code>PreToolUse</code> impide la acción, que a veces es lo que quieres y a veces no. Si te bloqueaste, edita <code>settings.json</code> a mano y quita el bloque."
    ],
    checks:[
      {id:"6.1", t:"Configuraste un hook en settings.json", kind:"auto"},
      {id:"6.2", t:"Viste el hook dispararse", kind:"manual"}
    ]},
  {k:"doc", i:[["https://docs.claude.com/en/docs/claude-code/hooks","Documentación oficial: hooks"]]}
]}
]},

/* ══════════════════════════════════════════════════════════ MÓDULO 7 */
{ n:7, t:"MCP", sub:"Darle acceso a cosas que están fuera de tu carpeta.", les:[

{ t:"Qué problema resuelve", b:[
  {k:"p", h:"Claude Code lee tu proyecto y ejecuta comandos. Pero tu trabajo no vive solo ahí: hay tickets, una base de datos, la documentación de una librería, el panel donde despliegas."},
  {k:"p", h:"<strong>MCP</strong> es el enchufe estándar para eso. Un servidor MCP le da al agente un conjunto de herramientas nuevas — consultar tus tickets, leer una tabla — sin que tengas que copiar y pegar información."},
  {k:"cr", t:"Vocabulario mínimo", h:"<p>Las siglas son de <span class=\"jerga\" title=\"Model Context Protocol: un estándar abierto para conectar asistentes con herramientas y datos externos.\">Model Context Protocol</span>. Lo importante es que es <strong>un estándar</strong>: el mismo servidor sirve para Claude Code, para Cursor y para otras herramientas. Lo que configures aquí no se pierde si cambias.</p>"},
  {k:"p", h:"Se añaden con <code>claude mcp add</code>. Hay dos formas habituales: un servicio por internet (transporte <code>http</code>) o un programa que corre en tu máquina."},
  {k:"tr", t:"claude mcp list puede mostrar tus credenciales", h:"<p>Muchos servidores se configuran con una clave dentro del propio comando. Cuando después ejecutas <code>claude mcp list</code>, esa clave <strong>aparece en pantalla en texto plano</strong>.</p><p>No es un fallo, pero tiene dos consecuencias prácticas: no ejecutes ese comando mientras compartes pantalla, y no pegues su salida en un ticket o en un chat sin revisarla. Si necesitas enseñar tu configuración, tapa las claves.</p>"},
  {k:"ej", id:"7.1", min:"12 minutos", t:"conectar tu primer servidor",
    obj:"Añadir un servidor MCP y comprobar que el agente puede usar sus herramientas.",
    pasos:[
      {txt:"Mira qué tienes conectado hoy. Ojo con la advertencia de arriba si no estás solo:", term:{t:"terminal", l:[{p:"$", c:"claude mcp list"}]}},
      {txt:"Añade uno. Si no tienes ninguno en mente, uno de documentación es buen primer caso, porque se nota enseguida:", term:{t:"terminal", l:[{p:"$", c:"claude mcp add --transport http <nombre> <url-del-servidor>"}]}},
      {txt:"Comprueba que aparece y que conecta:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 7.1"}]}},
      {txt:"Abre una sesión y pídele algo que solo pueda responder usando ese servidor. Si conectaste uno de documentación, pídele la firma exacta de una función de esa librería."}
    ],
    ver:"El verificador cuenta cuántos servidores tienes y cuántos conectan, por ejemplo <code>8 servidor(es) MCP configurado(s), 3 conectado(s)</code>. Que un servidor esté configurado y no conectado es normal: suele faltar autenticarse.",
    falla:[
      "<strong>Dice «Needs authentication»</strong> → el servidor está bien puesto pero falta iniciar sesión. Desde una sesión, <code>/mcp</code> te lleva al proceso.",
      "<strong>Configurado pero el agente no usa sus herramientas</strong> → pídeselo explícitamente la primera vez, nombrando el servidor. Si sigue sin usarlo, comprueba con <code>/mcp</code> que la sesión lo ve.",
      "<strong>Aviso de que los conectores están desactivados</strong> → suele salir cuando hay una <code>ANTHROPIC_API_KEY</code> definida, que tiene prioridad sobre tu sesión de claude.ai. Es informativo, no un error."
    ],
    checks:[{id:"7.1", t:"Tienes al menos un servidor MCP configurado", kind:"auto"}]},
  {k:"doc", i:[["https://docs.claude.com/en/docs/claude-code/mcp","Documentación oficial: MCP en Claude Code"]]}
]}
]},

/* ══════════════════════════════════════════════════════════ MÓDULO 8 */
{ n:8, t:"Plugins", sub:"Instalar de una vez lo que otros ya configuraron.", les:[

{ t:"Un paquete con todo dentro", b:[
  {k:"p", h:"Los cuatro módulos anteriores son cosas que escribes tú: comandos, skills, subagentes, hooks. Un <strong>plugin</strong> es un paquete que trae varias de esas piezas juntas, ya configuradas, listo para instalar."},
  {k:"p", h:"Se instalan desde un <span class=\"jerga\" title=\"Repositorio que publica una lista de plugins disponibles para instalar.\">marketplace</span>, que no es más que un repositorio con una lista. Puedes usar los públicos o montar el de tu equipo, que es la forma práctica de que ocho personas trabajen con la misma configuración."},
  {k:"cr", t:"Cuándo instalar y cuándo escribir el tuyo", h:"<p><strong>Instala</strong> cuando el problema no es tuyo: revisar pull requests, trabajar con un proveedor concreto, un flujo estándar de la industria.</p><p><strong>Escribe el tuyo</strong> cuando el procedimiento es de tu casa. Un plugin ajeno que hace el 70% de lo que necesitas suele costar más de adaptar que escribir el tuyo desde cero.</p>"},
  {k:"ej", id:"8.1", min:"10 minutos", t:"instalar un plugin",
    obj:"Añadir un marketplace, instalar un plugin y comprobar que sus piezas quedaron disponibles.",
    pasos:[
      {txt:"Mira qué tienes instalado:", term:{t:"terminal", l:[{p:"$", c:"claude plugin list"}]}},
      {txt:"Desde una sesión, el catálogo se explora con un comando:", term:{t:"terminal", l:[{p:"$", c:"claude"},{p:">", c:"/plugin"}]}},
      {txt:"Instala uno que te sirva de verdad. Si dudas, uno de revisión de código es el que antes se nota."},
      {txt:"Comprueba que quedó registrado:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 8.1"}]}},
      {txt:"Escribe <code>/</code> en la sesión: los comandos que trae el plugin aparecen con su nombre delante."}
    ],
    ver:"El verificador cuenta los plugins instalados y nombra algunos. En la sesión, sus comandos salen prefijados con el nombre del plugin, para que no choquen con los tuyos.",
    falla:[
      "<strong>Aparece como <code>disabled</code></strong> → instalado pero desactivado. Se activa desde <code>/plugin</code>, o en <code>settings.json</code> dentro de <code>enabledPlugins</code>.",
      "<strong>Sus comandos no aparecen</strong> → cierra y abre la sesión. Los plugins se cargan al arrancar.",
      "<strong>Instalaste varios y ahora hay ruido</strong> → desinstala lo que no uses. Cada plugin añade comandos y skills que compiten por la atención del agente."
    ],
    checks:[{id:"8.1", t:"Instalaste un plugin desde un marketplace", kind:"auto"}]},
  {k:"doc", i:[["https://docs.claude.com/en/docs/claude-code/plugins","Documentación oficial: plugins"]]}
]}
]},

/* ══════════════════════════════════════════════════════════ MÓDULO 9 */
{ n:9, t:"Sin sesión interactiva", sub:"Llamarlo desde un script, un cron o tu integración continua.", les:[

{ t:"El mismo agente, sin conversación", b:[
  {k:"p", h:"Todo lo anterior ocurre en una sesión donde tú escribes y él responde. Pero el mismo programa se puede llamar <strong>una sola vez, con una instrucción, y recoger la respuesta</strong>. Eso abre la puerta a automatizar."},
  {k:"p", h:"Se hace con <code>-p</code> (de <em>print</em>): ejecuta la petición, imprime el resultado y termina."},
  {k:"term", t:"terminal", l:[{p:"$", c:"claude -p \"resume en tres líneas qué cambió en el último commit\""}]},
  {k:"cr", t:"Para qué se usa de verdad", h:"<p>Un resumen automático de los cambios de la semana. Una primera revisión de cada pull request antes de que la vea una persona. Un script que traduce archivos nuevos. Un aviso cuando algo raro aparece en los registros.</p><p>La clave es que <strong>encaja donde ya tienes automatización</strong>: un cron, un GitHub Action, un script que ya corres.</p>"},
  {k:"p", h:"Cuando lo llamas desde un programa conviene pedir la respuesta en un formato que se pueda leer con código, no en prosa. Para eso está <code>--output-format</code>."},
  {k:"tr", t:"Automatizar hereda tus permisos", h:"<p>Un script no tiene a nadie delante para responder a una pregunta de permiso. Es tentador desactivar todas las comprobaciones para que no se quede colgado, y ahí está el peligro: un agente sin supervisión y sin límites, corriendo solo.</p><p>Lo correcto es al revés: <strong>dale una lista corta de herramientas permitidas</strong> con <code>--allowedTools</code>, la mínima para esa tarea. Si el script solo lee y resume, no necesita poder escribir.</p>"},
  {k:"ej", id:"9.1", min:"15 minutos", t:"tu primer script",
    obj:"Escribir un script que llame a Claude Code sin abrir sesión y devuelva algo útil.",
    pasos:[
      {txt:"Confirma que tu versión ofrece el modo no interactivo:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 9.1"}]}},
      {txt:"Pruébalo suelto, para ver la forma de la respuesta:", term:{t:"terminal", l:[{p:"$", c:"claude -p \"lista los tres archivos más grandes de este proyecto\""}]}},
      {txt:"Crea un script en tu proyecto que haga algo que repitas. Este resume los cambios sin subir:", term:{t:"archivo · resumen.sh", l:[{p:"", c:"#!/usr/bin/env bash"},{p:"", c:"set -euo pipefail"},{p:"", c:""},{p:"", c:"git diff --stat | claude -p \\"},{p:"", c:"  \"Resume estos cambios en tres viñetas para un mensaje de commit\" \\"},{p:"", c:"  --allowedTools \"Read\""}]}},
      {txt:"Hazlo ejecutable y pruébalo:", term:{t:"terminal", l:[{p:"$", c:"chmod +x resumen.sh"},{p:"$", c:"./resumen.sh"}]}},
      {txt:"Comprueba el checkpoint:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 9.2"}]}}
    ],
    ver:"El script devuelve texto y termina, sin abrir ninguna conversación. El verificador confirma que existe un script tuyo que usa <code>claude -p</code>.",
    falla:[
      "<strong>Se queda esperando</strong> → algo pidió un permiso que nadie puede conceder. Acota con <code>--allowedTools</code> a lo que de verdad necesita.",
      "<strong>Responde con prosa cuando querías datos</strong> → pídele el formato explícitamente en la instrucción, o usa <code>--output-format json</code> y léelo con código.",
      "<strong>Funciona a mano pero falla en el cron</strong> → un cron no hereda tu entorno. Comprueba que la ruta de <code>claude</code> y las variables de autenticación estén disponibles ahí."
    ],
    checks:[
      {id:"9.1", t:"Tu versión ofrece el modo no interactivo", kind:"auto"},
      {id:"9.2", t:"Escribiste un script que llama a claude -p", kind:"auto"}
    ]},
  {k:"doc", i:[["https://docs.claude.com/en/docs/claude-code/cli-reference","Referencia de la línea de comandos"],["https://docs.claude.com/en/docs/claude-code/headless","Documentación oficial: modo headless"]]}
]}
]},

/* ══════════════════════════════════════════════════════════ MÓDULO 10 */
{ n:10, t:"El día a día con git", sub:"Dónde encaja el agente en el ciclo de trabajo real, y dónde no.", les:[

{ t:"Lo que conviene delegarle y lo que no", b:[
  {k:"p", h:"Claude Code es bueno con git porque git se maneja por comandos y devuelve texto: puede ver el estado, leer un diff y proponer un mensaje de commit que describa lo que de verdad cambió."},
  {k:"p", h:"Pero hay una asimetría que conviene respetar desde el principio."},
  {k:"tbl", head:["Delégale","Hazlo tú"], rows:[
    ["Redactar el mensaje del commit leyendo el diff","Decidir qué entra en el commit"],
    ["Resumir qué cambió en una rama","Fusionar a la rama principal"],
    ["Encontrar el commit que introdujo un fallo","Reescribir historia que ya compartiste"],
    ["Preparar la descripción de un pull request","Aprobar y publicar"]
  ]},
  {k:"cr", t:"La regla que resume la tabla", h:"<p>Delega lo que <strong>se puede deshacer o solo produce texto</strong>. Quédate con lo que <strong>cambia lo que otros ven</strong>: publicar, fusionar, reescribir historia compartida.</p><p>No es desconfianza: es que el coste del error es asimétrico. Un mensaje de commit malo se corrige; un force-push sobre la rama del equipo arruina la mañana de varias personas.</p>"},
  {k:"p", h:"El módulo 2 es lo que hace esto automático. Si <code>Bash(git push --force*)</code> está en <code>deny</code>, la regla deja de depender de tu memoria."},
  {k:"ej", id:"10.1", min:"12 minutos", t:"un commit escrito por él, aprobado por ti",
    obj:"Dejar que prepare un commit completo a partir de tus cambios, revisarlo y decidir tú.",
    pasos:[
      {txt:"Comprueba que tu proyecto de práctica es un repositorio git:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 10.1"}]}},
      {txt:"Haz un cambio pequeño de verdad en tu proyecto. Que sea real: un cambio inventado da un mensaje inventado."},
      {txt:"Abre la sesión y pídele que lea lo que cambió y prepare el commit. Que no lo suba:", term:{t:"terminal", l:[{p:"$", c:"claude"},{p:">", c:"mira los cambios sin subir y prepara un commit con un mensaje que explique el porqué, no el qué. No lo subas todavía."}]}},
      {txt:"Lee el mensaje que propuso <strong>antes</strong> de aceptar. Si describe el qué («actualiza archivo») en vez del porqué, díselo y que lo reescriba."},
      {txt:"Cuando lo hayas revisado y decidido tú:", term:{t:"terminal", l:[{p:"$", c:"./verificar.sh 10.2 --hecho"}]}}
    ],
    ver:"Un mensaje de commit que menciona el motivo del cambio y no solo los archivos tocados. El verificador confirma que el repositorio está listo y te muestra el último commit.",
    falla:[
      "<strong>El mensaje describe archivos, no motivos</strong> → es lo que pasa cuando solo ve el diff. Dile en qué estabas trabajando y por qué; con contexto, el mensaje mejora mucho.",
      "<strong>Metió en el commit cosas que no querías</strong> → decidir qué entra sigue siendo tuyo. Prepara tú lo que va y pídele solo el mensaje.",
      "<strong>Lo subió sin preguntar</strong> → revisa tus permisos: <code>Bash(git push*)</code> no debería estar en <code>allow</code>."
    ],
    checks:[
      {id:"10.1", t:"El proyecto de práctica es un repositorio git", kind:"auto"},
      {id:"10.2", t:"Dejaste que preparara un commit y lo revisaste", kind:"manual"}
    ]},
  {k:"p", h:"Con esto tienes el ciclo completo: memoria para no repetirte, permisos para no vigilar, comandos y skills para lo que repites, subagentes para lo que ensucia, hooks para lo que no puede fallar, MCP y plugins para llegar más lejos, y el modo no interactivo para lo que ni siquiera quieres mirar."},
  {k:"doc", i:[["https://cursos.rizo.ma","Todos los cursos, en el orden en que conviene hacerlos"]]}
]}
]}

];
