if (navigator.serviceWorker) {
	$(window).on('load', () => {
		navigator.serviceWorker.register('sw.js').then(
			() => {
				console.log('ServiceWorker registered succesfully!');
			},
			(err) => {
				console.log(`ServiceWorker registration failed, ${err}`);
			}
		);
	});
}
