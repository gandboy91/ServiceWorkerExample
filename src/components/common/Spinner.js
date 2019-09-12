import React from 'react'
import PropTypes from 'prop-types';
import '../../styles/spinner.css'

const Spinner = (props) => {
    const {radius, color} = props;
    return <div className='spinner m-4' style={{
        width:radius,
        height:radius,
        borderColor:color
    }}/>
}

Spinner.defaultProps = {
    radius: 35,
    color: '#ffc107'
};

Spinner.propTypes = {
    radius: PropTypes.number,
    color: PropTypes.string
};

export default Spinner
