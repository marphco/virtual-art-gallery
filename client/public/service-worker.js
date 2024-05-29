const CACHE_NAME = "panorama-cache-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/main.js",
  "/index.css",
  "/app.js",
  "/app.css",
  "/components/Room.js",
  "/components/Navbar.js",
  "/components/Homepage.js",
  "/components/Gallery.js",
  "/components/FavoritesCard.js",
  "/components/CameraControls.js",
  "/components/OrderHistory.js",
  "/pages/Profile.js",
  "/pages/Error.js",
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
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch((error) => {
          console.error("Fetch failed; returning offline page instead.", error);
          return caches.match('/offline.html');
        });
      });
    })
  );
});