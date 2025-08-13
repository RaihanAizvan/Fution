const CACHE_NAME = "fution-cache-v1";
const urlsToCache = [
  "/index.html",               //  index.html
  "/style.css",     //  CSS
  "/main.js",         //  JS
  "/offline.html",   // fallback page
  "/logo.png",
];

// Install Service Worker & Cache Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});


// Serve Cached Files When Offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((response) => {
      if (response) return response;
      return caches.match("/offline.html");
    }))
  );
});

// Update Cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
});
