
export async function getGeoData() {

    const location = await new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
      });

    const coords =  await location.coords
    const currentAddress = await getCurrentCity({longitude: coords.longitude, latitude: coords.latitude})
    return currentAddress




}



async function getCurrentCity({ longitude, latitude } = {}) {


	try {
        
        const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${import.meta.env.VITE_SECRET_GEO_KEY}`)
		const data = await res.json();

        const filteredData = data && data.results && data.results.map((result) => {
            return {
                city: result.components.city,
                address: result.components.road
            }

        })


		if (!res.ok) {
        
            throw new Error('Could not fetch from server');
        
        }

	 	return filteredData[0]
	} catch (error) {
        return {
            city: null,
            address: null
        }
	}
}
