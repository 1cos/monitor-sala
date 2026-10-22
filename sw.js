// Monitor sala: tiene le foto nella memoria del TV.
// Foto: prima dalla memoria, internet solo se mancano (ogni foto ha un nome unico, non cambia mai).
// Pagina e lista: prima internet (per gli aggiornamenti), memoria se internet manca.
const FOTO = "foto-v1", PAGINE = "pagine-v1";

self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(self.clients.claim()); });

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  if (url.pathname.includes("/foto/")) {
    e.respondWith(caches.open(FOTO).then(async c => {
      const m = await c.match(e.request);
      if (m) return m;
      const r = await fetch(e.request);
      if (r.ok) c.put(e.request, r.clone());
      return r;
    }));
  } else {
    e.respondWith(fetch(e.request).then(r => {
      if (r.ok) { const copia = r.clone(); caches.open(PAGINE).then(c => c.put(e.request, copia)); }
      return r;
    }).catch(() => caches.match(e.request)));
  }
});
