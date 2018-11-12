const cacheName = "sw_v1"

//install event
self.addEventListener('install', e => {
    console.log("Service Worker installed");
});

//Activate event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    //Remove unwanted caches
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

// Fetch event
self.addEventListener('fetch', e => {
    console.log('Service Worker is fetching');
    e.respondWith(
        fetch(e.request)
        .then(response => {
            //Make copy of response
            const responseCopy = response.clone();
            //Open cache
            caches.open(cacheName)
            .then(cache => {
                //Add response to the cache
                cache.put(e.request, responseCopy);
            });
            return response;
        }).catch(err => caches.match(e.request)
        .then(response => response))
    );
});
