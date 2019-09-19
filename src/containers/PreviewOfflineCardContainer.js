import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { getOfflineCard } from '../selectors/cards';
import PreviewOfflineCard from '../components/PreviewOfflineCard';

const mapStateToProps = (state, props) => ({
    card: getOfflineCard(state, props)
});

export default connect(mapStateToProps, null)(PreviewOfflineCard);