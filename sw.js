const STATIC_CACHE = 'spire-static-v1';
const DATA_CACHE = 'spire-data-v1';
const STATIC_ASSETS = [
  // === ยังไม่ใช้ '/', '/index.html',
  // === '/gv-allowed?v=2025-08-27-1.js', '/gem-allowed?v=2025-08-27-1.js', '/select-rules?v=2025-08-27-1.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(STATIC_CACHE).then(c=>c.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k=>![STATIC_CACHE, DATA_CACHE].includes(k)).map(k=>caches.delete(k)))
  ));
  self.clients.claim();
});

// Stale-while-revalidate สำหรับ API ของ GAS
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  const isData = url.searchParams.get('action') === 'getItems'
              || url.searchParams.get('action') === 'getUpdates';
  if (isData) {
    e.respondWith((async () => {
      const cache = await caches.open(DATA_CACHE);
      const cached = await cache.match(e.request);
      const network = fetch(e.request).then(res => {
        cache.put(e.request, res.clone());
        return res;
      }).catch(()=>null);
      return cached || network || new Response(JSON.stringify({items:[],updates:[]}), {headers:{'Content-Type':'application/json'}});
    })());
    return;
  }

  // static
  if (STATIC_ASSETS.includes(url.pathname)) {
    e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
  }
});