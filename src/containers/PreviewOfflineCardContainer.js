import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { getOfflineCard } from '../selectors/cards';
import PreviewOfflineCard from '../components/PreviewOfflineCard';
import { removeCardRequest } from '../actions/cards';

const mapDispatchToProps = {
    removeRequest: removeCardRequest,
}


const mapStateToProps = (state, props) => ({
    card: getOfflineCard(state, props)
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewOfflineCard);