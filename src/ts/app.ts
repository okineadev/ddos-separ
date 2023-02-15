if (navigator.serviceWorker) {
	$(window).on('load', () => {
		navigator.serviceWorker.register('sw.js').then(
			() => {
				console.log('ServiceWorker registered succesfully!');
			},
			(err: Error) => {
				console.log(`ServiceWorker registration failed, ${err}`);
			}
		);
	});
}
