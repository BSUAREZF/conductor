;
//const CACHE_NAME = 'v2_mototaxis';
//var urlsToCache = [
//    './',
//    './bootstrap/css/bootstrap.css',
//    './dist/css/AdminLTE1.css',
//    './plugins/iCheck/square/blue.css',
//    './https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
//    './dist/css/AdminLTE1.css',
//    './dist/css/skins/_all-skins1.css',
//    './bootstrap/js/bootstrap.min.js',
//    './dist/js/app.min.js',
//    './dist/js/demo.js',
//    './dist/js/pages/dashboard.js',
//    './img/ProgramadorFitness.png',
//    './img/favicon.png'
//];
//
//self.addEventListener('install', function(event) {
//  // Perform install steps
//  event.waitUntil(
//    caches.open(CACHE_NAME)
//      .then(function(cache) {
//        console.log('Opened cache');
//        return cache.addAll(urlsToCache);
//      })
//  );
//});
//
//self.addEventListener('fetch', function(event) {
//  event.respondWith(
//    caches.match(event.request)
//      .then(function(response) {
//        // Cache hit - return response
//        if (response) {
//          return response;
//        }
//
//        // IMPORTANT: Clone the request. A request is a stream and
//        // can only be consumed once. Since we are consuming this
//        // once by cache and once by the browser for fetch, we need
//        // to clone the response.
//        var fetchRequest = event.request.clone();
//
//        return fetch(fetchRequest).then(
//          function(response) {
//            // Check if we received a valid response
//            if(!response || response.status !== 200 || response.type !== 'basic') {
//              return response;
//            }
//
//            // IMPORTANT: Clone the response. A response is a stream
//            // and because we want the browser to consume the response
//            // as well as the cache consuming the response, we need
//            // to clone it so we have two streams.
//            var responseToCache = response.clone();
//
//            caches.open(CACHE_NAME)
//              .then(function(cache) {
//                cache.put(event.request, responseToCache);
//              });
//
//            return response;
//          }
//        );
//      })
//    );
//});
//self.addEventListener('activate', function(event) {
//
//  var cacheWhitelist = ['v2_mototaxis'];
//
//  event.waitUntil(
//    caches.keys().then(function(cacheNames) {
//      return Promise.all(
//        cacheNames.map(function(cacheName) {
//          if (cacheWhitelist.indexOf(cacheName) === -1) {
//            return caches.delete(cacheName);
//          }
//        })
//      );
//    })
//  );
//});




//asignar un nombre y versión al cache
const CACHE_NAME = 'v2_mototaxis',
  urlsToCache = [
    './',
    './bootstrap/css/bootstrap.css',
    './dist/css/AdminLTE1.css',
    './plugins/iCheck/square/blue.css',
    './plugins/jQuery/jQuery-2.1.4.min.js',
    './script.js',
    './dist/css/skins/_all-skins1.css',
    './bootstrap/js/bootstrap.min.js'
  ];

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
});



//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})