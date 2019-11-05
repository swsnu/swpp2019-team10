import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Card, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import * as actionCreators from 'store/actions/user/action_user';

class Login extends Component {
  // some behavior or rendering should be added in sprint 4.

  loginHandler = (onLogin) => {
    const { history } = this.props;
    onLogin();
    history.push('/main'); // TODO: @ sprint 4, should handle real login system
  };

  render() {
    const { onSignup, onLogin } = this.props;

    return (
      <div className="login">
        <Card centered>
          <Card.Content>
            <Card.Header textAlign="center"> FoodBook </Card.Header>
            <Card.Meta textAlign="center"> Sprint 3 </Card.Meta>
            <Card.Description>
              <center><Button content="Login" id="login-button" onClick={() => { this.loginHandler(onLogin); }} /></center>
              <center><Button content="Signup" id="signup-button" onClick={() => onSignup()} /></center>
              {/* this is mock */}
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            <Icon name="user" />
          Team 10
          </Card.Content>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.objectOf(Object).isRequired,
  onLogin: propTypes.func.isRequired,
  onSignup: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onLogin: () => {
    dispatch(actionCreators.LOGIN());
  },

  onSignup: () => {
    dispatch(actionCreators.REGISTER());
  },
});

export default connect(null, mapDispatchToProps)(withRouter(Login));
