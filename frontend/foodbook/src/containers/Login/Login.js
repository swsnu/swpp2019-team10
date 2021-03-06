import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Button, Grid, Header, Form, Message,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import SignupModal from 'containers/Signup/SignupModal';
import * as actionCreators from 'store/actions/user/action_user';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {
        username: '',
        password: '',
      },
    };
  }

  loginHandler = () => {
    const { onLogin } = this.props;
    const { input } = this.state;

    const dict = {
      username: input.username,
      password: input.password,
    };

    onLogin(dict);
  };

  loginError = () => {

  };

  render() {
    const { history, failed } = this.props;
    const { input } = this.state;
    const { loginHandler } = this;

    return (
      <div className="login">
        <Grid textAlign="center">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large">

              <Form.Input
                fluid
                style={{ color: '#87ceeb' }}
                icon="user"
                iconPosition="left"
                placeholder="ID"
                value={input.username}
                onChange={(e, { value }) => {
                  this.setState({
                    input: {
                      ...input,
                      username: value,
                    },
                  });
                }}
              />

              <Form.Input
                fluid
                style={{ color: '#87ceeb' }}
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                autoComplete="off"
                value={input.password}
                onChange={(e, { value }) => {
                  this.setState({
                    input: {
                      ...input,
                      password: value,
                    },
                  });
                }}
              />

              <Button color="blue" fluid size="large" className="login-button" onClick={loginHandler}>
                  Login
              </Button>

              {failed && (
                <Message negative className="login-error-wrapper">
                  <Message.Header>Login Failed!</Message.Header>
                  <p>Please check the ID or Password!</p>
                </Message>
              )}

            </Form>
            <Message>
              <SignupModal history={history} color="blue" fixed />
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
  failed: propTypes.bool,
};

Login.defaultProps = {
  failed: false,
};

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data) => dispatch(actionCreators.LOGIN(data)),
});

const mapStateToProps = (state) => ({
  failed: state.user.user.failed,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
