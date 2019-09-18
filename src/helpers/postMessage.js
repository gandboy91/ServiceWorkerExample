export const requestNotificationsPermission = () =>
  Notification && Notification.requestPermission().then(
      (result) => console.log('notifications mode: ', result)
)