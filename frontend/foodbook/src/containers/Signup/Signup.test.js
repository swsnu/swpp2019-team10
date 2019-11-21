/*
  Test for Signup Component - used TDD Development Method. 2019/11/11 rev 1.00
*/

import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import Signup from '.';

const store = getMockStore({}, {}, {});

describe('<Signup />', () => {
  let signup;
  let component;
  let instance;

  const restirction = {
    id: '15 characters or fewer, containing alphabets, numbers, and _, @, +, . and - characters.',
    password: '6 - 18 long, should contain at least one numeric and one alphabet.',
    passwordConfirm: 'Must match password.',
    phoneNumber: 'Max 15. form of XXX-XXXX-XXXX.',
    age: '0 to 150, inclusive.',
    gender: 'A character, M for male, F for female, O for others.',
    profile_pic: 'Picture upload',
    name: 'Max length of 30. Required. Only English Character and whitespace is allowed.',
  };

  const legalInput = {
    id: ['abcd'],
    password: ['abcdef3'],
    passwordConfirm: ['abcdef3'],
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
      gender: a character, M for male, F for female, O for others
      profile_pic: picture upload,
      name: max length of 30. Required. Character, Only English Character and whitespace is allowed.
    */
    id: ['', 'a'.repeat(151), '_@+.-*', '!', '#'],
    password: ['', 'a3_@A', 'a3_@A'.repeat(4), 'abAB@@', '@@123@'],
    passwordConfirm: ['', 'a3_@A', 'a3_@A'.repeat(4), 'abAB@@', '@@123@'],
    phoneNumber: ['aaa-aaaa-aaaa', ''],
    age: ['', '151'],
    gender: ['A', ''],
    profile_pic: {},
    name: [' ', ' abcde', '1 1 1 2 21', '!!'],
  };

  // mock here

  beforeEach(() => {
    signup = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Signup closeModal={() => {}} />
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
    legalInput.id.forEach((element) => {
      const wrapper = component.find('input').at(0);
      wrapper.simulate('change', { target: { name: 'id', value: element } });
      expect(instance.state.input.id).toBe(element);
      expect(instance.state.error.id).toBe(undefined);
    });

    illegalInput.id.forEach((element) => {
      const wrapper = component.find('input').at(0);
      wrapper.simulate('change', { target: { name: 'id', value: element } });
      expect(instance.state.input.id).toBe(element);
      expect(instance.state.error.id).toEqual(restirction.id);
    });
  });

  it('should check PW restriction', () => {
    legalInput.password.forEach((element) => {
      const wrapper = component.find('input').at(1);
      wrapper.simulate('change', { target: { name: 'password', value: element } });
      expect(instance.state.input.password).toBe(element);
      expect(instance.state.error.password).toBe(undefined);
    });

    illegalInput.password.forEach((element) => {
      const wrapper = component.find('input').at(1);
      wrapper.simulate('change', { target: { name: 'password', value: element } });
      expect(instance.state.input.password).toBe(element);
      expect(instance.state.error.password).toEqual(restirction.password);
    });
  });

  it('should check if PW and PW Confirm equals', () => {
    const wrapper = component.find('input').at(1);
    const confirmWrapper = component.find('input').at(2);
    const element = legalInput.password[0];
    const confirmElement = legalInput.password[0];
    const invalidConfirm = 'aaaaa';

    wrapper.simulate('change', { target: { name: 'password', value: element } });
    confirmWrapper.simulate('change', { target: { name: 'passwordConfirm', value: invalidConfirm } });
    expect(instance.state.input.passwordConfirm).toBe(invalidConfirm);
    expect(instance.state.error.passwordConfirm).toBe(restirction.passwordConfirm);
    confirmWrapper.simulate('change', { target: { name: 'passwordConfirm', value: confirmElement } });
    expect(instance.state.input.passwordConfirm).toBe(confirmElement);
    expect(instance.state.error.passwordConfirm).toBe(undefined);
  });

  it('should check name restriction', () => {
    legalInput.name.forEach((element) => {
      const wrapper = component.find('input').at(3);
      wrapper.simulate('change', { target: { name: 'name', value: element } });
      expect(instance.state.input.name).toBe(element);
      expect(instance.state.error.name).toBe(undefined);
    });

    illegalInput.name.forEach((element) => {
      const wrapper = component.find('input').at(3);
      wrapper.simulate('change', { target: { name: 'name', value: element } });
      expect(instance.state.input.name).toBe(element);
      expect(instance.state.error.name).toBe(restirction.name);
    });
  });

  it('should check age restriction', () => {
    legalInput.age.forEach((element) => {
      const wrapper = component.find('input').at(4);
      wrapper.simulate('change', { target: { name: 'age', value: element } });
      expect(instance.state.input.age).toBe(element);
      expect(instance.state.error.name).toBe(undefined);
    });

    illegalInput.age.forEach((element) => {
      const wrapper = component.find('input').at(4);
      wrapper.simulate('change', { target: { name: 'age', value: element } });
      expect(instance.state.input.age).toBe(element);
      expect(instance.state.error.age).toBe(restirction.age);
    });
  });

  it('should check gender restriction', () => {

  });

  // it('should check if ID is already used', () => {
  //   const wrapper = component.find('.duplicated-id-checker');
  //   const spy = jest.spyOn(history, 'push').mockImplementation(() => {});

  //   wrapper.simulate('click');
  //   expect(spy).toHaveBeenCalledTimes(1);
  // });

  it('should upload profile image successfully', () => {
    // TODO: refer to AddReview
  });

  // it('should post signup handler when clicking submit button', () => {
  //   const spy = jest.spyOn(actionCreators, 'REGISTER').mockImplementation(() => ({ type: '' }));


  //   expect(spy).toHaveBeenCalledTimes(1);
  // });
});
