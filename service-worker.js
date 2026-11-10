const CACHE_NAME='stimato-shell-v4';
const APP_SHELL=['/','/index.html','/manifest.webmanifest','/icons/stimato.svg','/icons/apple-touch-icon.png'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
  if(request.mode==='navigate'){
    /* Only a good copy of the app page may replace the offline copy; a 404 or
       a visit to robots.txt/sitemap.xml must not become the offline app. */
    const path=new URL(request.url).pathname;
    event.respondWith(fetch(request).then(response=>{
      if(response.ok&&(path==='/'||path==='/index.html')){
        const copy=response.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put('/index.html',copy));
      }
      return response;
    }).catch(()=>caches.match('/index.html')));
    return;
  }
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));
});
