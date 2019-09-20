export const OPEN_MODAL = 'OPEN_MODAL';
export const openModal = ({ text, acceptTitle, declineTitle, onAccept, onDecline }) => ({
  type: OPEN_MODAL,
  payload: {
    text,
    acceptTitle,
    declineTitle,
    onAccept,
    onDecline,
  }
})

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => ({
  type: CLOSE_MODAL,
})