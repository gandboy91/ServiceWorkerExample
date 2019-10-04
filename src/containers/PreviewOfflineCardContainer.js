import React from 'react';
import { connect } from 'react-redux';
import { getOfflineCard } from '../selectors/cards';
import PreviewOfflineCard from '../components/PreviewOfflineCard';
import { removeCardRequest } from '../actions/cards';
import { getUserRole } from '../selectors/user';

const mapDispatchToProps = {
  removeRequest: removeCardRequest,
};

const mapStateToProps = (state, props) => ({
  userRole: getUserRole(state),
  card: getOfflineCard(state, props),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewOfflineCard);
