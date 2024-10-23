// Service Worker for enabling PWA features such as offline support and caching

const CACHE_NAME = 'gov2go-cache-v1';
const assetsToCache = [
  '/',  // Cache the root of the app
  '/index.html',  // Main HTML page
  '/static/js/bundle.js',  // Main JS bundle
  '/static/css/main.css',  // Main CSS file
  '/favicon.ico',  // App icon
];

// Register the service worker
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/serviceWorker.js')
        .then(registration => {
          console.log('Service Worker registered with scope: ', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

// Unregister the service worker
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister()
          .then(() => {
            console.log('Service Worker unregistered');
          });
      });
  }
}

// Cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(assetsToCache);
      })
  );
});

// Fetch cached assets or request from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Remove outdated caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});
 
