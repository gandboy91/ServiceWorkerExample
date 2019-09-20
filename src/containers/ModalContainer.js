import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../actions/modal'
import Modal from '../components/Modal'

const ModalContainer = React.memo(
    ({ text, acceptTitle, declineTitle, isOpen, onAccept, onDecline, closeModal }) => {
      const onClose = useCallback(
          () => {
            onDecline()
            closeModal()
          },
          [onDecline]
      )
      const onConfirm = useCallback(
          () => {
            onAccept()
            closeModal()
          },
          [onAccept]
      )

      return (
          <Modal
              isOpen={isOpen}
              text={text}
              acceptTitle={acceptTitle}
              declineTitle={declineTitle}
              onAccept={onConfirm}
              onDecline={onClose}
          />
      )
    }
)

const mapStateToProps = ({
                           modal: { text, acceptTitle, declineTitle, open, onAccept, onDecline },
                         }) => ({
  text,
  acceptTitle,
  declineTitle,
  isOpen: open,
  onAccept,
  onDecline,
})

const mapDispatchToProps = {
  closeModal,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalContainer)
