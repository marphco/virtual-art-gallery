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
  "/pages/Profile.jsx",
  "/pages/Error.jsx",
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
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

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((fetchResponse) => {
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== "basic") {
          return fetchResponse;
        }

        const responseToCache = fetchResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache).catch(error => {
            console.error("Failed to put response in cache:", error);
          });
        });

        return fetchResponse;
      }).catch(error => {
        console.error("Fetch failed:", error);
      });
    }).catch(error => {
      console.error("Cache match failed:", error);
    })
  );
});
