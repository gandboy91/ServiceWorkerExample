import React, { useCallback } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from "prop-types";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PreviewOfflineCard = React.memo(({ card: { id, title, text }, removeRequest }) => {
  const handleRemove = useCallback(() => removeRequest(id), [id])

  return <div className='card previewCard offline shadow'>
    <div className="card-header">
      <div className="row">
        <div className="col-sm-10">
          <h5>{title}</h5>
        </div>
        <div className="col-sm-2">
          <FontAwesomeIcon size="2x" icon={faTimes} className="faIcon" onClick={handleRemove} />
        </div>
      </div>
    </div>
    <div className='card-body'>
      <div className='mb-2'>{text}</div>
      <div className='d-flex justify-content-between p-2 alert alert-warning'>
        <small>Editing and likes are not available in offline mode</small>
      </div>
    </div>
  </div>
})

PreviewOfflineCard.propTypes = {
  card: PropTypes.object.isRequired,
  removeRequest: PropTypes.object.isRequired,
}

export default PreviewOfflineCard
