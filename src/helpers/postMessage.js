export const callWorker = (message) => {
  if (!navigator.serviceWorker || !navigator.serviceWorker.controller) {
    return
  }
  navigator.serviceWorker.controller.postMessage(message)
}