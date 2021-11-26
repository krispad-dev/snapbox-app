
export function isImageInCache(array = []) {


    const filteredArray = array.filter((item) => {

        const url = item.url;
        const slicedUrl = url.slice(-6)
  

        return item.url.slice(-6) === '/image'
    })

    return filteredArray
    
}

export function parseDate(params) {

    const date = new Date().toString().slice(0, 21)
    return date

}



// Check CookieSettings

export function checkAppSettings(params) {

    if (document.cookie.split(';').some((item) => item.trim().startsWith('appSettings=true'))) {
        return true
      } else {
         return false 
      }
      
}

export function checkGeoloaction(params) {

    if (document.cookie.split(';').some((item) => item.trim().startsWith('geoLocation=true'))) {
        return true
      } else {
         return false 
      }
      
}

export function checkNotification(params) {

    if (document.cookie.split(';').some((item) => item.trim().startsWith('notifications=true'))) {
        return true
      } else {
         return false 
      }
      
}

export function checkOnlineStorage(params) {

    if (document.cookie.split(';').some((item) => item.trim().startsWith('onlineStorage=true'))) {
        return true
      } else {
         return false 
      }
      
}
 

export function checkIfBrowserIsOnline(params) {

    if (navigator.onLine) {
        return true
      } else {
        return false
      }
    
}


    

