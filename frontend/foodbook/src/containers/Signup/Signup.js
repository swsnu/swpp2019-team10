import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Form, Segment,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import * as actionCreators from 'store/actions/user/action_user';
import ImageSelectPreview from 'react-image-select-pv';

export class Signup extends Component {
  restirction = {
    id: '15 characters or fewer, containing alphabets, numbers, and _, @, +, . and - characters.',
    password: '6 - 18 long, should contain at least one numeric and one alphabet.',
    passwordConfirm: 'Must match password.',
    phoneNumber: 'Max 15. form of XXX-XXXX-XXXX.',
    age: '0 to 150, inclusive.',
    gender: 'A character, M for male, F for female, O for others.',
    profile_pic: 'Picture upload',
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
        profile_pic: '',
      },

      error: {
        id: undefined,
        password: undefined,
        passwordConfirm: undefined,
        name: undefined,
        phoneNumber: undefined,
        age: undefined,
        gender: undefined,
        profile_pic: undefined,
      },
    };
  }

  signupHandler = () => {
    const { onSignup, closeModal, onUploadProfilePic } = this.props;
    const { input } = this.state;

    const requestDict = {
      username: input.id,
      password: input.password,
      phone_number: input.phoneNumber ? input.phoneNumber : '',
      age: input.age ? input.age : -1,
      gender: input.gender,
    };

    onSignup(requestDict).then((res) => {
      if (input.profile_pic) {
        const fd = new FormData();
        const file = new File([input.profile_pic], 'img.jpg');

        fd.append('image', file);

        const data = {
          id: res.id,
          file: fd,
        };

        onUploadProfilePic(data)
          .then(() => { alert('!'); closeModal(); })
          .catch();
      }
    });
  };

  inputChecker = (name, value) => {
    const inputMatcher = {
      id: /^[A-Za-z0-9_@+.-]{1,15}$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
      name: /^(\w|\s){1,150}$/,
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

    return (
      <div className="login">
        <Form id="signup-form" onSubmit={this.signupHandler}>
          <Segment>
            <Form.Input
              error={error.id}
              fluid
              label="ID"
              name="id"
              placeholder={this.restirction.id}
              value={input.id}
              onChange={this.handleChange}
              required
            />

            <Form.Input
              error={error.password}
              fluid
              label="Password"
              name="password"
              type="password"
              placeholder={this.restirction.password}
              value={input.password}
              onChange={this.handleChange}
              autoComplete="off"
              required
            />

            <Form.Input
              error={error.passwordConfirm}
              fluid
              label="Password Confirmation"
              name="passwordConfirm"
              type="password"
              autoComplete="off"
              placeholder={this.restirction.passwordConfirm}
              value={input.passwordConfirm}
              onChange={this.handleChange}
              required
            />

            <Form.Input
              error={error.name}
              fluid
              label="Nickname"
              name="name"
              placeholder={this.restirction.name}
              value={input.name}
              onChange={this.handleChange}
              required
            />

            <Form.Dropdown
              label="Gender"
              name="gender"
              placeholder="Your gender here"
              fluid
              selection
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
            />

            <ImageSelectPreview
              className="add-review-image-selector"
              onChange={(data) => this.setState({
                input: {
                  ...input,
                  profile_pic: data[0].blob,
                },
              })}
              max={1}
            />

          </Segment>
        </Form>
      </div>
    );
  }
}

Signup.propTypes = {
  onSignup: propTypes.func.isRequired,
  closeModal: propTypes.func.isRequired,
  onUploadProfilePic: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSignup: (userData) => dispatch(actionCreators.REGISTER(userData)),

  onUploadProfilePic: (data) => dispatch(actionCreators.PROFILE_PIC(data)),
});

export default connect(null, mapDispatchToProps)(withRouter(Signup));
