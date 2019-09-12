import React from 'react'
import {connect} from 'react-redux'
import { addCardRequest } from "../actions/cards"
import NewCard from "../components/NewCard";

const mapDispatchToProps = {
  addCardRequest
}

export default connect(null, mapDispatchToProps)(NewCard);