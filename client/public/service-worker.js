const CACHE_NAME = "panorama-cache-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/main.jsx",
  "/index.css",
  "/app.jsx",
  "/app.css",
  "/components/Room.jsx",
  "/components/Navbar.jsx",
  "/components/Homepage.jsx",
  "/components/Gallery.jsx",
  "/components/FavoritesCard.jsx",
  "/components/CameraControls.jsx",
  "/components/OrderHistory.jsx",
  "/pages/Profile.jsx",
  "/pages/Error.jsx",
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("Failed to cache resources during install:", error);
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      self.clients.claim(); 
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    // If it's not a GET request, do nothing
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        // If a cached response is found, return it
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch the resource from the network
        return fetch(event.request).then(networkResponse => {
          // Check if the response is valid and cache it
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            cache.put(event.request, responseToCache);
          }

          return networkResponse;
        });
      });
    })
  );
});
