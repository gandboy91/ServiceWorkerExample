import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import { fetchCardsRequest } from '../actions/cards';
import Spinner from '../components/common/Spinner';
import {
  getCardsIds,
  getCardsIsProcessing,
  getOfflineCardsIds,
} from '../selectors/cards';

const CardListContainer = React.memo(
  ({ cardsIds, offlineCardsIds, isProcessing, fetchCardsRequest }) => {
    useEffect(() => {
      !cardsIds.length && fetchCardsRequest();
    }, []);

    return isProcessing ? (
      <Spinner radius={60} />
    ) : (
      <CardList cardsIds={cardsIds} offlineCardsIds={offlineCardsIds} />
    );
  }
);

const mapDispatchToProps = {
  fetchCardsRequest,
};

const mapStateToProps = (state) => ({
  cardsIds: getCardsIds(state),
  offlineCardsIds: getOfflineCardsIds(state),
  isProcessing: getCardsIsProcessing(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardListContainer);
