import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal';
import { pushQueue } from '../actions/queue';
import Modal from '../components/Modal';

/**
 * Container. Popup for ios (web pushes not working on ios )
 * on confirm pushes requests queue to server
 */
const SyncModalContainer = React.memo(
    ({ text, acceptTitle, declineTitle, isOpen, pushQueue, closeModal }) => {
      const onClose = useCallback(() => {
        closeModal();
      }, []);
      const onConfirm = useCallback(() => {
        pushQueue();
        closeModal();
      }, []);

      return (
        <Modal
          isOpen={isOpen}
          text={text}
          acceptTitle={acceptTitle}
          declineTitle={declineTitle}
          onAccept={onConfirm}
          onDecline={onClose}
        />
      );
    }
);

const mapStateToProps = ({
 modal: { text, acceptTitle, declineTitle, open },
}) => ({
  text,
  acceptTitle,
  declineTitle,
  isOpen: open,
});

const mapDispatchToProps = {
  closeModal,
  pushQueue,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SyncModalContainer);
