import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Form, Segment, Message,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import * as actionCreators from 'store/actions/user/action_user';

export class Signup extends Component {
  restirction = {
    id: '15 characters or fewer, containing alphabets, numbers, and _, @, +, . and - characters.',
    password: '6 - 18 long, should contain at least one numeric and one alphabet.',
    passwordConfirm: 'Must match password.',
    phoneNumber: 'Max 15. form of XXX-XXXX-XXXX.',
    age: '0 to 150, inclusive.',
    gender: 'A character, M for male, F for female, O for others.',
    name: 'Max length of 30. Required. Only English Character and whitespace is allowed.',
  };

  constructor(props) {
    super(props);

    this.state = {
      input: {
        id: '',
        password: '',
        passwordConfirm: '',
        name: '',
        phoneNumber: '',
        age: '',
        gender: '',
      },

      error: {
        id: undefined,
        password: undefined,
        passwordConfirm: undefined,
        name: undefined,
        phoneNumber: undefined,
        age: undefined,
        gender: undefined,
      },
    };
  }

  signupHandler = () => {
    const { onSignup, closeModal } = this.props;
    const { input } = this.state;

    const requestDict = {
      username: input.id,
      password: input.password,
      phone_number: input.phoneNumber,
      age: input.age,
      gender: input.gender,
      nickname: input.name,
    };

    onSignup(requestDict).then((res) => {
      if (res) closeModal();
    });
  }

  inputChecker = (name, value) => {
    const inputMatcher = {
      id: /^[A-Za-z0-9_@+.-]{1,15}$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
      name: /^[A-za-z]([A-za-z]|\s){0,149}$/,
      age: /^([0-9]|([1-9][0-9])|1[0-4][0-9])$/,
      gender: /^[MFO]$/,
    };

    return inputMatcher[name].test(value);
  };

  handleChange = (e, { name, value }) => {
    const { input, error } = this.state;

    const newInput = {
      ...input,
    };
    newInput[name] = value;

    const newError = {
      ...error,
    };

    if (name === 'passwordConfirm') {
      if (input.password !== newInput.passwordConfirm) {
        newError.passwordConfirm = this.restirction.passwordConfirm;
      } else newError.passwordConfirm = undefined;
    } else if (!this.inputChecker(name, value)) newError[name] = this.restirction[name];
    else newError[name] = undefined;

    this.setState({
      input: newInput,
      error: newError,
    });
  };

  render() {
    const { input, error } = this.state;
    const { duplicated, duplicated2 } = this.props;

    return (
      <div className="signup">
        <Form className="signup-form" id="signup-form" onSubmit={this.signupHandler}>
          <Segment>
            <Form.Input
              error={error.id}
              fluid
              style={{ color: '#87ceeb' }}
              label="ID"
              name="id"
              placeholder={this.restirction.id}
              value={input.id}
              onChange={this.handleChange}
              required
              className="id-input-wrapper"
            />

            <Form.Input
              error={error.password}
              fluid
              style={{ color: '#87ceeb' }}
              label="Password"
              name="password"
              type="password"
              placeholder={this.restirction.password}
              value={input.password}
              onChange={this.handleChange}
              autoComplete="off"
              required
              className="pw-input-wrapper"
            />

            <Form.Input
              error={error.passwordConfirm}
              fluid
              style={{ color: '#87ceeb' }}
              label="Password Confirmation"
              name="passwordConfirm"
              type="password"
              autoComplete="off"
              placeholder={this.restirction.passwordConfirm}
              value={input.passwordConfirm}
              onChange={this.handleChange}
              required
              className="passwordConfirm-input-wrapper"
            />

            <Form.Input
              error={error.name}
              fluid
              style={{ color: '#87ceeb' }}
              label="Nickname"
              name="name"
              placeholder={this.restirction.name}
              value={input.name}
              onChange={this.handleChange}
              required
              className="name-input-wrapper"
            />

            <Form.Input
              error={error.age}
              fluid
              style={{ color: '#87ceeb' }}
              label="Age"
              name="age"
              placeholder={this.restirction.age}
              value={input.age}
              onChange={this.handleChange}
              className="age-input-wrapper"
            />

            <Form.Dropdown
              label="Gender"
              name="gender"
              placeholder="Your gender here"
              fluid
              style={{ color: '#87ceeb' }}
              selection
              onChange={this.handleChange}
              options={
                [{
                  key: 'M',
                  text: 'Male',
                  value: 'M',
                },
                {
                  key: 'F',
                  text: 'Female',
                  value: 'F',
                },
                {
                  key: 'O',
                  text: 'Others',
                  value: 'O',
                }]
              }
              className="gender-input-wrapper"
            />

            {duplicated >= 0 && (
              <Message negative className="duplicated-id-error-wrapper">
                <Message.Header>Signup Failed!</Message.Header>
                <p>Your ID is duplicated! Please use another ID.</p>
              </Message>
            )}
            {duplicated2 >= 0 && (
              <Message negative className="duplicated-nick-error-wrapper">
                <Message.Header>Signup Failed!</Message.Header>
                <p>Your Nickname is duplicated! Please use another Nickname.</p>
              </Message>
            )}
          </Segment>
        </Form>
      </div>
    );
  }
}

Signup.propTypes = {
  onSignup: propTypes.func.isRequired,
  closeModal: propTypes.func.isRequired,
  duplicated: propTypes.number,
  duplicated2: propTypes.number,
};

Signup.defaultProps = {
  duplicated: -2,
  duplicated2: -2,
};

const mapDispatchToProps = (dispatch) => ({
  onSignup: (userData) => dispatch(actionCreators.REGISTER(userData)),
});

const mapStateToProps = (state) => ({
  duplicated: state.user.search,
  duplicated2: state.user.search2,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));
