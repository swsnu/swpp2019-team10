import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import * as actionCreators from 'store/actions/user/action_user';
import Login from './Login';

const store = getMockStore({}, {}, {});

describe('<Login />', () => {
  let login;
  const spyLogin = jest.spyOn(actionCreators, 'LOGIN')
    .mockImplementation(() => ({ type: '' }));
  const spyRegister = jest.spyOn(actionCreators, 'REGISTER')
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
    const spyPush = jest.spyOn(history, 'push')
      .mockImplementation(() => {});
    wrapper.simulate('click');

    expect(spyLogin).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledTimes(1);
  });

  it('should call signupHandler function', () => {
    const component = mount(login);
    const wrapper = component.find('button').at(1);
    wrapper.simulate('click');
    expect(spyRegister).toHaveBeenCalledTimes(1);
  });
});
