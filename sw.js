// © 2026 Lukas Smolenski · Smolens·KI · Alle Rechte vorbehalten.
// SEF-KI Baudoku – Offline-Cache
const C = 'sefki-v5';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
const CACHE_HOSTS = /cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com|storage\.googleapis\.com/;
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  const own = u.origin === location.origin;
  if (!own && !CACHE_HOSTS.test(u.hostname)) return; // KI, Zeitstempel, Wetter, Adressen: immer live
  // App-Seite: zuerst Netz (damit Updates sofort ankommen), sonst Cache
  if (own && (u.pathname.endsWith('/') || u.pathname.endsWith('.html'))) {
    e.respondWith(fetch(e.request).then(res => { const cl = res.clone(); caches.open(C).then(c => c.put(e.request, cl)); return res; }).catch(() => caches.match(e.request)));
    return;
  }
  // Bibliotheken, Schriften, Modelle: Cache zuerst, im Hintergrund aktualisieren
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request).then(res => { if (res && (res.ok || res.type === 'opaque')) { const cl = res.clone(); caches.open(C).then(c => c.put(e.request, cl)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
