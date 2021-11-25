  import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'  



runServiceWorker();

function runServiceWorker() {
	try {

	cleanupOutdatedCaches()
    precacheAndRoute(self.__WB_MANIFEST)  
 

      self.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SKIP_WAITING')
        self.skipWaiting()
    })  

		self.addEventListener('install', event => {
		});

		self.addEventListener('activate', event => {
		});

		self.addEventListener('fetch', function (event) {


			if (event.request.url.startsWith('https://res.cloudinary.com/')) {
				event.respondWith(
					caches.match(event.request).then(function (response) {
						if (response !== undefined) {
							return response;
						} else {
							return fetch(event.request)
								.then(function (response) {
									let responseClone = response.clone();

									caches.open('v1-app-images').then(function (cache) {
										cache.put(event.request, responseClone);
									});
									return response;
								})
								.catch(function () {
									return caches.match('/fetchPlaceholder.jpg');
								});
						}
					})
				);
			}
		});

		self.addEventListener('push', event => {
			const title = event.data.text();
			console.log(title);
			event.waitUntil(self.registration.showNotification(title));
		});

		self.addEventListener('push', event => {
			const title = event.data.text();
			console.log();
		});
	} catch (error) {
		console.log({ Message: 'Could not register Service worker', Error: error });
	}
}
