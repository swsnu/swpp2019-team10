import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Button, Grid, Header, Form, Segment, Message,
} from 'semantic-ui-react';
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
        <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input fluid icon="user" iconPosition="left" placeholder="ID" />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                <Button color="teal" fluid size="large" className="login-button" onClick={() => onLogin()}>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              <Button className="signup-button" onClick={() => onSignup()}>Sign Up</Button>
            </Message>
          </Grid.Column>
        </Grid>
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
