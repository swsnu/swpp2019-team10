/*
  Test for Signup Component - used TDD Development Method. 2019/11/11 rev 1.00
*/

import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import * as actionCreators from 'store/actions/user/action_user';
import Signup from './Signup';

const store = getMockStore({}, {}, {});

describe('<Signup />', () => {
  let signup;
  let component;
  let instance;

  const legalInput = {
    id: ['abcd'],
    password: ['abcdef.+@3'],
    passwordConfirm: ['abcdef.+@3'],
    phoneNumber: ['010-1234-5678'],
    age: ['21', '02'],
    gender: ['M', 'F', 'O'],
    profile_pic: {},
    name: ['Aadfadsf ASFDasdf', 'DD DD'],
  };

  const illegalInput = {
    /*
      id: 150 characters or fewer. Usernames may contain alphanumeric, _, @, +, . and - characters.
      password: 6 - 18 long, should contain at least one numeric, alphabet, and special characters.
      phoneNumber: max 15. form of XXX-XXXX-XXXX
      age: 0 to 150, inclusive.
      gender: TODO: Request to change to optional.
       a character, M for male, F for female, O for others
      profile_pic: picture upload,
      name: max length of 30. Required. Character, Only English Character and whitespace is allowed.
    */
    id: ['', 'a'.repeat(151), '_@+.-', '!', '#'],
    password: ['', 'a3_@A', 'a3_@A'.repeat(4), 'abAB@@', '@@123@', 'abAB21'],
    passwordConfirm: ['', 'a3_@A', 'a3_@A'.repeat(4), 'abAB@@', '@@123@', 'abAB21'],
    phoneNumber: ['aaa-aaaa-aaaa', ''],
    age: ['', '151'],
    gender: ['A', ''],
    profile_pic: {},
    name: ['', ' ', '1 1 1 2 21', '!!'],
  };

  const inputChecker = (inputName) => {
    const legalMock = legalInput[inputName];

    legalMock.forEach((element) => {
      const newInput = {
        ...instance.state.input,
      };

      newInput[inputName] = element;

      instance.setState({
        input: newInput,
      });

      component.update();
      expect(instance.state.error[inputName]).toBe(true);
    });

    const illegalMock = illegalInput[inputName];

    illegalMock.forEach((element) => {
      const newInput = {
        ...instance.state.input,
      };

      newInput[inputName] = element;

      instance.setState({
        input: newInput,
      });

      component.update();
      expect(instance.state.error[inputName]).toBe(false);
    });
  };

  // mock here

  beforeEach(() => {
    signup = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Signup />
        </ConnectedRouter>
      </Provider>
    );

    component = mount(signup);

    instance = component.find(Signup.WrappedComponent).instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = component.find('.signup');
    expect(wrapper.length).toBe(1);
  });

  it('should check ID restriction', () => {
    inputChecker('id');
  });

  it('should check PW restriction', () => {
    inputChecker('password');
  });

  it('should check if PW and PW Confirm equals', () => {
    inputChecker('passwordConfirm');
  });

  it('should check Phone Number restriction', () => {
    inputChecker('phoneNumber');
  });

  it('should check Email restriction', () => {
    inputChecker('email');
  });

  it('should check age restriction', () => {
    inputChecker('age');
  });

  it('should check gender restriction', () => {
    inputChecker('gender');
  });

  it('should check if ID is already used', () => {
    const wrapper = component.find('.duplicated-id-checker');
    const spy = jest.spyOn(history, 'push').mockImplementation(() => {});

    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  }); // TODO: Request to backend part.

  it('should upload profile image successfully', () => {
    // TODO: refer to AddReview
  });

  it('should post signup handler when clicking submit button', () => {
    const spy = jest.spyOn(actionCreators, 'REGISTER').mockImplementation(() => ({ type: '' }));
    const wrapper = component.find('.submit-button');
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
