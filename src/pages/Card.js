import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {changeCard, removeCard} from "../actions/cards"
import {getCard} from "../selectors/cards";
import Card from "../components/Card";

const mapDispatchToProps = {
    changeCard,
    removeCard
}

const mapStateToProps = (state, props) => ({
    card: getCard(state, props)
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);