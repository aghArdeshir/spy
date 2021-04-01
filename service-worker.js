const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline";

const all_paths = [
  "/",
  "/style.css",
  "/index.mjs",
  "/service-worker-loader.mjs",
  "/Assigner.mjs",
  "/categories.mjs",
  "/pages.mjs",
  "/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      for (path of all_paths) {
        await cache.add(new Request(path), { cache: "reload" });
      }
    })()
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          console.error("Fetch failed; returning offline page instead");
          console.error("for this event -> ", event);
          console.error(error);

          const cache = await caches.open(CACHE_NAME);
          const url = event.request.url.split("/")[3];
          const cachedResponse = await cache.match("/" + url);
          return cachedResponse;
        }
      })()
    );
  } else {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const url = event.request.url.split("/")[3];
        const cachedResponse = await cache.match("/" + url);
        return cachedResponse;
      })()
    );
  }
});
