"use strict";

(async() => {
	const unregisterAllServiceWorkers = async function() {
		return new Promise(resolve => {
			navigator.serviceWorker.getRegistrations().then(registrations => {
				for (let registration of registrations) {
					registration.unregister();
				}
				resolve();
			});
		})
	}
	let body = document.getElementsByTagName('body')[0]
	let title = document.getElementsByClassName('window-title')
	let update = document.getElementsByClassName("_3YewW");
	if (title.length && title[0].innerText.includes('WhatsApp works with')) {
		body.innerHTML = ''
		await unregisterAllServiceWorkers();
		window.location.href = window.location.origin
	} else if(update.length) {
		update[0].click();
	} else {
		let style = document.createElement('style')
		style.innerHTML = {MY_CUSTOM_STYLE}
		body.before(style)
	}
})();