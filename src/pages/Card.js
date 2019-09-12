import React from 'react'
import {connect} from 'react-redux'
import { changeCardRequest, removeCardRequest } from "../actions/cards"
import {getCard} from "../selectors/cards";
import Card from "../components/Card";

const mapDispatchToProps = {
    changeCardRequest,
    removeCardRequest
}

const mapStateToProps = (state, props) => ({
    card: getCard(state, props)
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);