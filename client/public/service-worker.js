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
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache.map(url => new Request(url, { cache: "reload" })));
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

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        let responseToCache = response.clone();

        if (event.request.url.startsWith("http")) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache).then(() => {
              sendCacheDataToServer(event.request.url, responseToCache.clone());
            }).catch(error => {
              console.error("Failed to put response in cache:", error);
            });
          });
        }

        return response;
      }).catch(error => {
        console.error("Fetch failed:", error);
      });
    }).catch(error => {
      console.error("Cache match failed:", error);
    })
  );
});

function sendCacheDataToServer(url, response) {
  response.blob().then((blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      fetch("/save-cache", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          content: reader.result,
        }),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Server response:", data);
        })
        .catch((error) => {
          console.error("Error sending cache data to server:", error);
        });
    };
    reader.readAsDataURL(blob);
  }).catch(error => {
    console.error("Error reading response body:", error);
  });
}
