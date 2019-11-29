import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import Axios from 'axios';
import * as actionCreators from 'store/actions/user/action_user';

import SignupModal from './SignupModal';

const initialUser = {
  user: {
    username: '',
    phone_number: '',
    age: -1,
    gender: '',
    profile_pic: '',
    number_of_reviews: -1,
    number_of_friends: -1,
    failed: false,
  },

  search: -1,
  taste: {},
};

const duplicatedUser = {
  user: {
    username: '',
    phone_number: '',
    age: -1,
    gender: '',
    profile_pic: '',
    number_of_reviews: -1,
    number_of_friends: -1,
    failed: false,
  },

  search: 3,
  taste: {},
};

const duplicatedStore = getMockStore(duplicatedUser, {}, {});
const store = getMockStore(initialUser, {}, {});

describe('<Login />', () => {
  let signupModal;
  let component;

  beforeEach(() => {
    signupModal = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <SignupModal history={history} fixed={false} />
        </ConnectedRouter>
      </Provider>
    );

    component = mount(signupModal);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing when not fixed', () => {
    const wrapper = component.find('.signup-modal');
    expect(wrapper.length).toBe(1);
  });

  it('should render without crashing when fixed', () => {
    const unfixedSignupModal = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <SignupModal history={history} fixed />
        </ConnectedRouter>
      </Provider>
    );
    const fixed = mount(unfixedSignupModal);
    const wrapper = fixed.find('.signup-modal');
    expect(wrapper.length).toBe(1);
  });

  it('should handle signupHandler', () => {
    component.find('Button').at(0).simulate('click');
    const wrapper = component.find('.signup-submit-button').at(0);
    const wrapperForm = component.find('.signup-form').at(0);
    const spy = jest.spyOn(actionCreators, 'REGISTER')
      .mockImplementation(() => (dispatch) => (Axios.post('', {}).then(
        dispatch({
          type: '',
        }),
      )));

    const spyAxios = jest.spyOn(Axios, 'post')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 200,
          data: {
            status: 'success',
          },
        };

        res(result);
      }));

    const wrapperId = component.find('input').at(0);
    wrapperId.simulate('change', { target: { name: 'id', value: 'adsfa12d' } });

    const wrapperPw = component.find('input').at(1);
    wrapperPw.simulate('change', { target: { name: 'password', value: 'pwpwpw1' } });

    const wrapperPwConfirm = component.find('input').at(2);
    wrapperPwConfirm.simulate('change', { target: { name: 'passwordConfirm', value: 'pwpwpw1' } });

    const wrapperName = component.find('input').at(3);
    wrapperName.simulate('change', { target: { name: 'name', value: 'nasdfsadf' } });

    wrapper.simulate('click');
    wrapperForm.simulate('submit');

    expect(spyAxios).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not throw error when register is not successful', () => {
    component.find('Button').at(0).simulate('click');
    const wrapper = component.find('.signup-submit-button').at(0);
    const wrapperForm = component.find('.signup-form').at(0);
    const spy = jest.spyOn(actionCreators, 'REGISTER')
      .mockImplementation(() => (dispatch) => (Axios.post('', {}).then(
        dispatch({
          type: '',
        }),
      )));

    const spyAxios = jest.spyOn(Axios, 'post')
      .mockImplementation(() => new Promise((res) => {
        res();
      }));

    const wrapperId = component.find('input').at(0);
    wrapperId.simulate('change', { target: { name: 'id', value: 'adsfa12d' } });

    const wrapperPw = component.find('input').at(1);
    wrapperPw.simulate('change', { target: { name: 'password', value: 'pwpwpw1' } });

    const wrapperPwConfirm = component.find('input').at(2);
    wrapperPwConfirm.simulate('change', { target: { name: 'passwordConfirm', value: 'pwpwpw1' } });

    const wrapperName = component.find('input').at(3);
    wrapperName.simulate('change', { target: { name: 'name', value: 'nasdfsadf' } });

    wrapper.simulate('click');
    wrapperForm.simulate('submit');

    expect(spyAxios).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should detect duplicated ID', () => {
    const duplicatedSignupModal = (
      <Provider store={duplicatedStore}>
        <ConnectedRouter history={history}>
          <SignupModal history={history} fixed={false} />
        </ConnectedRouter>
      </Provider>
    );

    const duplicatedComponent = mount(duplicatedSignupModal);

    duplicatedComponent.find('Button').at(0).simulate('click');
    const wrapper = duplicatedComponent.find('.signup-submit-button').at(0);
    const wrapperForm = duplicatedComponent.find('.signup-form').at(0);

    const spyRegister = jest.spyOn(actionCreators, 'REGISTER')
      .mockImplementation(() => (dispatch) => Axios.post('', {}).then(dispatch({
        type: '',
      })));

    const spyAxios = jest.spyOn(Axios, 'post')
      .mockImplementation(() => new Promise((res) => {
        const result = {
          status: 200,
          data: {
            status: 'success',
          },
        };

        res(result);
      }));

    const wrapperId = duplicatedComponent.find('input').at(0);
    wrapperId.simulate('change', { target: { name: 'id', value: 'adsfa12d' } });

    const wrapperPw = duplicatedComponent.find('input').at(1);
    wrapperPw.simulate('change', { target: { name: 'password', value: 'pwpwpw1' } });

    const wrapperPwConfirm = duplicatedComponent.find('input').at(2);
    wrapperPwConfirm.simulate('change', { target: { name: 'passwordConfirm', value: 'pwpwpw1' } });

    const wrapperName = duplicatedComponent.find('input').at(3);
    wrapperName.simulate('change', { target: { name: 'name', value: 'nasdfsadf' } });

    wrapper.simulate('click');
    wrapperForm.simulate('submit');

    expect(spyAxios).toHaveBeenCalledTimes(1);
    expect(spyRegister).toHaveBeenCalledTimes(1);
    expect(duplicatedComponent.find('.duplicated-id-error-wrapper').length).toBe(2);
  });
});
