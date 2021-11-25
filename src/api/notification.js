
  
  
 export async function requestNotification(params) {

    if (!'Notification' in window) return 0

    try {

        const notificationRequestRes = await Notification.requestPermission()
        console.log(notificationRequestRes);

    } catch (error) {
        console.log(error);
        return
        
    }
     
 } 
    
    
export async function notifyMe(title, body = {}) {

    if (!'Notification' in window) return 0

    try {

        const message = new Notification(title, body)

    } catch (error) {
        console.log(error);
        return
        
    }

}