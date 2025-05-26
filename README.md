# MemoryGame-FinalProyect
Memory Game por Final Proyect in PWA

# Documentación del Juego de Memoria (PWA)

Este proyecto es un juego de memoria interactivo desarrollado como Aplicación Web Progresiva (PWA). A continuación se documentan los archivos principales:

**• ¿Qué necesidad o problemática detectaron?**
    Muchas personas buscan juegos rápidos y relajantes que les permitan desconectar, mejorar su memoria o simplemente pasar el tiempo.

**• ¿Por qué decidieron trabajar en ese tema?**
    Es un juego sencillo pero efectivo que no requiere mucha lógica compleja, lo que permite centrarse más en la experiencia del usuario y el diseño visual. Además, puede adaptarse fácilmente a diferentes audiencias.

**• ¿Quiénes se beneficiarían con esta aplicación?**
    Niños, jóvenes y adultos que desean entretenerse y estimular su memoria visual en sesiones cortas.

## **Colores principales y secundarios utilizados en la app (actualizado)**

• **Primarios:**
    - Azul claro (#4A90E2): Fondo principal y elementos destacados, transmite calma y concentración.
    - Blanco (#FFFFFF): Fondos de tarjetas y textos para máxima legibilidad.
    - Azul intenso (#1976d2): Bordes de tarjetas y detalles activos.

• **Secundarios:**
    - Verde menta (#50E3C2): Animaciones de éxito y reverso de cartas al acertar.
    - Naranja (#f57c00): Bordes y reverso de cartas en algunos fondos aleatorios.
    - Verde oscuro (#388e3c): Alternativa de fondo y borde en modo aleatorio.
    - Rojo coral (#FF6F61): Botones de reinicio.
    - Gris suave (#D3D3D3): Elementos inactivos y bordes sutiles.

## Tipografía (actualizado):
- **Fuente principal:** 'Roboto', sans-serif (para textos generales y botones, por su legibilidad y modernidad).
- **Fuente secundaria:** 'Poppins', sans-serif (usada en títulos y elementos destacados para dar un toque juvenil y amigable).
- Ambas fuentes se cargan desde Google Fonts en el index.html.

## Justificación:

- Los colores principales (azul claro y blanco) crean una atmósfera relajante y limpia, ideal para juegos de memoria donde la concentración es clave.
- Los secundarios (verde menta, naranja, verde oscuro, rojo coral) aportan dinamismo y refuerzan el feedback visual (éxito, error, selección).
- El uso de variables CSS y cambios de fondo aleatorios mantiene la experiencia fresca y atractiva en cada partida.
- Las fuentes elegidas priorizan la accesibilidad y la claridad visual, facilitando la lectura para todas las edades y dispositivos.
- La combinación de Roboto y Poppins aporta modernidad y cercanía, alineándose con el público objetivo (niños, jóvenes y adultos que buscan entretenimiento ligero y visualmente agradable).

## Bocetos descritos

• **Pantalla de inicio:**
  - Presenta el título del juego, botones para seleccionar la dificultad y un botón para comenzar la partida. Es una pantalla sencilla y amigable que da la bienvenida al usuario y le permite configurar el juego antes de empezar.

• **Pantalla de juego:**
  - Muestra el tablero de cartas, el contador de movimientos y el cronómetro. Aquí el usuario interactúa con las cartas para encontrar las parejas. El diseño es limpio, con colores y animaciones que refuerzan el feedback visual.

• **Pantalla de finalización:**
  - Aparece cuando el usuario completa el juego. Muestra un mensaje de felicitación, el tiempo y los movimientos realizados, y ofrece un botón para reiniciar o volver al inicio. Refuerza el logro y motiva a volver a jugar.

> Se adjunta pdf al repositorio.

---

## index.html

Archivo principal HTML que define la estructura de la aplicación:
- **Pantalla de bienvenida**: Permite seleccionar dificultad y acceder a instrucciones o información del proyecto.
- **Tablero de juego**: Muestra las cartas, contador de movimientos, temporizador y botón de reinicio.
- **Modales**: Para instrucciones, acerca de y finalización del juego.
- **Recursos**: Incluye enlaces a `styles.css`, `script.js` y el manifest para PWA.
- **Service Worker**: Registra el service worker para funcionalidades offline.

---

## script.js

Archivo JavaScript que implementa la lógica del juego:
- **Inicialización**: Asigna eventos a los botones y modales.
- **Lógica del juego**: Genera cartas según dificultad, mezcla, controla el volteo, comparación de pares, movimientos y temporizador.
- **Fondos dinámicos**: Cambia el fondo y colores de cartas aleatoriamente en cada partida.
- **Gestión de modales**: Abre y cierra los modales de instrucciones y acerca de.
- **Reinicio**: Permite volver al inicio desde el tablero o el modal de finalización.
- **Utilidades**: Incluye mezcla de cartas (Fisher-Yates) y manipulación del DOM.

---

## styles.css

Hoja de estilos principal:
- **Estilos generales**: Tipografía, colores y eliminación de scroll.
- **Pantalla de bienvenida**: Título, botones de dificultad y botones circulares.
- **Tablero de juego**: Grid responsivo para las cartas.
- **Cartas**: Colores, bordes, animaciones y estados.
- **Controles**: Estiliza contador de movimientos, temporizador y botón de reinicio.
- **Modales**: Estilos y animaciones para instrucciones, acerca de y finalización.
- **Responsividad**: Ajustes para móviles.
- **Animaciones**: Transiciones suaves para la interfaz.


# Documentación del archivo `manifest.webmanifest`

El archivo `manifest.webmanifest` define los metadatos principales para la aplicación web "Juego de Memoria", permitiendo que funcione como una Progressive Web App (PWA). Este archivo es esencial para que la aplicación pueda instalarse en dispositivos móviles y ofrecer una experiencia similar a una app nativa.

## Campos principales

- **name**: Nombre completo de la aplicación que se muestra al usuario ("Juego de Memoria").
- **short_name**: Nombre corto que se utiliza cuando hay poco espacio, por ejemplo, en la pantalla de inicio ("Memoria").
- **start_url**: URL de inicio de la aplicación cuando se abre desde el ícono instalado ("index.html").
- **display**: Modo de visualización. "standalone" hace que la app se vea como una aplicación nativa, sin barra de direcciones del navegador.
- **background_color**: Color de fondo que se muestra mientras la app se carga.
- **lang**: Idioma principal de la aplicación ("es" para español).
- **scope**: Define el alcance de la aplicación, limitando la navegación a la raíz ("/").
- **description**: Espacio para una breve descripción de la app (actualmente vacío).
- **theme_color**: Color principal de la interfaz, usado por el sistema operativo para personalizar la barra de estado y otros elementos.
- **icons**: Lista de íconos en diferentes resoluciones que se usan para la pantalla de inicio, splash screen y otros lugares del sistema.
    - Cada ícono tiene:
        - `src`: Ruta de la imagen.
        - `sizes`: Tamaño de la imagen.
        - `type`: Tipo de archivo (por ejemplo, "image/png").

## Ejemplo de uso
Este archivo debe estar referenciado en el `<head>` de tu `index.html` así:
```html
<link rel="manifest" href="manifest.webmanifest">
```

## Importancia
- Permite instalar la app en dispositivos móviles y de escritorio.
- Define cómo se verá el ícono y el nombre en la pantalla de inicio.
- Mejora la integración con el sistema operativo y la experiencia de usuario.


# Documentación del Service Worker (`sw.js`)

Este archivo implementa un Service Worker para una aplicación web tipo juego de memoria. El Service Worker permite que la aplicación funcione offline y mejore el rendimiento mediante el uso de caché.

## Descripción General

El Service Worker gestiona tres eventos principales:
- **install**: Se encarga de almacenar en caché los recursos esenciales de la aplicación.
- **activate**: Elimina cachés antiguos y toma control inmediato de las páginas abiertas.
- **fetch**: Intercepta las peticiones de red para servir recursos desde la caché o, si no están, desde la red, almacenando una copia en caché para futuras solicitudes.

## Variables principales
- `CACHE_NAME`: Nombre de la caché utilizada por la aplicación.
- `urlsToCache`: Lista de rutas de archivos que se almacenarán en caché durante la instalación.

## Eventos

### 1. Instalación (`install`)
- Abre la caché definida por `CACHE_NAME`.
- Añade todos los archivos listados en `urlsToCache` a la caché.
- Llama a `self.skipWaiting()` para activar el Service Worker inmediatamente.

### 2. Activación (`activate`)
- Elimina todas las cachés antiguas que no coincidan con `CACHE_NAME`.
- Llama a `self.clients.claim()` para tomar control de las páginas abiertas sin esperar a que se recarguen.

### 3. Intercepción de peticiones (`fetch`)
- Intenta responder a cada petición con una versión en caché.
- Si no está en caché, realiza la petición a la red y almacena la respuesta en caché si es exitosa y de tipo GET.
- Si la red falla y no hay caché, muestra una página HTML básica de "Sin conexión" para documentos HTML.

## Ejemplo de recursos cacheados
- `/index.html`
- `/css/styles.css`
- `/js/script.js`
- Imágenes de íconos y fondos

## Restricción de orientación (solo vertical)
- La aplicación está diseñada únicamente para usarse en modo vertical en dispositivos móviles.
- Si el usuario gira el dispositivo a modo horizontal, se muestra un mensaje a pantalla completa solicitando volver a modo vertical (funciona en Android y iOS).
- En el archivo `manifest.webmanifest` se ha añadido la propiedad `"orientation": "portrait"` para reforzar la restricción en navegadores compatibles.
- La detección y el mensaje se implementan en `script.js` mediante un overlay a pantalla completa.

## Notas adicionales
- El Service Worker está diseñado para aplicaciones tipo PWA (Progressive Web App).
- Mejora la experiencia offline y la velocidad de carga.
- Es importante actualizar `CACHE_NAME` cuando se modifiquen los recursos para evitar servir versiones antiguas.


# Autor del repositorio

**Autor:** Michel Ashley
**Fecha:** 2025-05-25
