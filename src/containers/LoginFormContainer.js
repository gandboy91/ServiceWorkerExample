import { connect } from 'react-redux';
import { loginRequest } from '../actions/user';
import LoginForm from '../components/LoginForm';

const mapStateToProps = ({ user: { errors, isProcessing } }) => ({
  errors,
  isProcessing,
});

const mapDispatchToProps = {
  loginRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
