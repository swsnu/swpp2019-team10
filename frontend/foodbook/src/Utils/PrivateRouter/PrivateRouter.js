import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

import * as actionCreators from 'store/actions/user/action_user';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { onLoad, history } = rest;

  onLoad().then((res) => {
    if (res.type === 'USER_IS_NOT_LOGGED_IN') history.push('/introduce/');
  }).catch(() => {
    history.push('/introduce/');
  });

  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />}
    />
  );
};

PrivateRoute.propTypes = {
  onLoad: propTypes.func.isRequired,
  history: propTypes.objectOf(Object).isRequired,
  component: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({ onLoad: () => dispatch(actionCreators.GET_USER_INFO()) }
);

export default connect(null, mapDispatchToProps)(PrivateRoute);
