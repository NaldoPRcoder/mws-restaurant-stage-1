//Based on Traversy Media Tutorial on YouTube:https://www.youtube.com/watch?v=ksXwaWHCW6k
//Make sure sw are supported
if(navigator.serviceWorker) {
    // console.log('Service Worker Supported');
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw_cached.js')
            .then(reg => console.log('Service Worker: Register'))
            .catch(err => console.log(`Service Worker: Error: ${err}`))
    });
}
