const CACHE_NAME = 'ddos-separ-cache';

const urlsToCache = ['/'];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function (_) {})
					.map(function (cacheName) {
						return caches.delete(cacheName);
					})
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(fetch(event.request));
});
