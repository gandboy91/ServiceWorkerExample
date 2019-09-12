import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import PreviewCard from '../components/PreviewCard'
import {likeCardRequest} from "../actions/cards"
import {getCard} from "../selectors/cards";
import {getUserRole} from "../selectors/user";

const mapDispatchToProps = {
    likeRequest: likeCardRequest
}

const mapStateToProps = (state, props) => ({
    userRole: getUserRole(state),
    card: getCard(state, props)
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewCard);