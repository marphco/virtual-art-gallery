const CACHE_NAME = 'panorama-cache-v1'; 

const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/main.jsx',
  '/index.css',
  '/app.jsx',
  '/app.css',
  '/components/Room.jsx',
  '/components/Navbar.jsx',
  '/components/Homepage.jsx',
  '/components/Gallery.jsx',
  '/components/FavoritesCard.jsx',
  '/components/CameraControls.jsx',
  '/pages/Profile.jsx',
  '/pages/Error.jsx'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Failed to cache resources during install:', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; 
      }

      return fetch(event.request)
        .then(response => {
          
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          let responseToCache = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache); 
          });

          return response;
        });
    })
  );
});
