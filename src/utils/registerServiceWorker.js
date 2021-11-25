import { registerSW } from 'virtual:pwa-register';



export async function registerServiceWorker({ mode }) {


	if ('serviceWorker' in navigator) {

		if (mode === 'dev') {

			try {

				await navigator.serviceWorker.register('sw.js');

			} catch (error) {
				return
				
			}

		} else if (mode === 'prod') {

			try {

				const updateSW = registerSW({
					onNeedRefresh() {},
					onOfflineReady() {},
				});
				
			} catch (error) {
				return
				
			}

		}

		return;
	} else {
		console.log('This browser does not have support for Service workers');

		return;
	}
}

