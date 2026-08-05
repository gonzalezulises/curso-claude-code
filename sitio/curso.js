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
{k:"tr", t:"La confianza es el riesgo, no la incompetencia", h:"<p>El fallo que más caro sale con estas herramientas no es que se equivoquen: es que se equivocan con el mismo tono con el que aciertan. Un compilador que falla da un error; un agente que falla da una respuesta bien redactada.</p><p>Eso desactiva la alarma que sí tienes con otras herramientas, y explica por qué las capas de este curso —verificación, hooks, subagente independiente— no son adornos: son el sustituto de esa alarma.</p><p>La costumbre práctica que más protege: <strong>pide siempre que compruebe, y comprueba tú que comprobó</strong>. «Las pruebas pasan» es una afirmación que se verifica en dos segundos.</p>"},

{k:"p", h:"Lo que sigue son once módulos, y el hilo que los une es uno solo: pasar de pedirle cosas a montarle un sitio donde trabajar. Reglas para que sepa dónde está, permisos para que pueda actuar, verificación para que no se declare terminado antes de tiempo, y automatización para que no dependa de que tú te acuerdes."},

{k:"p", h:"Una advertencia sobre el orden de lectura: los módulos del 3 al 8 —comandos, skills, subagentes, hooks, MCP, plugins— son capacidades que se añaden cuando aparece la necesidad, no una lista que haya que completar."},
  {k:"p", h:"Si intentas montarlo todo antes de trabajar, acabas con una configuración elaborada que no usas y que además te estorba. Haz los tres primeros, trabaja una semana, y vuelve al que resuelva lo que te haya molestado."},

{k:"tbl", head:["Lo que pides","Lo que puede hacer de más que un chat"], rows:[
    ["«Arregla este fallo»","Reproducirlo ejecutando el proyecto, y verificar el arreglo"],
    ["«Añade una prueba»","Correrla y comprobar que falla antes y pasa después"],
    ["«¿Por qué cambió esto?»","Buscar en el historial de git y leer los commits"],
    ["«Actualiza esta dependencia»","Instalarla y ver si algo se rompió"]
  ]},
  {k:"p", h:"La columna derecha es la que justifica todo el curso. Sin ella, cualquier chat sirve; con ella, el ciclo de escribir-comprobar-corregir ocurre sin que tú seas el mensajero entre las dos mitades."},

{k:"p", h:"Sobre para quién es este curso: para quien ya programa. Estas herramientas aceleran a quien sabe leer el resultado y multiplican los errores de quien no — con una seguridad que hace difícil detectarlos. No es una advertencia moral, es una descripción de cómo funciona."},
  {k:"p", h:"Y sobre qué esperar al final: once módulos, veinticuatro checkpoints y un proyecto tuyo configurado. No vas a salir sabiéndolo todo; vas a salir con las cinco capas montadas —memoria, permisos, comandos, verificación y automatización— y con criterio para decidir cuándo añadir la sexta."},

{k:"p", h:"Vale la pena situar de qué tamaño es el cambio. No estás aprendiendo una herramienta más: estás cambiando quién ejecuta. Hasta ahora tú escribías y la máquina obedecía instrucciones exactas. Ahora describes un resultado y algo intermedio decide los pasos."},
  {k:"p", h:"Eso trae una habilidad nueva que no tenías que ejercitar antes: <strong>saber cuándo desconfiar</strong>. Un compilador que se equivoca da un error; un agente que se equivoca da una respuesta con la misma seguridad que cuando acierta. Buena parte de este curso es montar comprobaciones para no depender de esa seguridad."},

{k:"glos", i:[
    ["sesión","Una conversación con el agente, desde que escribes <code>claude</code> hasta que sales. Al salir se pierde, salvo lo que hayas dejado escrito en archivos."],
    ["contexto","Todo lo que el agente tiene delante al responder: tu petición, los archivos que leyó, las salidas de los comandos que ejecutó y las reglas del proyecto. Es limitado."],
    ["herramienta","Cada cosa que el agente sabe hacer además de escribir: leer un archivo, ejecutar un comando, buscar en la web. Los permisos deciden cuáles puede usar sin preguntarte."],
    ["CLAUDE.md","El archivo de reglas del proyecto. Se lee solo al empezar cada sesión."],
    ["hook","Un comando tuyo que se ejecuta automáticamente antes o después de que el agente use una herramienta. Es código, no una petición."],
    ["MCP","Un protocolo para conectar el agente a sistemas externos —una base de datos, un gestor de incidencias— con herramientas que aparecen como propias."]
  ]},

{k:"p", h:"Antes de nada, la pregunta que decide si este curso te sirve: <strong>¿pasas más tiempo en el editor o en la terminal?</strong> Si es lo primero, Claude Code te va a parecer incómodo las primeras horas. Si es lo segundo, va a encajar en lo que ya haces desde el primer día."},
  {k:"tr", t:"No es un chat que además escribe código", h:"<p>La confusión más común es tratarlo como un asistente de conversación al que le pides fragmentos. Si lo usas así, es peor que un chat en el navegador — tiene menos interfaz y ninguna ventaja.</p><p>La diferencia está en que <strong>puede actuar y comprobar</strong>: lee tus archivos, ejecuta tus pruebas, ve el error real y vuelve a intentarlo. Ese ciclo cerrado es todo lo que ofrece de más, y es mucho.</p><p>La consecuencia práctica: en vez de «escríbeme una función que valide correos», pídele «añade validación de correo al formulario de registro y comprueba que las pruebas siguen pasando». Lo segundo aprovecha lo que sabe hacer; lo primero no.</p>"},
  {k:"p", h:"Y una advertencia sobre el ritmo del curso. Son once módulos y no hay que hacerlos seguidos. Los tres primeros —arranque, memoria y permisos— son los que cambian el día a día. Del cuatro en adelante son capacidades que se añaden cuando las necesitas, y si intentas configurarlo todo antes de trabajar acabarás con un montaje que no usas."},

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
{k:"p", h:"Y si algo sigue sin cuadrar después de comprobar las tres cosas, el propio <code>claude doctor</code> suele decir qué falta. Es la herramienta de diagnóstico y casi nadie la usa dos veces."},

{k:"p", h:"Si trabajas en una empresa con restricciones, este es el momento de comprobarlas: hay configuraciones que se imponen desde la organización y pueden limitar qué modelos o qué funciones tienes disponibles. Descubrirlo ahora ahorra confusión en los módulos de permisos y MCP."},
  {k:"p", h:"Y si la instalación la gestiona otro equipo, pídeles la versión: buena parte de lo que este curso describe necesita una razonablemente reciente."},

{k:"p", h:"Con la instalación comprobada tienes lo mínimo para empezar. Todo lo demás del curso —reglas, permisos, comandos— se monta sobre un proyecto tuyo, así que conviene tener uno a mano antes de seguir. No hace falta que sea grande; hace falta que sea real."},

{k:"p", h:"Si algo de este módulo falla y no sabes por dónde seguir, el orden de diagnóstico es siempre el mismo: ¿existe el comando?, ¿responde?, ¿está autenticado? Cada pregunta tiene un arreglo distinto, y saltarse el orden hace perder tiempo."},
  {k:"p", h:"El verificador está montado con esa misma secuencia, así que su primer fallo suele ser el que hay que arreglar — los siguientes se caen solos cuando resuelves ese."},

{k:"p", h:"Un apunte sobre lo que este curso no cubre y conviene saber que existe: hay una extensión para trabajar desde el editor y una versión que corre en el navegador. Son la misma herramienta con otra piel."},
  {k:"p", h:"El curso se hace entero en la terminal a propósito: es donde están todas las capacidades y donde lo que aprendes se traslada a las otras formas. Al revés no funciona igual."},

{k:"p", h:"Merece la pena entender la diferencia entre las dos formas de instalarlo, porque explica casi todos los problemas raros. El instalador nativo deja un binario que se actualiza solo; la instalación por npm depende de tu versión de Node y se actualiza cuando tú lo pidas."},
  {k:"p", h:"Ninguna es mejor. Lo que da problemas es tener las dos: la terminal ejecuta una, tú actualizas la otra, y el comportamiento no coincide con lo que lees en ningún sitio."},

{k:"cr", t:"Qué mira exactamente el verificador del curso", h:"<p>Los checkpoints de este módulo no te preguntan si instalaste: lo comprueban ejecutando lo mismo que ejecutarías tú.</p><p>Buscan el comando en tu <code>PATH</code>, le piden la versión, y comprueban que la autenticación esté resuelta. Por eso un checkpoint automático no se puede marcar a mano — no hay nada que marcar: o el comando responde o no.</p><p>Cuando uno falle, léelo con cuidado antes de tocar nada: el mensaje distingue «no está instalado» de «está pero no responde» de «responde pero no está autenticado», y cada uno se arregla de forma distinta.</p>"},
  {k:"p", h:"Una cosa más sobre autenticación: hay varias formas y conviven mal. Si tienes una variable de entorno con una clave puesta de hace meses, va a ganar sobre la sesión que inicies ahora, y el resultado es que trabajas contra una cuenta distinta a la que crees. Si algo no cuadra, esa variable es el primer sitio donde mirar."},

{k:"p", h:"Una cosa que conviene mirar en la salida de <code>claude doctor</code> aunque no la entiendas del todo: <strong>cómo se instaló</strong>. Si dice que fue por npm y tú recuerdas haber usado el instalador —o al revés— tienes dos, y ese es el origen de los comportamientos que después no se explican."},
  {k:"p", h:"Y sobre las actualizaciones: conviene tenerlas automáticas. Estas herramientas cambian rápido, y una versión de hace tres meses puede no tener funciones que la documentación da por hechas. Si algo del curso no te aparece, actualizar es lo primero que hay que probar."},

{k:"p", h:"Un apunte sobre el modelo, porque es la pregunta que sale enseguida: no hace falta elegirlo. Claude Code trae uno por defecto que es el adecuado para casi todo, y se cambia con <code>/model</code> si algún día lo necesitas. Empezar tocando eso es optimizar antes de tener un problema."},

{k:"cr", t:"Por qué se comprueba antes de pedir nada", h:"<p>Tres cuartas partes de los problemas del primer día no son del agente: son de instalación. Una versión vieja que no tiene los comandos que espera el curso, una autenticación a medias, o una instalación por un gestor de paquetes que se pisa con otra.</p><p><code>claude doctor</code> existe justamente para eso y casi nadie lo conoce. Te dice qué versión corre, cómo se instaló y si las actualizaciones automáticas funcionan — las tres cosas que después explican comportamientos raros.</p><p>Dos minutos aquí ahorran una tarde de «a mí no me funciona igual que en el vídeo».</p>"},
  {k:"tr", t:"Dos instalaciones a la vez", h:"<p>El problema más difícil de diagnosticar de este módulo: tener Claude Code instalado por dos vías —el instalador nativo y npm, por ejemplo— y que la terminal ejecute una mientras tú actualizas la otra.</p><p>El síntoma es que <code>claude --version</code> no cambia después de actualizar, o que una función que la documentación describe no aparece. Se comprueba con <code>which -a claude</code>: si devuelve más de una ruta, tienes dos, y conviene dejar una sola.</p>"},

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
{k:"p", h:"Una última costumbre para el primer día: cuando el resultado no sea el que esperabas, <strong>no reformules la petición desde cero</strong>. Dile qué está mal con lo que hizo. Tiene delante todo el contexto de lo que acaba de hacer, y corregir sobre eso es más barato y más preciso que empezar otra vez."},

{k:"p", h:"Al terminar esta sesión ya viste las tres cosas que separan esto de un chat: leyó archivos por su cuenta, ejecutó algo, y comprobó el resultado. Los diez módulos siguientes son formas de hacer que esas tres cosas ocurran mejor y sin que tengas que pedirlas cada vez."},

{k:"p", h:"Una nota sobre el coste, porque es la duda que frena a mucha gente: cada sesión consume según cuánto lea y cuánto escriba. Una sesión de trabajo normal es barata; la que se descontrola es la que lleva dos horas abierta acumulando contexto."},
  {k:"p", h:"La costumbre de una sesión por tarea, además de mejorar las respuestas, es lo que mantiene el gasto predecible."},

{k:"p", h:"Sobre el modo de planificación, que aparece pronto y confunde: hay una forma de pedirle que <strong>proponga antes de tocar nada</strong>. Te devuelve un plan, tú lo apruebas o lo corriges, y solo entonces actúa."},
  {k:"p", h:"Merece la pena cogerle el gusto para lo que toque varios archivos. El coste de corregir un plan de cinco líneas es mucho menor que el de revisar quince archivos ya modificados, y es la forma más barata de descubrir que entendiste una cosa y él otra."},

{k:"p", h:"Cuando salgas de la sesión, conviene saber qué se pierde y qué no. <strong>Se pierde la conversación</strong>: lo que hablasteis, lo que leyó, lo que dedujo. <strong>No se pierde lo que quedó escrito en archivos</strong>: el código, las notas, las reglas."},
  {k:"p", h:"De ahí la costumbre que sostiene todo lo demás: si algo importa para mañana, tiene que acabar en un archivo. Una conclusión que solo existe en la conversación es una conclusión que se evapora al cerrar la terminal."},

{k:"p", h:"Sobre qué pedir en esa primera sesión, porque la elección condiciona la impresión que te llevas: <strong>algo real y pequeño de tu proyecto</strong>. Ni «hola» —que no muestra nada— ni «refactoriza el módulo de pagos» —que muestra demasiado sin que puedas juzgarlo."},
  {k:"p", h:"Lo que mejor funciona el primer día es pedirle que <em>lea</em> antes que escriba: «explícame qué hace este módulo y cómo se conecta con el resto». Ahí ves cómo explora, qué archivos elige mirar y si entendió la estructura — que es la información que necesitas para saber cuánto te puedes fiar después."},

{k:"p", h:"Dos costumbres que se cogen el primer día y ahorran muchas horas después."},
  {k:"p", h:"<strong>Trabaja sobre git limpio.</strong> Antes de pedir algo grande, comprueba que no tienes cambios sin guardar. Es lo que convierte cualquier destrozo en un <code>git checkout .</code> en vez de en una tarde de reconstrucción, y es la razón por la que se puede dejar a un agente tocar archivos sin ansiedad."},
  {k:"p", h:"<strong>Pide una cosa cada vez.</strong> Una petición con tres encargos dentro produce tres resultados a medias. Y cuando falla, no sabes cuál de los tres lo rompió — que es el coste real, más que el resultado en sí."},

{k:"tr", t:"La sesión que se alarga hasta que empeora", h:"<p>Una sesión larga acumula contexto: cada archivo leído y cada salida de comando se quedan. Llega un punto en que el agente responde peor, y no es que se canse — es que lo relevante está enterrado bajo cosas de hace media hora.</p><p>La señal es reconocible: empieza a repetir cosas que ya hizo, o a proponer cambios en archivos que dejaron de importar hace rato.</p><p>La costumbre que lo evita: <strong>una sesión por tarea</strong>. Cuando cambies de asunto, sal y vuelve a entrar. Lo que necesitas conservar entre sesiones no se guarda en la conversación — se escribe en el proyecto, que es de lo que trata el módulo siguiente.</p>"},

{k:"cr", t:"Qué está pasando mientras piensa", h:"<p>La primera sesión desconcierta porque el agente hace cosas que no le pediste: lee archivos, mira la estructura del proyecto, ejecuta un comando. No se está desviando — está construyendo el contexto que necesita.</p><p>Esa es la diferencia con un chat: un chat solo sabe lo que le pegas, y este va a buscarlo. Por eso la primera petición de una sesión tarda más que las siguientes, y por eso conviene arrancarlo <strong>desde la carpeta del proyecto</strong> y no desde tu carpeta personal.</p><p>Si lo arrancas en el sitio equivocado, va a leer archivos que no tienen que ver con nada y a gastar contexto en ello.</p>"},
  {k:"p", h:"Una costumbre que vale más que cualquier atajo: <strong>termina cada petición diciendo cómo se sabe que salió bien</strong>. «Añade el campo y comprueba que las pruebas pasan» produce un resultado distinto a «añade el campo», porque la primera le da una condición de parada que puede verificar y la segunda le deja decidir a él cuándo terminó."},

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
{k:"p", h:"Y una comprobación que conviene hacerse cada pocas semanas: abrir el <code>CLAUDE.md</code> y preguntarse, regla por regla, si sigue siendo verdad. Los comandos cambian, las carpetas se reorganizan, y un archivo de reglas viejo enseña cosas falsas con toda la autoridad de estar escrito."},

{k:"p", h:"Este es el módulo con más retorno del curso: es el que hace que las sesiones siguientes empiecen sabiendo, en vez de preguntando. Si solo pudieras hacer uno, sería este."},

{k:"p", h:"Hay un patrón que conviene evitar: escribir el <code>CLAUDE.md</code> de golpe, un domingo, imaginando todo lo que el agente debería saber. Sale largo, teórico, y con reglas que nadie ha comprobado."},
  {k:"p", h:"El que funciona crece al revés: empieza casi vacío y gana una línea cada vez que corriges algo. A las dos semanas tiene diez reglas, todas nacidas de un problema real, y todas comprobadas al menos una vez."},

{k:"p", h:"Sobre el tamaño: el archivo se lee en cada sesión, así que ocupa contexto siempre. Trescientas líneas de reglas son trescientas líneas menos para tu código, cada vez."},
  {k:"p", h:"La proporción sana es que quepa en una pantalla larga. Si necesitas más, lo que sobra suele ser un procedimiento —y eso va en una skill, que solo se carga cuando hace falta— o documentación, que va en su archivo y se referencia."},

{k:"p", h:"Vale la pena poner un ejemplo de la diferencia. Sin reglas, la primera petición de cada día incluye implícitamente: cómo se corren las pruebas, qué gestor de paquetes usáis, qué carpeta no se toca. Se lo dices tú o lo deduce — y deducirlo cuesta lecturas de archivo y a veces se equivoca."},
  {k:"p", h:"Con reglas, esa información ya está antes de que abras la boca. La primera petición del día pasa de ser un briefing a ser una petición, y esa diferencia se nota más cuanto más veces al día abres una sesión."},

{k:"p", h:"Un detalle práctico: puedes tener <code>CLAUDE.md</code> en subcarpetas, no solo en la raíz. Un monorepo con reglas distintas por paquete se maneja así, y el agente lee el que corresponde a donde está trabajando."},

{k:"p", h:"Hay un efecto secundario de escribir el <code>CLAUDE.md</code> del que casi nadie avisa: <strong>mejora el proyecto</strong>, no solo la relación con el agente."},
  {k:"p", h:"Poner por escrito qué comandos se usan, qué no se toca y cuándo algo está terminado saca a la luz las cosas que nadie había escrito nunca y que cada persona del equipo tenía en la cabeza de forma ligeramente distinta. Ese archivo acaba siendo lo primero que lee alguien nuevo — agente o humano."},
  {k:"p", h:"Por eso conviene revisarlo en los pull requests como cualquier otro archivo. Un <code>CLAUDE.md</code> que se queda viejo enseña cosas falsas con mucha autoridad."},

{k:"cr", t:"Tres sitios donde poner memoria, y cuál usar", h:"<p><strong>El proyecto</strong> (<code>CLAUDE.md</code> en la raíz) — lo que vale para cualquiera que trabaje aquí. Se versiona con el código y lo hereda quien clone. Es el que importa.</p><p><strong>Tú</strong> (<code>~/.claude/CLAUDE.md</code>) — tus preferencias personales, en todos tus proyectos. Cómo quieres que te hable, qué idioma, qué nivel de detalle.</p><p><strong>Local</strong> (sin versionar) — lo que solo aplica a tu copia: rutas de tu máquina, credenciales de un entorno de pruebas tuyo.</p><p>El error frecuente es meter en el del proyecto cosas que son tuyas —«explícame las cosas en detalle»— y acabar imponiéndole tu estilo a todo el equipo. Si la frase empieza por «yo prefiero», va en el tuyo, no en el del proyecto.</p>"},

{k:"p", h:"El curso trae un <code>CLAUDE.md</code> de partida con los apartados que de verdad se usan:"},
  {k:"term", t:"terminal", l:[{p:"$", c:"cp plantilla/CLAUDE.md /ruta/a/tu-proyecto/"}]},
  {k:"tr", t:"El archivo que crece hasta que deja de leerse", h:"<p>El fallo de este módulo no es no tener <code>CLAUDE.md</code>: es tener uno de doscientas líneas que nadie ha comprobado.</p><p>Cada regla que añades diluye a las demás. Un archivo con cinco reglas que se cumplen vale más que uno con cuarenta declaradas, porque el agente reparte su atención y tú pierdes la capacidad de saber cuáles funcionan.</p><p>La prueba está en el ejercicio de este módulo, y es la parte más importante del curso: <strong>escribe una regla, pide algo que la active, y comprueba que la cumplió sin recordársela</strong>. Si no la cumplió, esa regla está escrita pero no vive.</p><p>Método para saber qué escribir: durante una semana, cada vez que corrijas al agente, anota la corrección en una línea. Al final tendrás entre cinco y diez, y son exactamente las que tu proyecto necesita — no las que recomienda un artículo genérico.</p>"},

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
{k:"p", h:"Cuando el agente pida un permiso que no tienes configurado, la respuesta correcta casi nunca es dárselo para siempre en ese momento. Concédelo para esa vez, termina lo que estabas haciendo, y decide después con calma si merece entrar en la lista."},

{k:"p", h:"Media hora bien invertida aquí es lo que después permite dejarlo trabajar sin vigilarlo. Los permisos no son burocracia de seguridad: son la condición para que el agente pueda comprobar su propio trabajo sin interrumpirte cada tres pasos."},

{k:"p", h:"Un detalle que evita sustos: los permisos se aplican también a lo que el agente ejecuta <em>dentro</em> de un script. Permitir un comando que a su vez ejecuta cualquier cosa es abrir la puerta entera sin darse cuenta."},
  {k:"p", h:"Por eso las listas de permitidos que funcionan son específicas —<code>npm test</code>, <code>git diff</code>— y no genéricas. Un permiso amplio para «cualquier npm» incluye <code>npm run</code> de un script que hace lo que sea."},

{k:"p", h:"Sobre saltarse los permisos del todo: existe la opción y no conviene salvo en un entorno desechable — un contenedor, una máquina virtual, un repositorio de pruebas."},
  {k:"p", h:"El riesgo real no es que el agente decida hacer daño: es que un comando razonable con una ruta mal deducida haga algo irreversible en tu máquina. En un contenedor eso cuesta reconstruirlo; en tu portátil, cuesta lo que costara."},

{k:"p", h:"Una consecuencia de los permisos que se descubre tarde: <strong>son lo que hace viable el modo sin conversación</strong>. Si tu configuración depende de que tú apruebes cosas a mano, el agente no puede correr en integración continua ni en un cron."},
  {k:"p", h:"Por eso conviene resolver los permisos bien una vez, aunque cueste media hora: es el trabajo que después habilita los módulos 9 y 10, no un trámite de seguridad."},

{k:"p", h:"Los permisos admiten patrones, no solo nombres de herramienta. <code>Bash(git diff:*)</code> permite cualquier <code>git diff</code> pero no cualquier <code>git</code>, y esa granularidad es la que hace viable tener una lista de permitidos cómoda sin abrir la mano del todo."},

{k:"p", h:"Los permisos tienen tres sitios donde vivir, y el orden importa: la configuración del proyecto (<code>.claude/settings.json</code>, versionada, la que comparte el equipo), la tuya local para ese proyecto (sin versionar), y la global de tu usuario."},
  {k:"p", h:"Lo que va en cada sitio: <strong>las denegaciones importantes van en la del proyecto</strong>, para que apliquen a todo el mundo. Los permisos que te dan comodidad a ti —dejarle correr un comando concreto de tu entorno— van en la local, porque son tuyos y puede que a otro no le sirvan."},

{k:"tr", t:"Los dos extremos que se pagan igual", h:"<p><strong>Aprobarlo todo a mano</strong> convierte cada tarea en una sucesión de preguntas y anula la ventaja de que el agente pueda comprobar su trabajo. A la media hora estás aceptando sin leer, que es lo peor de los dos mundos: la fricción sin la seguridad.</p><p><strong>Dar permiso a todo</strong> funciona hasta el día que no. Y el problema no es imaginar al agente haciendo algo destructivo a propósito: es que un comando razonable con un argumento mal deducido borra lo que no debía.</p><p>El punto medio es aburrido y funciona: <strong>todo lo que lee, permitido; lo que escribe, permitido dentro del proyecto; lo que no tiene vuelta atrás, denegado siempre.</strong> Esa tercera lista es corta —<code>git push</code>, borrados recursivos, credenciales— y es la que de verdad te protege.</p>"},

{k:"p", h:"El curso trae una configuración de permisos de partida, pensada para ser restrictiva en lo que importa y cómoda en lo demás:"},
  {k:"term", t:"terminal", l:[{p:"$", c:"cp -r plantilla/.claude /ruta/a/tu-proyecto/"}]},
  {k:"p", h:"Léela antes de copiarla. La lista de <code>deny</code> es la parte que conviene entender: bloquea leer <code>.env</code> y archivos de credenciales, y bloquea <code>git push</code> y <code>rm -rf</code>. No porque el agente sea malicioso, sino porque esas cuatro son las que no tienen vuelta atrás."},

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
{k:"p", h:"Los comandos viven en archivos de texto, así que se versionan, se revisan en un pull request y se corrigen como cualquier otra cosa del proyecto. No hay ninguna interfaz que aprender."},

{k:"p", h:"Merece la pena ver la diferencia entre pedir algo suelto y tener el comando. Sin comando escribes cada vez: «revisa el diff, reporta solo lo que causaría un fallo real, no comentes estilo, y dime para cada hallazgo qué entrada lo rompe». Con comando escribes <code>/revisar</code>."},
  {k:"p", h:"Lo que se ahorra no es teclear: es que la parte larga —el criterio— se aplique <strong>igual todas las veces</strong>. Cuando lo escribes a mano, la versión de las siete de la tarde es más corta que la de las nueve de la mañana, y los resultados se resienten sin que sepas por qué."},

{k:"p", h:"Y si un comando tuyo deja de usarse, bórralo. La lista de comandos es un espacio compartido con los del sistema, y llenarla de cosas muertas hace que la que sí usas cueste encontrarla."},

{k:"p", h:"A partir de aquí el curso deja de ser configuración básica y pasa a ser extensión: cosas que añades cuando algo se repite lo suficiente como para que valga la pena escribirlo una vez."},

{k:"p", h:"Sobre cuántos tener: pocos y usados. Cinco comandos que invocas a diario valen más que veinte que documentan todo lo que tu equipo sabe hacer, porque los veinte no caben en la cabeza de nadie."},
  {k:"p", h:"Y si acabas con muchos, el prefijo común es lo que los hace navegables. La lista se agrupa sola y encuentras el que buscas sin recordar su nombre exacto."},

{k:"p", h:"Los comandos pueden ejecutar cosas antes de que el agente lea el resto: por ejemplo, meter la salida de <code>git diff</code> directamente en el contexto sin que tenga que pedirla."},
  {k:"p", h:"Eso ahorra una ronda entera en los comandos que siempre trabajan sobre lo mismo, y es lo que separa un comando que se siente instantáneo de uno que empieza explorando cada vez."},

{k:"p", h:"Hay comandos que vienen ya con la herramienta —<code>/model</code>, <code>/clear</code>, <code>/help</code>— y los tuyos conviven con ellos. Escribe <code>/</code> y sale la lista entera, la suya y la tuya, que es la forma más rápida de recordar qué tienes."},
  {k:"p", h:"Un consejo de nomenclatura: si tu equipo va a tener varios, ponles un prefijo común. <code>/pr-revisar</code>, <code>/pr-preparar</code> se agrupan solos en la lista; <code>/revisar</code> y <code>/preparar</code> quedan sueltos entre los del sistema."},

{k:"cr", t:"Cómo se escribe un comando que se acaba usando", h:"<p>La mayoría de los comandos que se escriben el primer día se abandonan el tercero. Los que sobreviven comparten tres cosas:</p><p><strong>Resuelven algo que haces varias veces por semana.</strong> Si es mensual, no vas a recordar que existe.</p><p><strong>Llevan dentro un criterio, no solo pasos.</strong> «Revisa el diff» lo pides sin comando; «revisa el diff con <em>nuestro</em> criterio de qué bloquea» necesita estar escrito.</p><p><strong>Tienen un nombre que adivinarías.</strong> <code>/revisar</code> se encuentra; <code>/rev-pr-check</code> hay que recordarlo, y no lo vas a recordar.</p>"},
  {k:"p", h:"Y una prueba rápida antes de darlo por bueno: pásaselo a alguien del equipo sin explicárselo. Si tiene que preguntarte qué hace, el que necesita trabajo es el nombre o la descripción, no el contenido."},

{k:"p", h:"Los comandos admiten argumentos, y ahí es donde dejan de ser una nota fija. Escribes <code>$ARGUMENTS</code> en el archivo y lo que teclees después del comando se sustituye ahí."},
  {k:"p", h:"Eso convierte <code>/revisar</code> en <code>/revisar src/pagos</code>, o un comando de despliegue en uno que recibe el entorno. Un buen comando suele tener una o dos variables y un criterio largo — al revés de como se escriben la primera vez, con muchas variables y ningún criterio."},

{k:"p", h:"Dónde se guardan decide quién los tiene. En <code>.claude/commands/</code> del proyecto, se versionan y los hereda el equipo entero. En <code>~/.claude/commands/</code>, son tuyos en todos tus proyectos."},
  {k:"p", h:"Como regla: si el comando encapsula un criterio <em>del proyecto</em> —qué es bloqueante aquí, cómo se despliega esto— va en el proyecto. Si encapsula una manía tuya, va en tu carpeta personal."},

{k:"p", h:"El curso trae un comando de ejemplo, <code>/revisar</code>, en <code>plantilla/.claude/commands/revisar.md</code>. Míralo antes de escribir el tuyo: es corto a propósito y muestra la parte que casi todo el mundo omite — <strong>decir también qué NO reportar</strong>."},
  {k:"tr", t:"Un comando no es un alias", h:"<p>El error de este módulo es escribir comandos que solo ahorran teclear: <code>/test</code> que ejecuta <code>npm test</code>. Para eso ya está la terminal, y el agente en medio solo añade latencia.</p><p>Un comando gana su sitio cuando encapsula <strong>un criterio</strong>, no una acción. <code>/revisar</code> vale porque lleva dentro qué es bloqueante y qué no en tu proyecto — un juicio que si no está escrito, cada sesión lo improvisa distinto.</p><p>Prueba de fuego: si tu comando se puede sustituir por un alias de shell, no debería ser un comando.</p>"},

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
{k:"p", h:"Escribe la descripción pensando en cómo lo pediría alguien que no sabe que la skill existe. Esa es la única frase que el agente va a leer para decidir."},

{k:"p", h:"Un buen indicador de que algo debería ser skill: cuando te descubres explicándole a alguien —o al agente— los mismos siete pasos por tercera vez. Esa tercera vez es la señal."},

{k:"p", h:"Las skills son la pieza que menos gente usa y la que más cambia el trabajo en equipo, porque convierten «cómo se hace esto aquí» en algo que se ejecuta igual sin que nadie tenga que acordarse."},

{k:"p", h:"Cómo saber si una skill se está usando: pídele algo que debería activarla y mira si la menciona. Si no aparece, el problema está en la descripción, no en los pasos."},
  {k:"p", h:"Es la comprobación equivalente a la del módulo 1 con las reglas, y por la misma razón: una skill que nunca se invoca está escrita pero no vive."},

{k:"p", h:"Una skill puede vivir en el proyecto o en tu carpeta personal, igual que los comandos. La decisión es la misma: si el procedimiento es de este proyecto, va versionado con él; si es tu forma de trabajar en todos, va en la tuya."},
  {k:"p", h:"En equipos, las skills del proyecto son la forma más efectiva de que un procedimiento se haga igual sin escribir un documento que nadie lee. El agente sí lo lee, y lo lee cada vez."},

{k:"p", h:"Hay skills que vienen dadas —para trabajar con documentos de oficina, por ejemplo— y skills que escribes tú. Las primeras sirven para ver el formato antes de escribir la tuya: son un buen modelo de cómo se redacta una descripción que el agente sabe cuándo usar."},
  {k:"p", h:"El tamaño razonable de una skill propia es una pantalla de pasos más los archivos de apoyo que haga falta. Si el <code>SKILL.md</code> se te va a cinco pantallas, probablemente estás describiendo tres procedimientos y conviene separarlos."},

{k:"p", h:"Una forma de decidir rápido si algo debería ser skill: <strong>¿lo explicarías igual a alguien nuevo cada vez?</strong> Si la respuesta es sí, es un procedimiento y va en una skill. Si cambia según el caso, es criterio y va en las reglas."},
  {k:"p", h:"Ejemplos de procedimiento: cómo se prepara una versión, cómo se revisa un PR, cómo se añade un idioma nuevo. Ejemplos de criterio: qué estilo usamos, qué no se toca, cuándo algo está terminado."},

{k:"p", h:"Una skill puede traer más archivos además del <code>SKILL.md</code>: guiones, plantillas, documentos de referencia. El agente los lee solo cuando los necesita, no de entrada."},
  {k:"p", h:"Eso resuelve el problema de siempre con la documentación larga: no puedes meter treinta páginas en las reglas del proyecto porque se comerían el contexto de cada sesión. Con una skill, las treinta páginas están disponibles y solo entran cuando la tarea las pide."},

{k:"tr", t:"La descripción es lo único que se lee para decidir", h:"<p>Una skill que nadie invoca es una skill que no existe, y la causa casi siempre es la misma: la descripción no dice <strong>cuándo</strong> usarla.</p><p>«Ayuda con revisiones de código» no le sirve al agente para decidir nada. «Úsalo cuando se pida revisar un PR, revisar cambios antes de mergear, o comprobar si una rama está lista» sí, porque enumera las formas en que la gente pide realmente esa tarea.</p><p>Escribe la descripción pensando en las palabras que usarías tú, no en el nombre técnico de lo que hace.</p>"},

{k:"p", h:"El curso trae una skill completa en <code>plantilla/.claude/skills/revisar-pr/</code>, con su cabecera, sus pasos y —lo que casi nadie escribe— su criterio de qué es bloqueante."},
  {k:"cr", t:"Cuándo es regla, cuándo comando y cuándo skill", h:"<p>Las tres cosas se confunden constantemente porque las tres son texto que influye en el agente. Se distinguen por <strong>cuándo entran en juego</strong>:</p><p><strong>Regla</strong> (<code>CLAUDE.md</code>) — vale siempre, en cada sesión, sin que nadie la invoque. «El SQL va parametrizado.»</p><p><strong>Comando</strong> (<code>/nombre</code>) — lo invocas tú, explícitamente, cuando quieres. «Revísame el diff.»</p><p><strong>Skill</strong> — la invoca el agente solo, cuando la tarea encaja con su descripción. De ahí que la descripción sea la parte más importante del archivo: es lo único que el agente lee para decidir si le sirve.</p><p>Si escribes una skill con una descripción vaga, no se va a usar nunca y vas a concluir que las skills no funcionan.</p>"},

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
{k:"p", h:"Y cuando delegues, pon en el encargo todo lo que el subagente necesita: no ve tu conversación, así que las referencias a «lo que acabamos de hacer» no significan nada para él."},

{k:"p", h:"Y una advertencia sobre el entusiasmo inicial: montar cinco subagentes especializados antes de necesitarlos produce una configuración bonita que nadie invoca. Empieza por el verificador, que es el único que casi siempre compensa, y añade otro cuando un trabajo concreto lo pida."},

{k:"p", h:"Los subagentes resuelven dos problemas distintos que conviene no mezclar: <strong>paralelizar</strong> trabajo independiente, y <strong>separar</strong> a quien juzga de quien hace. El segundo es el que más vale y el que menos se usa."},

{k:"p", h:"Un patrón que rinde y casi nadie monta: un subagente que solo <strong>investiga</strong> y no toca nada. Le pides que averigüe cómo funciona una parte del sistema, vuelve con un resumen, y el agente principal trabaja con eso sin haber gastado su contexto en la exploración."},
  {k:"p", h:"Es la forma más limpia de trabajar en un proyecto grande: la exploración, que es lo que más contexto consume, ocurre fuera."},

{k:"p", h:"Sobre el coste: cada subagente consume su propio presupuesto. Tres en paralelo es tres veces el gasto de uno, y a veces vale la pena y a veces no."},
  {k:"p", h:"La regla práctica: si el trabajo que le delegas te habría costado más de diez minutos a ti, casi siempre compensa. Si son tres lecturas de archivo, hacerlo directo sale más barato y más rápido."},

{k:"p", h:"Conviene saber cuándo <em>no</em> usar subagentes, porque es más frecuente que lo contrario. Si la tarea es secuencial —cada paso necesita el resultado del anterior— repartirla no acelera nada y sí multiplica el contexto que hay que reconstruir."},
  {k:"p", h:"El caso claro es el opuesto: cinco archivos que se pueden revisar sin depender unos de otros, o una investigación donde tres preguntas distintas se pueden responder en paralelo. Ahí sí hay tiempo real que ganar."},

{k:"p", h:"Un uso concreto que vale más que la explicación general: <strong>dos subagentes con criterios distintos sobre el mismo trabajo</strong>. Uno mira correctitud, otro mira seguridad. Cada uno encuentra cosas que el otro no ve, porque están buscando cosas distintas."},
  {k:"p", h:"Es más útil que pedirle a uno solo «revísalo todo», que produce listas largas y superficiales. Un lente concreto por revisor da hallazgos concretos."},

{k:"p", h:"Los subagentes se guardan como archivos en <code>.claude/agents/</code>, con su descripción y —esto es lo importante— <strong>su propia lista de herramientas</strong>."},
  {k:"p", h:"Restringirlas no es solo seguridad: es enfoque. Un verificador con permiso para editar acabará arreglando lo que encuentre, y entonces deja de ser un verificador. El del curso solo puede leer y ejecutar, y por eso su informe sirve."},

{k:"p", h:"Un detalle que sorprende la primera vez: <strong>los subagentes no heredan tu conversación</strong>. Arrancan limpios y solo saben lo que les pongas en el encargo."},
  {k:"p", h:"Eso es una virtud —por eso el verificador funciona— y una trampa: si le pides a un subagente que «arregle lo que acabamos de ver», no sabe de qué hablas. Hay que decírselo entero."},

{k:"p", h:"El curso trae un subagente de ejemplo en <code>plantilla/.claude/agents/verificador.md</code>, y es el que más se usa de los tres artefactos: comprueba si un trabajo terminado cumple lo que se pidió, sin haberlo escrito él."},
  {k:"cr", t:"Por qué un verificador aparte funciona mejor", h:"<p>Un agente que acaba de escribir doscientas líneas es mal juez de esas doscientas líneas. No por falta de capacidad: por contexto. Tiene delante todo el razonamiento que le llevó a escribirlas, y ese razonamiento es persuasivo — incluso cuando el resultado no funciona.</p><p>Un subagente arranca con contexto limpio. Solo ve lo que le pasas y lo que puede comprobar por su cuenta, así que no tiene nada que defender.</p><p>Es el mismo principio que sostiene los bucles autónomos: <strong>quien hace el trabajo no decide si está terminado</strong>. Aquí se aplica en pequeño, dentro de una sesión, y es lo que más reduce las veces que el agente dice «listo» con las pruebas en rojo.</p>"},
  {k:"tr", t:"El coste de delegar", h:"<p>Cada subagente vuelve a construir su contexto desde cero: relee archivos, vuelve a explorar, y después te devuelve un informe que el agente principal tiene que leer. Eso multiplica el gasto y el tiempo.</p><p>Delega cuando el trabajo sea <strong>independiente y de tamaño real</strong> —una investigación amplia, varios archivos que se pueden mirar en paralelo, una verificación con criterio propio—. No delegues lo que tú mismo resolverías con tres lecturas de archivo: sale más caro que hacerlo.</p>"},

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
{k:"p", h:"Prueba siempre el hook a mano antes de configurarlo. Un fallo aquí no se nota una vez: se nota en todas las sesiones, hasta que lo encuentras."},

{k:"p", h:"Antes de escribir un hook, pregúntate si el incumplimiento ocasional te cuesta algo de verdad. Si la respuesta es que no, una regla basta y es más barata de mantener. Los hooks se reservan para lo que no puede fallar ni una vez."},

{k:"p", h:"Este módulo es corto y su idea es la más portátil del curso: sirve para agentes, para procesos de equipo y para casi cualquier sitio donde alguien confunda escribir una norma con hacerla cumplir."},

{k:"p", h:"Sobre por dónde empezar: el hook más rentable del primer día es formatear al guardar. Es inofensivo, se nota enseguida, y te enseña el mecanismo sin riesgo de bloquear nada."},
  {k:"p", h:"Los que bloquean —los que devuelven error— déjalos para cuando tengas claro qué quieres impedir. Un hook bloqueante mal calibrado se nota mucho y en todas partes."},

{k:"p", h:"Los hooks se configuran en el mismo archivo que los permisos, y como ellos pueden ser del proyecto o tuyos. Los del proyecto se versionan, así que todo el equipo tiene la misma garantía."},
  {k:"p", h:"Ese es el argumento más fuerte para usarlos en equipo: una regla escrita se cumple según quién y cuándo; un hook versionado se cumple igual para todos, incluida la persona que se incorporó ayer."},

{k:"p", h:"Un uso de los hooks que casi nadie considera y que resuelve un problema real: <strong>avisar</strong>. Un hook que suena o notifica cuando el agente termina te deja lanzarle algo largo y volver a lo tuyo sin estar mirando la terminal."},
  {k:"p", h:"Suena menor y cambia bastante el uso diario: la alternativa es quedarse esperando, que es exactamente lo que estas herramientas deberían evitarte."},

{k:"p", h:"Un hook recibe información sobre lo que está pasando —qué herramienta, qué archivos— en variables de entorno, y puede decidir en función de eso. Y si termina con un código de error, bloquea la operación."},
  {k:"p", h:"Ahí está toda la potencia y todo el peligro: un hook mal escrito que devuelve error por accidente bloquea cosas legítimas en todas tus sesiones. Por eso los que solo avisan o formatean deben terminar siempre en éxito, y solo los que de verdad tienen que bloquear devuelven error."},

{k:"p", h:"Los hooks se enganchan en varios momentos, y elegir bien cuál cambia lo que puedes hacer:"},
  {k:"tbl", head:["Momento","Cuándo se ejecuta","Para qué sirve"], rows:[
    ["<code>PreToolUse</code>","Antes de que la herramienta actúe","Bloquear lo que no debe pasar"],
    ["<code>PostToolUse</code>","Después, con el resultado","Formatear, normalizar, comprobar"],
    ["<code>Stop</code>","Cuando el agente cree que terminó","Comprobar que de verdad terminó"],
    ["<code>SessionStart</code>","Al abrir la sesión","Cargar estado, avisar de algo pendiente"]
  ]},
  {k:"p", h:"El de <code>Stop</code> es el menos usado y el más interesante: es donde se pone la comprobación que impide que «listo» signifique «listo para mí»."},

{k:"tr", t:"Un hook mal escrito rompe todas las sesiones", h:"<p>Los hooks se ejecutan en cada operación que coincida con su patrón, así que un error ahí no falla una vez: falla siempre, en todo lo que hagas.</p><p>Dos precauciones que ahorran una tarde. <strong>Termina en <code>|| true</code></strong> los hooks que no deben bloquear —formatear, avisar— para que un fallo del formateador no impida guardar archivos. Y <strong>pruébalo primero a mano</strong> en la terminal con un archivo de ejemplo, antes de ponerlo en la configuración.</p><p>El hook del curso lleva las dos cosas: <code>--no-install</code> para no instalar nada por sorpresa, y <code>|| true</code> para que su fallo no se lleve por delante la edición.</p>"},

{k:"cr", t:"La frontera entre prompt y código", h:"<p>Este módulo tiene la idea más transferible del curso, y vale mucho más allá de Claude Code.</p><p>Un prompt es una <strong>instrucción probabilística</strong>: se cumple casi siempre. Un hook es <strong>código</strong>: se cumple siempre, porque no depende de que nadie lo interprete.</p><p>La consecuencia práctica es una regla de decisión: <strong>si el incumplimiento ocasional te cuesta caro, no lo pidas — garantízalo</strong>. Formatear el código al guardar puede ser una regla; bloquear un despliegue a producción hasta que pasen las pruebas tiene que ser un hook.</p><p>Casi todo el mundo descubre esta frontera al revés: escribiendo instrucciones cada vez más enfáticas —«CRÍTICO», «SIEMPRE», «NUNCA»— hasta que entiende que el problema no era el énfasis, sino la capa.</p>"},

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
{k:"p", h:"Y revisa cada cierto tiempo qué tienes conectado. Los servidores MCP se acumulan como los plugins, ocupando contexto en cada sesión aunque hayas dejado de usarlos."},

{k:"p", h:"Y una comprobación de seguridad antes de conectar nada: mira qué permisos tiene la credencial que le vas a dar. En la mayoría de los casos basta con solo lectura, y esa decisión de treinta segundos limita el alcance de cualquier error posterior."},

{k:"p", h:"MCP es la capa que conecta al agente con lo que no está en tu disco. Es potente y es la que más fácil se sobre-configura, así que conviene entrar con la pregunta puesta: ¿qué copio y pego todos los días?"},

{k:"p", h:"Comprobar qué tienes conectado es una orden, y conviene mirarlo de vez en cuando: los servidores se acumulan igual que los plugins, y cada uno sigue ocupando su sitio aunque hayas dejado de usarlo."},
  {k:"p", h:"Una revisión cada pocos meses, quitando lo que no invocas, devuelve contexto a lo que sí haces."},

{k:"p", h:"Vale la pena distinguir MCP de las herramientas que Claude Code ya trae. Leer archivos, ejecutar comandos o buscar en la web son suyas y están siempre. MCP es para lo que <em>no</em> es tu máquina: un sistema externo con su propia autenticación."},
  {k:"p", h:"La confusión frecuente es montar un servidor MCP para algo que ya se puede hacer con un comando. Si <code>psql</code> está instalado y el agente puede ejecutarlo, quizá no necesites el servidor — necesitas el permiso."},

{k:"p", h:"Una recomendación práctica sobre por dónde empezar con MCP: por el servidor que te ahorre el copiar y pegar que más repites. Si cada día pegas resultados de consultas, empieza por la base de datos; si cada día pegas descripciones de incidencias, por el gestor de incidencias."},
  {k:"p", h:"Empezar por «el que parece más potente» lleva casi siempre a tener conectado algo que no usas, con el coste de contexto que eso arrastra."},

{k:"p", h:"Un ejemplo hace más que la definición. Sin MCP, para que el agente sepa qué hay en tu base de datos tienes que ejecutar la consulta tú y pegarle el resultado. Con MCP, le pides «mira cuántos pedidos quedaron en estado pendiente esta semana» y lo consulta él."},
  {k:"p", h:"La diferencia no es la comodidad de no copiar y pegar: es que puede <strong>iterar</strong>. Ve el resultado, se da cuenta de que la consulta no era la correcta, y prueba otra. Eso con copiar y pegar cuesta tres rondas tuyas."},

{k:"p", h:"Conviene saber distinguir los dos sitios donde se configura un servidor MCP, porque decide quién lo tiene. En el proyecto (<code>.mcp.json</code>, versionado) lo hereda el equipo; en tu configuración de usuario, es solo tuyo."},
  {k:"p", h:"Y una regla sobre credenciales que no admite excepción: <strong>nunca en el archivo versionado</strong>. Van en variables de entorno que el archivo referencia. Un <code>.mcp.json</code> con una clave dentro es una clave publicada en cuanto alguien clone el repositorio."},

{k:"cr", t:"Qué es MCP en una frase, y qué no es", h:"<p>Es un protocolo para que el agente hable con sistemas que no son archivos: tu base de datos, tu gestor de incidencias, un navegador. Lo que gana es que esas capacidades aparecen como herramientas suyas, así que puede <strong>consultar</strong> en vez de pedirte que le pegues el resultado.</p><p>Lo que no es: una forma de darle más inteligencia, ni un sustituto de tener buenas reglas. Un agente con diez servidores MCP y sin <code>CLAUDE.md</code> sigue sin saber cómo se ejecutan tus pruebas.</p><p>Y una advertencia de seguridad que conviene tomar en serio: un servidor MCP puede leer y escribir en el sistema al que conecta. Conectar uno es darle esa capacidad al agente, así que revisa qué permisos tiene la credencial que le das — casi siempre puede ser de solo lectura.</p>"},

{k:"tr", t:"Cada servidor MCP tiene un coste que no se ve", h:"<p>La tentación con MCP es conectar todo lo que existe: base de datos, gestor de incidencias, calendario, navegador. Y hay un coste que no aparece hasta que ya duele.</p><p>Cada servidor conectado <strong>mete sus herramientas en el contexto de cada sesión</strong>, la use o no. Con cinco servidores medianos, una parte notable del presupuesto de contexto se va en describir capacidades que no vas a usar hoy — y ese espacio sale del que tenía para tu código.</p><p>Conecta lo que uses de verdad esta semana. Es fácil añadir uno más cuando haga falta y es muy difícil notar que sobra.</p>"},

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
  {k:"p", h:"Y una última advertencia práctica antes de entrar: instalar un plugin ajeno es ejecutar configuración escrita por otra persona en tu máquina, hooks incluidos. Míralo con el mismo criterio con que mirarías un script que te pasan por correo — no con desconfianza, pero sí abriéndolo antes."},

  {k:"p", h:"Una nota sobre el ecosistema: la mayoría de los plugins públicos que vas a encontrar son colecciones de comandos para flujos concretos — trabajar con un framework, seguir una metodología, integrarse con un servicio. Suelen ser cortos y se leen en cinco minutos, que es exactamente lo que conviene hacer antes de instalar cualquiera."},

{k:"p", h:"Los plugins son el último módulo de extensión y el más opcional del curso. Si trabajas solo, puedes saltártelo sin perder nada: tu carpeta <code>.claude/</code> versionada con el proyecto hace lo mismo. Léelo cuando aparezca la segunda persona o el segundo repositorio."},
  {k:"p", h:"Dicho eso, entender qué son ayuda aunque no escribas ninguno, porque explica cómo se distribuyen las configuraciones que te vas a encontrar por ahí."},

{k:"cr", t:"Qué cabe dentro de un plugin", h:"<p>Un plugin puede llevar las cuatro cosas que has ido montando en los módulos anteriores, y esa es exactamente su gracia:</p><p><strong>Comandos</strong> — los <code>/nombre</code> del módulo 3, disponibles para quien lo instale.</p><p><strong>Skills</strong> — los procedimientos del módulo 4, con sus archivos de apoyo.</p><p><strong>Subagentes</strong> — los del módulo 5, con sus herramientas ya restringidas.</p><p><strong>Hooks</strong> — los del módulo 6, que es la parte que conviene leer antes de instalar nada ajeno, porque son comandos que se van a ejecutar en tu máquina.</p><p>Lo que no lleva son las reglas del proyecto: esas son de cada proyecto y viven en su <code>CLAUDE.md</code>.</p>"},
  {k:"p", h:"La decisión de empaquetar suele llegar sola: cuando te descubres copiando la misma carpeta <code>.claude/</code> al tercer repositorio, ya tienes el argumento hecho."},

{k:"p", h:"Si acabas escribiendo uno para tu equipo, empieza por lo que ya usáis y funciona. Un plugin que empaqueta tres cosas probadas se adopta; uno que propone un flujo nuevo que nadie ha probado se instala y se olvida."},

{k:"p", h:"Los plugins son distribución, no capacidad. Todo lo que traen funciona igual suelto; lo que aportan es que otra persona lo tenga idéntico con una orden."},

{k:"p", h:"Un plugin bien hecho es también documentación. Al leerlo se ve cómo alguien resolvió un flujo entero: qué puso en reglas, qué en comandos, qué garantizó con hooks."},
  {k:"p", h:"Aunque no lo instales, leer dos o tres enseña más sobre cómo se combinan las piezas que cualquier explicación — incluida esta."},

{k:"p", h:"Sobre de dónde salen: hay un mercado de plugins públicos y también se pueden distribuir por un repositorio propio, que es lo habitual dentro de una empresa."},
  {k:"p", h:"Para uso interno, un repositorio de git con el plugin dentro basta. No hace falta publicar nada ni pasar por ningún registro, y así el contenido no sale de la organización."},

{k:"p", h:"Un plugin puede traer también servidores MCP configurados, no solo comandos y skills. Eso lo convierte en la forma más completa de repartir una configuración: alguien instala el plugin y tiene lo mismo que tú, incluidas las conexiones."},
  {k:"p", h:"Con la salvedad de siempre: las credenciales no van dentro. El plugin trae la configuración; cada persona pone su clave en su entorno."},

{k:"tr", t:"El plugin que instalas y nunca usas", h:"<p>El patrón es reconocible: instalas tres plugins interesantes, cada uno trae cuatro comandos, y a la semana no recuerdas ninguno de los doce. El coste no es cero — sus hooks siguen corriendo y sus skills siguen ocupando sitio en cada sesión.</p><p>Instala uno cada vez y dale una semana. Si en esa semana no lo invocaste, desinstálalo: no era para ti, o no era para ahora.</p><p>Lo mismo vale para lo que construyas tú. Un plugin propio con dos cosas que el equipo usa a diario vale más que uno con veinte que documentan todo lo que sabéis hacer.</p>"},

{k:"p", h:"Vale la pena mirar plugins existentes antes de escribir el tuyo, aunque solo sea para ver cómo están montados. Muchos son un buen ejemplo de cómo se combinan comandos, skills y hooks para un flujo concreto."},
  {k:"p", h:"Y si acabas escribiendo uno para tu equipo, la parte que decide si se usa no es el contenido: es el README. Un plugin sin instrucciones de qué hace y cuándo conviene usarlo se instala una vez y se olvida."},

{k:"p", h:"Y una nota sobre instalar plugins ajenos: un plugin puede traer hooks, y un hook es un comando que se ejecuta en tu máquina. Léelo antes, como leerías un script que te pasan por correo. La mayoría son inofensivos y esa comprobación cuesta dos minutos."},

{k:"cr", t:"Cuándo empaquetar y cuándo no", h:"<p>Un plugin junta comandos, skills, subagentes y hooks en algo instalable. Su valor no es técnico —todo eso funciona igual suelto— sino de <strong>distribución</strong>: que otra persona lo tenga exactamente igual que tú, con una orden.</p><p>Por eso solo compensa cuando hay alguien más. Si trabajas solo, tus archivos en <code>.claude/</code> versionados con el proyecto hacen lo mismo con menos ceremonia.</p><p>El caso donde sí gana con claridad: un equipo con varios repositorios donde quieres que la revisión de código se haga igual en todos. Ahí el plugin es el mecanismo, y la alternativa es copiar y pegar hasta que las copias diverjan.</p>"},

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
{k:"p", h:"Este módulo es donde el curso deja de ser sobre tu forma de trabajar y pasa a ser sobre la del proyecto: lo que montes aquí corre igual esté quien esté delante."},

{k:"p", h:"Un ejemplo concreto de por dónde empezar: un comando que, cada mañana, lea los commits del día anterior y escriba un resumen en un archivo. No decide nada, no toca código, y te enseña el mecanismo completo con riesgo cero."},
  {k:"p", h:"Desde ahí, el salto a algo que sí decide —bloquear un merge, abrir una incidencia— es pequeño, y llegas con la infraestructura ya probada."},

{k:"p", h:"Antes de automatizar algo, hazlo a mano varias veces. Lo que automatizas sin haberlo hecho antes acaba siendo una automatización de un proceso que no era el correcto, y esos son los más difíciles de desmontar."},

{k:"p", h:"Aquí es donde todo lo anterior se paga. Las reglas, los permisos y los verificadores que montaste son exactamente lo que hace posible que el agente trabaje sin nadie delante — sin ellos, este módulo no se sostiene."},

{k:"p", h:"Sobre el coste en automatización: aquí es donde se descontrola si nadie lo mira. Un agente en cada pull request de un repositorio activo son muchas ejecuciones al día."},
  {k:"p", h:"Empieza por lo programado —una vez al día, una vez por semana— antes que por cada evento. El cron te deja ver el gasto real antes de multiplicarlo por el número de PR."},

{k:"p", h:"Sobre dónde se ejecuta esto de verdad en la práctica: integración continua, ganchos de git, tareas programadas. Los tres sitios donde ya tienes automatización y donde el agente encaja sin inventar infraestructura nueva."},
  {k:"p", h:"Y en los tres aplica lo mismo que ya sabes del módulo de permisos: lo que no esté permitido de antemano va a bloquear la ejecución, porque no hay nadie para autorizarlo."},

{k:"p", h:"Un uso que rinde desde el primer día sin montar nada: <strong>pasarle texto por una tubería</strong>. Los registros de un fallo, la salida de un comando que no entiendes, un diff largo. El agente lo lee y te contesta, sin abrir sesión."},
  {k:"p", h:"Es la puerta de entrada más natural a este modo, y la que hace evidente el salto siguiente: si eso funciona a mano, funciona igual dentro de un script."},

{k:"tr", t:"Lo que sale mal cuando nadie mira", h:"<p>Tres fallos que en una sesión interactiva se corrigen solos y aquí no:</p><p><strong>La tarea se queda a medias y termina igual.</strong> Sin condición de aceptación escrita, el agente decide él cuándo terminó, y con frecuencia decide pronto. Ponla siempre en el encargo.</p><p><strong>Se queda esperando.</strong> Si algo le pide confirmación —un permiso que no diste, un comando interactivo— no hay nadie para contestar. Los permisos tienen que estar resueltos <em>antes</em>.</p><p><strong>Cuesta más de lo previsto.</strong> Una tarea mal acotada puede iterar mucho. Conviene poner un límite de tiempo o de intentos en el propio encargo.</p><p>Los tres se resuelven en el mismo sitio: escribiendo el encargo completo antes de lanzarlo, en vez de irlo aclarando sobre la marcha.</p>"},

{k:"p", h:"La forma de salida importa más de lo que parece. En modo no interactivo puedes pedir el resultado como JSON, y eso convierte al agente en algo que otro programa puede consumir: un paso más de una tubería, no un final."},
  {k:"p", h:"Es la diferencia entre «me escribe un resumen que leo yo» y «me devuelve un veredicto que decide si el pipeline sigue». La segunda es la que hace que esto encaje en integración continua sin adaptaciones."},

{k:"cr", t:"Lo que cambia cuando no hay nadie mirando", h:"<p>Sin conversación no hay a quién preguntarle, y eso cambia cómo se escribe la petición. Todo lo que en una sesión resolverías con un «no, así no» tiene que estar en el encargo desde el principio: el objetivo, las restricciones y <strong>cómo se sabe que terminó</strong>.</p><p>Es también donde los permisos dejan de ser una comodidad y pasan a ser lo único que te protege: no vas a estar ahí para decir que no.</p><p>La forma más útil de este modo no es «que haga la tarea entera solo», sino encadenarlo: un comando que revisa cada pull request, otro que resume los cambios de la semana. Tareas acotadas, repetitivas y con criterio escrito.</p>"},

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
{k:"p", h:"Con esto termina el curso. Lo que queda montado no está en tu máquina: está en tu repositorio, versionado, y lo hereda quien clone el proyecto."},

{k:"p", h:"Y si te llevas una sola costumbre del curso entero, que sea esta: <strong>trabaja siempre sobre git limpio y en una rama</strong>. Es lo que convierte cualquier experimento en algo reversible, y lo que te deja darle permisos amplios sin que eso sea una imprudencia."},

{k:"p", h:"Último módulo, y el más práctico: qué le das y qué te quedas en el trabajo diario con git, que es donde acaba pasando todo lo demás."},

{k:"p", h:"Y un cierre sobre la relación con git en general: todo lo que hace seguro trabajar con un agente ya existía antes de que hubiera agentes. Ramas, commits pequeños, poder deshacer."},
  {k:"p", h:"Quien ya trabajaba así apenas cambia nada y gana mucho. Quien no, va a notar que la primera mejora útil de este curso no fue configurar al agente: fue ordenar cómo trabaja con su propio repositorio."},

{k:"p", h:"Una última costumbre que rinde más de lo que parece: pedirle que <strong>lea el diff antes de que lo leas tú</strong> y te cuente qué cambió y qué le preocupa."},
  {k:"p", h:"No sustituye tu revisión: la ordena. Llegas al diff sabiendo dónde mirar, y eso convierte una revisión de veinte minutos en una de cinco sin perder lo que importa."},

{k:"p", h:"Con esto se cierra el curso. Tienes las reglas del proyecto escritas, los permisos ajustados, comandos y skills para lo que repites, un verificador que comprueba lo que tú no vas a comprobar, hooks para lo que no puede fallar, y el agente corriendo sin conversación donde hace falta."},
  {k:"p", h:"Todo eso vive en tu repositorio, se versiona con el código y lo hereda quien clone. Que es la diferencia entre haber configurado tu máquina y haber configurado el proyecto."},

{k:"cr", t:"Ramas: la red que hace que todo lo anterior sea seguro", h:"<p>Una costumbre que cambia el nivel de riesgo de todo el curso: <strong>trabaja en una rama cuando le pidas algo grande</strong>.</p><p>No es por ceremonia de proceso. Es que una rama convierte cualquier resultado —bueno, malo o incomprensible— en algo que se descarta con un comando. Sin ella, un cambio de quince archivos que no acaba de funcionar es una tarde de deshacer a mano.</p><p>Con esa red puesta, puedes darle permisos más amplios y dejarle iterar más, que es cuando estas herramientas rinden de verdad. La gente que las usa con miedo suele ser la que no tiene dónde caerse.</p>"},

{k:"p", h:"Una forma concreta de aprovecharlo con git que casi nadie usa: <strong>pedirle que investigue el historial</strong>. «¿En qué commit se introdujo este comportamiento?» es una pregunta que a mano cuesta veinte minutos de <code>git log</code> y <code>git bisect</code>, y que él contesta en dos porque puede ejecutar los dos comandos e interpretar la salida."},
  {k:"p", h:"Ese tipo de tarea —buscar en un historial, cruzar información de varios commits, encontrar cuándo cambió algo— es donde la diferencia con hacerlo tú es mayor. Escribir código es donde más se le mira; investigar es donde más ahorra."},

{k:"tr", t:"Lo que no conviene delegarle nunca", h:"<p>Hay tres cosas donde el agente es rápido y tú eres responsable, y la velocidad no compensa:</p><p><strong>Escribir el mensaje de commit sin leerlo.</strong> Es el registro que va a leer alguien dentro de un año, tú incluido. Que lo redacte, sí; que se publique sin que lo mires, no.</p><p><strong>Resolver conflictos de fusión.</strong> Un conflicto es dos intenciones que chocan, y la información para decidir cuál gana casi nunca está en el código.</p><p><strong>Cualquier cosa contra la rama principal.</strong> <code>push</code>, <code>rebase</code>, <code>reset --hard</code>. Por eso están en la lista de denegados de la plantilla.</p><p>Lo que sí conviene delegar entero: leer el diff y contarte qué cambió, preparar el borrador del mensaje, encontrar en qué commit se introdujo un fallo. Ahí es donde de verdad ahorra.</p>"},

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
