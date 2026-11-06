const C='horizon28-v11',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icons/axe1.svg','./icons/axe2.svg','./icons/axe3.svg','./icons/cyber.svg','./icons/estime.svg','./icons/p2ia.svg','./icons/partenaires.svg','./icons/prog.svg','./icons/vr.svg','./icons/webradio.svg','./icons/webtv.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
// Réseau d'abord (toujours la dernière version), cache en secours hors-ligne
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(fetch(e.request).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp));return n}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
