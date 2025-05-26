const CACHE_NAME = "memory-game-cache";
const urlsToCache = [
    "/",
    "/index.html",
    "/css/styles.css",
    "/js/script.js",
    "/img/icon-192x192.png",
    "/img/icon-512x512.png",
    "/img/memory-icon.png",
    "/img/finish.png",
    "/img/bg1.jpg",
    "/img/bg2.jpg",
    "/img/bg3.jpg"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting(); // Activar el SW inmediatamente
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim(); // Tomar control de las páginas abiertas
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Si está en caché, responde con caché; si no, intenta obtenerlo de la red y guarda una copia
            return response || fetch(event.request).then((networkResponse) => {
                // Solo cachea peticiones GET y exitosas
                if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Si falla la red y no hay caché, muestra una página offline básica si es HTML
                if (event.request.destination === 'document') {
                    return new Response('<h1>Sin conexión</h1><p>No hay conexión a internet y el recurso no está en caché.</p>', {
                        headers: { 'Content-Type': 'text/html' }
                    });
                }
            });
        })
    );
});
