import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTimes,
  faHeart as pressedLike,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as unpressedLike } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import { ADMIN_ACCESS_LEVEL } from '../constants/access';

const LikeCounter = React.memo(({ likes, onClick }) => (
  <div>
    <FontAwesomeIcon
      className="faIcon"
      size="2x"
      icon={likes ? pressedLike : unpressedLike}
      onClick={onClick}
    />
    <span className="likeCount">{likes || ''}</span>
  </div>
));

/**
 * Card preview. Shows card info, allows to like card
 * Uses likes context
 */
const PreviewCard = React.memo(
  ({
    card: { id, title, text, likes },
    likeRequest,
    removeRequest,
    userRole,
  }) => {
    const handleLike = useCallback(() => likeRequest(id), [id]);
    const handleRemove = useCallback(() => removeRequest(id), [id]);

    return (
      <div className="card previewCard shadow">
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
            <LikeCounter likes={likes} onClick={handleLike} />
          </div>
        </div>
      </div>
    );
  }
);

PreviewCard.propTypes = {
  card: PropTypes.object.isRequired,
  likeRequest: PropTypes.func.isRequired,
  removeRequest: PropTypes.func.isRequired,
};

export default PreviewCard;
