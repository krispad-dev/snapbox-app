
function checkForMediaDevices() {
	console.log('Checks');
	if ('mediaDevices' in navigator) {
		return true;
	} else {
		return false;
	}
}


