import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import CardList from '../components/CardList'
import {fetchCardsRequest} from "../actions/cards"
import Spinner from "../components/common/Spinner"
import {getCardsIds, getCardsIsProcessing} from "../selectors/cards";

const CardListContainer = React.memo(({ cardsIds, isProcessing, fetchCardsRequest }) => {
    useEffect(() => {
        !cardsIds.length && fetchCardsRequest()
    }, [])
    console.log(isProcessing)

    return isProcessing
        ? <Spinner radius={60} />
        : <CardList cardsIds={cardsIds} />
})

const mapDispatchToProps = {
    fetchCardsRequest
}

const mapStateToProps = state => ({
    cardsIds: getCardsIds(state),
    isProcessing: getCardsIsProcessing(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CardListContainer);