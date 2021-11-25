

function checkForMediaDevices() {

	console.log('Checks');
	if ('mediaDevices' in navigator) {
		return true
	} else {
		return false
	} 
		
}

export async function getMedia({ facingMode }) {
	
	const constraints = {
		audio: false,
		video: {
			width: {max: 1080},
			height: {max: 1080},
			aspectRatio: {ideal: 1},
			facingMode: facingMode
		} 
		
	};

	try {
		if (!checkForMediaDevices()) throw new Error('Media devices are not supported on this machine')
		return await navigator.mediaDevices.getUserMedia(constraints);
	} catch (err) {
		return err;
	}
}


