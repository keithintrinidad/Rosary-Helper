// Service worker for "The Rosary" — opens the app from the cache first,
// so it launches instantly even on a slow or missing connection, then
// quietly refreshes the cached copy in the background when it can.
// Bump CACHE_NAME any time index.html, manifest.json, or the icons
// change, so returning visitors pick up the new version.
const CACHE_NAME = "rosary-companion-v1.7";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;

  // Every page open (including launches from the home-screen icon, which
  // may add a ?query string) is answered with the one cached index.html.
  const isPage = req.mode === "navigate";
  const key = isPage ? new Request("./index.html") : req;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(key, { ignoreSearch: true });

    // Refresh the cache in the background (never blocks the page).
    const refresh = fetch(isPage ? key : req)
      .then((res) => {
        if (res && res.status === 200) cache.put(key, res.clone());
        return res;
      });

    if (cached) {
      event.waitUntil(refresh.catch(() => {}));
      return cached;
    }
    return refresh; // first-ever visit: nothing cached yet, use the network
  })());
});
