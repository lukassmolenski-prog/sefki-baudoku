// © 2026 Lukas Smolenski · Smolens·KI · Alle Rechte vorbehalten.
// SEF-KI Baudoku – Offline-Cache
const C = 'sefki-v20';
const MC = 'ew-modelle-v1'; // Erkennungsmodelle: bleiben über Updates hinweg erhalten (ca. 20 MB)
const TC = 'sefki-kacheln';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './fonts/Barlow-Regular.ttf', './fonts/Barlow-Medium.ttf', './fonts/Barlow-SemiBold.ttf', './fonts/Barlow-Bold.ttf', './fonts/BarlowCondensed-SemiBold.ttf', './fonts/BarlowCondensed-Bold.ttf'];
const CACHE_HOSTS = /cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com|storage\.googleapis\.com/;
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C && k !== TC && k !== MC && !k.startsWith('sefki-stimme')).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  const own = u.origin === location.origin;
  // Kartenkacheln: zuerst aus dem Speicher (offline), sonst laden und merken
  if (/tile\.openstreetmap\.org|server\.arcgisonline\.com/.test(u.hostname)) {
    e.respondWith(caches.open(TC).then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res && res.ok) { c.put(e.request, res.clone()); c.keys().then(ks => { if (ks.length > 2500) ks.slice(0, 300).forEach(k => c.delete(k)); }); }
      return res;
    }))).catch(() => caches.match(e.request)));
    return;
  }
  // Erkennungsmodelle (Datenschutz): einmal laden, dann dauerhaft offline
  if (own && u.pathname.includes('/models/')) {
    e.respondWith(caches.open(MC).then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(res => { if (res && res.ok) c.put(e.request, res.clone()); return res; }))));
    return;
  }
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
