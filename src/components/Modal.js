import React from 'react';

export default React.memo(
    ({ isOpen, text, acceptTitle, declineTitle, onAccept, onDecline }) => (
        <div>
          <div className={`modal ${isOpen ? 'd-block' : ''}`}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">hey, user!</h5>
                  <button type="button" className="close" onClick={onDecline}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{text}</p>
                </div>
                <div className="modal-footer">
                  <button
                      type="button"
                      className="btn btn-primary"
                      onClick={onAccept}
                  >
                    {acceptTitle}
                  </button>
                  <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={onDecline}
                  >
                    {declineTitle}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isOpen ? <div className="modal-backdrop fade show" /> : null}
        </div>
    )
);
