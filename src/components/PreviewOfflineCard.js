import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ADMIN_ACCESS_LEVEL } from '../constants/access';

const PreviewOfflineCard = React.memo(
  ({ card: { id, title, text }, removeRequest, userRole }) => {
    const handleRemove = useCallback(() => removeRequest(id), [id]);

    return (
      <div className="card previewCard offline shadow">
        <div className="card-header">
          <FontAwesomeIcon
            size="2x"
            icon={faTimes}
            className="faIcon float-right"
            onClick={handleRemove}
          />
          <h5>{title}</h5>
        </div>
        <div className="card-body">
          <div className="mb-2">{text}</div>
          <div className="d-flex justify-content-between p-3">
            {userRole === ADMIN_ACCESS_LEVEL ? (
              <Link to={`/cards/${id}`} className="faIcon">
                <FontAwesomeIcon icon={faEdit} size="2x" />
              </Link>
            ) : (
              <span>&nbsp;</span>
            )}
            <div className="rounded p-2 alert-warning mb-0">
              no likes in offline
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PreviewOfflineCard.propTypes = {
  card: PropTypes.object.isRequired,
  removeRequest: PropTypes.object.isRequired,
};

export default PreviewOfflineCard;
