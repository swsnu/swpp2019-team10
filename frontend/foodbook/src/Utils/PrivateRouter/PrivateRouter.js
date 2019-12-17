import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

import * as actionCreators from 'store/actions/user/action_user';

export class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      login: false,
    };
  }

  componentDidMount() {
    const { onLoad } = this.props;

    onLoad().then((res) => {
      if (res.type === 'GET_USER_INFO') {
        this.setState({
          ready: true,
          login: true,
        });
      } else {
        this.setState({
          ready: true,
          login: false,
        });
      }
    }).catch(() => {
      this.setState({
        ready: true,
        login: false,
      });
    });
  }

  render() {
    const { component: MyComponent, ...rest } = this.props;
    const { ready, login } = this.state;
    let toRender;

    if (!ready) {
      toRender = <div className="loading" />;
    } else if (login) {
      toRender = (
        <Route
          className="private-route"
          {...rest}
          render={(props) => <MyComponent {...props} />}
        />
      );
    } else {
      toRender = <Redirect to="/introduce/" />;
    }
    return toRender;
  }
}

PrivateRoute.propTypes = {
  onLoad: propTypes.func.isRequired,
  history: propTypes.objectOf(Object).isRequired,
  component: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: () => dispatch(actionCreators.GET_USER_INFO()),
});

export default connect(null, mapDispatchToProps)(PrivateRoute);
