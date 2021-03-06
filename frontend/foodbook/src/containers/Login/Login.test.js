import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import * as actionCreators from 'store/actions/user/action_user';
import Login from './Login';

const initialUser = {
  user: {
    username: '',
    phone_number: '',
    age: -1,
    gender: '',
    number_of_reviews: -1,
    number_of_friends: -1,
    failed: false,
  },

  taste: {},
};

const initialFalseUser = {
  user: {
    username: '',
    phone_number: '',
    age: -1,
    gender: '',
    number_of_reviews: -1,
    number_of_friends: -1,
    failed: true,
  },

  taste: {},
};

const store = getMockStore(initialUser, {}, {});
const falseStore = getMockStore(initialFalseUser, {}, {});

describe('<Login />', () => {
  let login;
  const spyLogin = jest.spyOn(actionCreators, 'LOGIN')
    .mockImplementation(() => ({ type: '' }));

  beforeEach(() => {
    login = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Login />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const component = mount(login);
    const wrapper = component.find('.login');
    expect(wrapper.length).toBe(1);
  });

  it('should call loginHandler function', () => {
    const component = mount(login);
    const wrapper = component.find('Button').at(0);

    wrapper.simulate('click');

    expect(spyLogin).toHaveBeenCalledTimes(1);
  });

  it('should set state properly on id input', () => {
    const id = 'id';
    const component = mount(login);
    const wrapper = component.find('input').at(0);
    wrapper.simulate('change', { target: { value: id } });
    const newTodoInstance = component.find(Login.WrappedComponent).instance();
    expect(newTodoInstance.state.input.username).toEqual(id);
  });

  it('should set state properly on password input', () => {
    const pw = 'pw';
    const component = mount(login);
    const wrapper = component.find('input').at(1);
    wrapper.simulate('change', { target: { value: pw } });
    const newTodoInstance = component.find(Login.WrappedComponent).instance();
    expect(newTodoInstance.state.input.password).toEqual(pw);
  });

  it('should render error message on login failed', () => {
    const falseLogin = (
      <Provider store={falseStore}>
        <ConnectedRouter history={history}>
          <Login />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(falseLogin);
    const wrapper = component.find('.login-error-wrapper');
    expect(wrapper.length).toBe(2);
  });
});
