import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import LoginModal from './LoginModal';

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

  taste: {},
};

const store = getMockStore(initialUser, {}, {});

describe('<Login />', () => {
  let loginModal;
  let component;

  beforeEach(() => {
    loginModal = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <LoginModal history={history} fixed={false} />
        </ConnectedRouter>
      </Provider>
    );

    component = mount(loginModal);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing when not fixed', () => {
    const wrapper = component.find('.login-modal');
    expect(wrapper.length).toBe(1);
  });

  it('should render without crashing when fixed', () => {
    const unfixedLoginModal = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <LoginModal history={history} fixed />
        </ConnectedRouter>
      </Provider>
    );
    const un = mount(unfixedLoginModal);
    const wrapper = un.find('.login-modal');
    expect(wrapper.length).toBe(1);
  });

  it('should set state properly on login', () => {
    const wrapper = component.find('a').at(0);
    const instance = component.find(LoginModal).instance();
    expect(instance.state.open).toEqual(false);
    wrapper.simulate('click');
    expect(instance.state.open).toEqual(true);
  });

  it('should set state properly on close', () => {
    const wrapper = component.find('Button').at(0);
    const instance = component.find(LoginModal).instance();
    expect(instance.state.open).toEqual(false);
    wrapper.simulate('click');
    expect(instance.state.open).toEqual(true);
    const closeWrapper = component.find('Button').at(2);
    closeWrapper.simulate('click');
    expect(instance.state.open).toEqual(false);
  });
});
