# Flaq Video Skill

Genera, edita y aumenta la resolución de vídeos mediante [Flaq AI](https://flaq.ai/) con un agente de IA. La habilidad guía al agente en la búsqueda de modelos, la consulta de la documentación actual de la API, las solicitudes autenticadas, la consulta periódica de tareas y la entrega del vídeo.

El agente consulta las capacidades y los precios de los modelos en el [mercado de modelos](https://flaq.ai/model-market/), las páginas de detalle y la [documentación oficial](https://flaq.ai/docs/). Las versiones y los límites de parámetros no están fijados en la habilidad. Las herramientas Python incluidas se encargan de extraer páginas, gestionar credenciales locales, enviar solicitudes y descargar archivos. No se necesitan Flaq CLI ni un servidor local.

## Vídeos de la comunidad en X

Explora doce ejemplos recopilados en [Awesome Seedance 2.5](https://github.com/flaqai/awesome_seedance_2_5). Abre un caso para consultar sus notas, la publicación original de X para ver el prompt del creador, o el MP4 para reproducirlo. La atribución del modelo sigue las publicaciones de origen; son referencias de la comunidad, no vídeos generados con esta habilidad.

| Ejemplo | Caso de uso | Publicación original y prompt | Vídeo |
| --- | --- | --- | --- |
| [X01 · Comedia gastronómica](https://github.com/flaqai/awesome_seedance_2_5#x01-galley-food-comedy) | Animación | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2099186117769822462) | [Ver MP4](https://video.twimg.com/amplify_video/2099186062715404288/vid/avc1/1920x1080/H8uxwKxVsSU09_LW.mp4?tag=29) |
| [X02 · Estilismo de moda](https://github.com/flaqai/awesome_seedance_2_5#x02-one-garment-fashion) | Moda | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2095216981624721691) | [Ver MP4](https://video.twimg.com/amplify_video/2095216899445649408/vid/avc1/1920x1080/LZt4YKiTkMag5Db1.mp4?tag=29) |
| [X03 · Selfie de un gatito](https://github.com/flaqai/awesome_seedance_2_5#x03-rainy-pet-selfie) | UGC | [@Strength04_X](https://x.com/Strength04_X/status/2098256490238755226) | [Ver MP4](https://video.twimg.com/amplify_video/2098256097547309056/vid/avc1/1920x1080/mPxvxfjQ4VcrZg5r.mp4?tag=29) |
| [X04 · Animación callejera](https://github.com/flaqai/awesome_seedance_2_5#x04-live-action-doodle) | VFX | [@Strength04_X](https://x.com/Strength04_X/status/2095748874942263601) | [Ver MP4](https://video.twimg.com/amplify_video/2095748601087688705/vid/avc1/1280x720/vqE5gA1Hrf63bAyB.mp4?tag=29) |
| [X05 · Momentos MiniDV](https://github.com/flaqai/awesome_seedance_2_5#x05-minidv-everyday) | Estilo de vida | [@john_my07](https://x.com/john_my07/status/2090287853532266748) | [Ver MP4](https://video.twimg.com/amplify_video/2090287723961847808/vid/avc1/1920x1080/sNtaxz9M_3wvzoTP.mp4?tag=29) |
| [X06 · Vlog de dos personas](https://github.com/flaqai/awesome_seedance_2_5#x06-two-person-vlog) | Diálogo | [@Strength04_X](https://x.com/Strength04_X/status/2097968347430482177) | [Ver MP4](https://video.twimg.com/amplify_video/2097967562604875776/vid/avc1/1920x1080/EB48uw1_u7MU2RJl.mp4?tag=29) |
| [X07 · Sorpresa en el escenario](https://github.com/flaqai/awesome_seedance_2_5#x07-talent-show-reversal) | Actuación | [@Strength04_X](https://x.com/Strength04_X/status/2090399966988550435) | [Ver MP4](https://video.twimg.com/amplify_video/2090399674129940480/vid/avc1/854x480/8-BwGw71f6WF0sF4.mp4?tag=29) |
| [X08 · ASMR floral](https://github.com/flaqai/awesome_seedance_2_5#x08-pressed-flower-tutorial) | Tutorial | [@Strength04_X](https://x.com/Strength04_X/status/2084269139556761919) | [Ver MP4](https://video.twimg.com/amplify_video/2084268630556983296/vid/avc1/1920x1080/kPWIx5WQsdO1yzGR.mp4?tag=29) |
| [X09 · Efectos visuales de acción](https://github.com/flaqai/awesome_seedance_2_5#x09-energy-action-geography) | Acción | [@Strength04_X](https://x.com/Strength04_X/status/2096147092188311749) | [Ver MP4](https://video.twimg.com/amplify_video/2096146403064254464/vid/avc1/1280x720/MZwL0tlYUawV8djb.mp4?tag=29) |
| [X10 · Diario de viaje](https://github.com/flaqai/awesome_seedance_2_5#x10-day-trip-story-arc) | Viajes | [@Goodmanprotocol](https://x.com/Goodmanprotocol/status/2087165084397420849) | [Ver MP4](https://video.twimg.com/amplify_video/2087164966864556033/vid/avc1/1280x720/CxZZE_2r3pzjndH-.mp4?tag=29) |
| [X11 · Historia de bondad](https://github.com/flaqai/awesome_seedance_2_5#x11-visible-object-handover) | Narración | [@AIwithkhan](https://x.com/AIwithkhan/status/2096424933366931946) | [Ver MP4](https://video.twimg.com/amplify_video/2096424851888300032/vid/avc1/1280x720/LYNMJekyiU57XaaC.mp4?tag=29) |
| [X12 · Paisaje sonoro tropical](https://github.com/flaqai/awesome_seedance_2_5#x12-tropical-location-sound) | Sonido | [@RishuaVR](https://x.com/RishuaVR/status/2089204108175741157) | [Ver MP4](https://video.twimg.com/amplify_video/2089204070997532672/vid/avc1/1280x720/tqcN58TfdD156uJn.mp4?tag=29) |

[Consulta las notas de origen y las adaptaciones de los prompts](https://github.com/flaqai/awesome_seedance_2_5#seedance-25-videos-from-x--watch-inspect-remix). Para generar vídeos, sigue la prioridad de modelos de la habilidad y verifica la documentación actual de Flaq.

## Inspiración para vídeos sin límites

Consulta la [biblioteca de escenarios](scenarios/index.md) para conocer los recursos de entrada, los pasos de trabajo, los prompts originales y los vídeos de ejemplo. Haz clic en una portada para ver el vídeo original.

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp" alt="Presentación de un conjunto cotidiano" height="240"></a><br>
      <strong>Presentación de un conjunto cotidiano</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4">Ver vídeo</a> · <a href="scenarios/virtual-try-on.md#2-everyday-outfit-showcase">Prompt y procedimiento</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp" alt="Presentación de un look de moda" height="240"></a><br>
      <strong>Presentación de un look de moda</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4">Ver vídeo</a> · <a href="scenarios/ugc-ads.md#2-fashion-outfit-reveal">Prompt y procedimiento</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4"><img src="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp" alt="Presentación de conjuntos" height="240"></a><br>
      <strong>Presentación de conjuntos</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4">Ver vídeo</a> · <a href="scenarios/virtual-try-on.md#1-outfit-showcase">Prompt y procedimiento</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4"><img src="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_cover.webp" alt="Presentación de pintalabios" height="240"></a><br>
      <strong>Presentación de pintalabios</strong><br>
      <a href="https://cdn.heydream.im/heydream/v2/ai_product_to_video/example/example1.4_video.mp4">Ver vídeo</a> · <a href="scenarios/product-showcase.md#2-lipstick-presentation">Prompt y procedimiento</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.webp" alt="Vlog de viaje de verano" height="240"></a><br>
      <strong>Vlog de viaje de verano</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/2.mp4">Ver vídeo</a> · <a href="scenarios/image-to-video.md#2-summer-travel-vlog">Prompt y procedimiento</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.webp" alt="Vlog de rutina matinal" height="240"></a><br>
      <strong>Vlog de rutina matinal</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/instagram_reel_generator/example/1.mp4">Ver vídeo</a> · <a href="scenarios/image-to-video.md#3-morning-lifestyle-vlog">Prompt y procedimiento</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp" alt="Anuncio de cuidado de la piel con creadora" height="240"></a><br>
      <strong>Anuncio de cuidado de la piel con creadora</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4">Ver vídeo</a> · <a href="scenarios/ugc-ads.md#3-skincare-creator-ad">Prompt y procedimiento</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4"><img src="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_cover.webp" alt="Demostración con botella" height="240"></a><br>
      <strong>Demostración con botella</strong><br>
      <a href="https://cdn.aitryon.art/home/ai_tryon/ai_product_to_video/example_v2/example1_video.mp4">Ver vídeo</a> · <a href="scenarios/product-showcase.md#1-bottle-demonstration">Prompt y procedimiento</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4"><img src="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp" alt="Anuncio de ropa urbana" height="240"></a><br>
      <strong>Anuncio de ropa urbana</strong><br>
      <a href="https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4">Ver vídeo</a> · <a href="scenarios/ugc-ads.md#1-streetwear-product-ad">Prompt y procedimiento</a>
    </td>
    <td align="center" width="50%">
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4"><img src="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.webp" alt="Secuencia cinematográfica de rescate" height="240"></a><br>
      <strong>Secuencia cinematográfica de rescate</strong><br>
      <a href="https://cdn.heydream.im/heydream/v3/image_to_video/example/2.mp4">Ver vídeo</a> · <a href="scenarios/image-to-video.md#1-cinematic-rescue-sequence">Prompt y procedimiento</a>
    </td>
  </tr>
</table>

Estos ejemplos ya existían en AITryOn, UGCMaker y Heydream; no son nuevas generaciones realizadas con esta habilidad. Las portadas son vistas previas, no entradas de origen verificadas. Cada guía incluye enlaces de origen y prompts originales desplegables; los prompts adaptados se identifican por separado. Consulta la [procedencia de los ejemplos y las referencias de diseño](scenarios/index.md#about-the-examples).

## Selección del modelo

El modelo que elijas explícitamente tiene prioridad. En caso contrario, el agente prefiere Seedance y después Wan, eligiendo la versión más reciente disponible que cumpla los requisitos de entrada, capacidades y presupuesto. Compara otros modelos disponibles si ninguna de estas familias resulta adecuada. Tras un fallo, no cambia automáticamente de modelo ni envía otra tarea de pago.

## Requisitos

- Un agente compatible con habilidades `SKILL.md` que pueda leer páginas web, ejecutar Python y acceder a archivos locales. Una herramienta de navegador resulta útil para páginas dinámicas o que requieren iniciar sesión.
- Python 3.10 o posterior, con los paquetes de [requirements.txt](requirements.txt).
- Acceso de red al sitio web y a la API de Flaq, y a las URL de los vídeos devueltos.
- Una cuenta de Flaq y una Client Key con los permisos y el saldo disponible necesarios para el modelo elegido.
- Para guardar credenciales: el Llavero de macOS, el Administrador de credenciales de Windows o un servicio Secret Service de Linux en ejecución y desbloqueado.

## Instalar la habilidad

Copia todo el directorio `flaq-video-skill` en la ubicación de habilidades admitida por tu agente. Utiliza la ubicación a nivel de proyecto o de usuario indicada en la documentación del agente; depende del entorno anfitrión. Conserva el nombre del directorio y su estructura interna, incluidos `scripts`, `references`, `scenarios`, `templates` y `requirements.txt`. No basta con copiar únicamente `SKILL.md`.

Actualiza o recarga las habilidades según lo requiera tu agente. Comprueba que pueda encontrar `flaq-video-skill` y acceder a los archivos relativos a los que hace referencia [SKILL.md](SKILL.md).

Abre una terminal en el directorio `flaq-video-skill` instalado. Instala las dependencias en el entorno de Python que hayas elegido:

```sh
python3 -m pip install -r requirements.txt
```

En Windows, utiliza `py -3` en lugar de `python3`. Si utilizas un entorno virtual, asegúrate de que el agente ejecute los scripts con ese mismo intérprete. Ni la habilidad ni sus scripts instalan dependencias automáticamente.

## Configura tu clave una sola vez

Crea o copia una Client Key desde la página de gestión de API de Flaq y ejecuta estos comandos en tu propia terminal:

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

Pega la clave cuando se solicite mediante entrada oculta. No la incluyas en mensajes de chat, argumentos de comandos ni archivos JSON de solicitud.

La clave se guarda en el almacén de credenciales del sistema del dispositivo y la cuenta del sistema operativo actuales. Las solicitudes posteriores la leen automáticamente, incluso después de cerrar la terminal o reiniciar el dispositivo. El sistema operativo puede pedirte que autorices el acceso o desbloquees el almacén de credenciales. Vuelve a configurar la clave en cualquier otro dispositivo.

Ejecuta `set` de nuevo para sustituir la clave guardada. Para eliminarla:

```sh
python3 scripts/credentials.py clear
```

En los entornos de automatización existentes, `FLAQ_CLIENT_KEY` tiene prioridad sobre la credencial guardada. Los scripts no cargan automáticamente archivos `.env`, y `clear` no elimina variables de entorno. `status` comprueba la configuración local; no valida la clave de forma remota ni consulta el saldo.

Consulta [Uso de los scripts](references/scripts.md#environment-and-first-time-setup) para obtener detalles del almacenamiento y los requisitos de cada plataforma.

## Uso con tu agente

Pide al agente que utilice Flaq Video Skill y describe el resultado que deseas. Por ejemplo:

> Utiliza Flaq Video Skill para recomendar un modelo que genere un vídeo horizontal de 8 segundos de un puerto tranquilo al amanecer. Compara las opciones adecuadas y estima el coste antes de generar.

> Utiliza Flaq Video Skill con el último modelo Seedance disponible para animar la imagen adjunta. Quiero un acercamiento suave de cámara, formato vertical y sin sonido. Comprueba primero las opciones admitidas y el precio.

> Utiliza Flaq Video Skill para consultar el ID de mi tarea existente y descargar el vídeo si está listo. No crees otra tarea.

### Presentación de conjuntos

> Utiliza Flaq Video Skill para convertir mi imagen de prueba de ropa terminada en una presentación del conjunto. Mantén la apariencia de la persona y la ropa, con un giro suave y un pequeño paso hacia delante. Comprueba la duración y el coste antes de generar.

Lee la [guía de presentación de conjuntos](scenarios/virtual-try-on.md). El punto de partida es una persona que ya lleva puesto el conjunto.

### Anuncio UGC

> Utiliza Flaq Video Skill para crear un anuncio UGC vertical a partir de la imagen de mi producto. Empieza con un detalle del producto, muéstralo en uso y termina con un plano claro del producto. Utiliza los argumentos de venta que he proporcionado y comprueba primero la compatibilidad con audio y el coste.

Lee la [guía de anuncios UGC](scenarios/ugc-ads.md) para ver ejemplos de ropa urbana y presentación de conjuntos con sus prompts originales.

### Demostración de producto

> Utiliza Flaq Video Skill para animar esta foto de una persona sosteniendo una botella. Haz que tome un sorbo y presente la botella a la cámara. Conserva su forma y su etiqueta. Comprueba primero las opciones admitidas y el coste.

Lee la [guía de productos](scenarios/product-showcase.md) para ver ejemplos de botellas y pintalabios. Para animar escenas generales, utiliza la [guía de imagen a vídeo](scenarios/image-to-video.md).

Puedes especificar un modelo, enlazar su página de detalle en Flaq o dejar que el agente siga la prioridad predeterminada. El agente lee la documentación detallada del modelo seleccionado antes de preparar la solicitud. Una vez que autorices la generación y se hayan establecido las opciones necesarias y el alcance del coste, envía la tarea y registra su ID para el seguimiento.

## Comprobar el acceso al sitio sin clave

Desde el directorio de la habilidad:

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

Este comando lee una página pública sin credenciales ni llamadas de pago a la API. El script extrae enlaces de modelos y documentación, el texto de la página, ejemplos de código y especificaciones públicas de los modelos cuando existen. El agente sigue los enlaces reales a las páginas de detalle y a la documentación en lugar de adivinar las URL.

## Archivos y lecturas adicionales

| Archivo o directorio | Finalidad |
| --- | --- |
| [SKILL.md](SKILL.md) | Instrucciones del agente, prioridad de modelos y flujo completo |
| [references/scripts.md](references/scripts.md) | Comandos exactos de configuración, solicitud, consulta periódica, carga y descarga |
| [references/model-discovery.md](references/model-discovery.md) | Lectura de especificaciones y contraste con la documentación detallada |
| [scenarios/index.md](scenarios/index.md) | Selección de escenarios, requisitos de entrada, procedimientos, prompts y galerías de vídeos originales |
| `scripts/credentials.py` | Configurar, inspeccionar y eliminar credenciales locales |
| `scripts/read_page.py` | Extraer información de las páginas públicas de Flaq |
| `scripts/video_request.py` | Enviar, consultar, esperar y descargar tareas de vídeo |
| `templates/` | Plantillas genéricas de solicitudes y archivos locales para completar según la documentación actual |
| `tests/` | Comprobaciones de comportamiento sin conexión con entradas de prueba aisladas |

Las plantillas de solicitud son estructuras iniciales, no ejemplos listos para enviar. Mantén las plantillas sin cambios y prepara cada solicitud en tu directorio de trabajo. Los campos y los formatos de carga admitidos dependen de la documentación actual del modelo seleccionado.

## Solución de problemas

| Problema | Qué comprobar |
| --- | --- |
| El agente no encuentra la habilidad | Verifica la ubicación de habilidades del entorno anfitrión, copia la carpeta completa y actualiza la búsqueda de habilidades. |
| Falta una dependencia | Instala `requirements.txt` con el mismo intérprete de Python que utiliza el agente. |
| El almacén de credenciales no está disponible | Comprueba el acceso al sistema y desbloquéalo. En Linux, asegúrate de que Secret Service se esté ejecutando en la sesión del usuario actual. Los scripts no recurren al almacenamiento en texto plano. |
| `status` funciona, pero la generación falla | La configuración local no demuestra el acceso remoto. Comprueba los permisos de la clave, el saldo, la disponibilidad del modelo y los parámetros de la solicitud. |
| Se eliminó la clave guardada, pero las solicitudes siguen autenticándose | Comprueba si `FLAQ_CLIENT_KEY` sigue definida en el entorno del agente. |
| Los detalles del modelo o la documentación están incompletos | Sigue el enlace real a la documentación, aumenta el límite de texto si se ha truncado o utiliza el navegador del agente para el contenido dinámico. No adivines los parámetros que faltan. |
| Se agota el tiempo de espera | Conserva el ID de la tarea y vuelve a consultarla. Que se agote el tiempo de espera local no significa que la generación remota haya fallado o se haya cancelado. |
| El envío termina con un error de red | Comprueba si Flaq creó una tarea antes de volver a enviarla para evitar cargos duplicados. |
| Falla una descarga | Conserva la URL del resultado, comprueba el directorio de salida y el nombre del archivo, y examina el error indicado. Los archivos existentes nunca se sobrescriben. |

## Comprobaciones de desarrollo

Ejecuta desde el directorio de la habilidad:

```sh
python3 -m unittest discover -s tests -v
```

Estas pruebas no utilizan credenciales reales del sistema ni envían tareas de pago. Cubren la extracción de páginas, el comportamiento del acceso a credenciales, el tratamiento de solicitudes y la protección de archivos. No sustituyen las comprobaciones reales del almacén de credenciales en cada sistema operativo ni una prueba autorizada de generación de principio a fin.
