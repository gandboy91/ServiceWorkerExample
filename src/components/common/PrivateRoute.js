import React, { useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getToken, getUserRole } from '../../selectors/user';

const PrivateRoute = React.memo(
  ({
    component: Component,
    authorized,
    userRole,
    requiredAccessLevel,
    ...rest
  }) => {
    const renderFunction = useCallback(
      (props) => {
        console.log(requiredAccessLevel);
        console.log(userRole);
        if (!authorized) {
          return <Redirect to="/login" />;
        }
        if (requiredAccessLevel && userRole !== requiredAccessLevel) {
          return <Redirect to="/forbidden" />;
        }
        return <Component {...props} />;
      },
      [authorized, requiredAccessLevel, userRole]
    );

    return <Route {...rest} render={renderFunction} />;
  }
);

const mapStateToProps = (state) => ({
  authorized: !!getToken(state),
  userRole: getUserRole(state),
});

export default connect(mapStateToProps)(PrivateRoute);
