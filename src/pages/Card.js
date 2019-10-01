import { connect } from 'react-redux';
import { changeCardRequest, removeCardRequest } from '../actions/cards';
import { getCard } from '../selectors/cards';
import Card from '../components/Card';

const mapDispatchToProps = {
  changeCardRequest,
  removeCardRequest,
};

const mapStateToProps = (state, { match: { params } }) => ({
  card: getCard(state, { cardId: params.id }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
