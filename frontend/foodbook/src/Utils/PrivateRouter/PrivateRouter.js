import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

import * as actionCreators from 'store/actions/user/action_user';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { onLoad, history } = rest;

  onLoad().then((res) => {
    console.log(res);
    if (!res) history.push('/introduce/');
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
};

const mapDispatchToProps = (dispatch) => ({ onLoad: () => dispatch(actionCreators.GET_USER_INFO()) }
);

export default connect(null, mapDispatchToProps)(PrivateRoute);
