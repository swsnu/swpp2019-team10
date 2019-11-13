import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Button, Grid, Header, Form, Segment, Message,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import * as actionCreators from 'store/actions/user/action_user';
import SignupModal from 'containers/Signup/SignupModal';

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
    const { history, onLogin } = this.props;
    const { input } = this.state;

    const dict = {
      username: input.username,
      password: input.password,
    };

    onLogin(dict)
      .then(() => history.push('/main'))
      .catch();
  };

  render() {
    const { history } = this.props;
    const { input } = this.state;
    const { loginHandler } = this;

    return (
      <div className="login">
        <Grid textAlign="center">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
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
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
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

                <Button color="teal" fluid size="large" className="login-button" onClick={loginHandler}>
                  Login
                </Button>
              </Segment>
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
};

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data) => dispatch(actionCreators.LOGIN(data)),
});

export default connect(null, mapDispatchToProps)(withRouter(Login));
