import React, { useCallback } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from "prop-types";

const PreviewOfflineCard = React.memo(({ card: { title, text } }) => {
  return <div className='card previewCard offline shadow'>
    <div className='card-header'>
      <h5>{title}</h5>
    </div>
    <div className='card-body'>
      <div className='mb-2'>{text}</div>
      <div className='d-flex justify-content-between p-3'>
        Editing and likes are not available in offline mode
      </div>
    </div>
  </div>
})

PreviewOfflineCard.propTypes = {
  card: PropTypes.object.isRequired,
}

export default PreviewOfflineCard
