const CACHE = 'keys-cache-v33';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-180.png?v=1',
  './icon-512.png?v=1',
  './piano/21.m4a',
  './piano/24.m4a',
  './piano/27.m4a',
  './piano/30.m4a',
  './piano/33.m4a',
  './piano/36.m4a',
  './piano/39.m4a',
  './piano/42.m4a',
  './piano/45.m4a',
  './piano/48.m4a',
  './piano/51.m4a',
  './piano/54.m4a',
  './piano/57.m4a',
  './piano/60.m4a',
  './piano/63.m4a',
  './piano/66.m4a',
  './piano/69.m4a',
  './piano/72.m4a',
  './piano/75.m4a',
  './piano/78.m4a',
  './piano/81.m4a',
  './piano/84.m4a',
  './piano/87.m4a',
  './piano/90.m4a',
  './piano/93.m4a',
  './piano/96.m4a',
  './piano/99.m4a',
  './piano/102.m4a',
  './piano/105.m4a',
  './piano/108.m4a'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  if (e.request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    e.respondWith(
      fetch(e.request).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return r;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
