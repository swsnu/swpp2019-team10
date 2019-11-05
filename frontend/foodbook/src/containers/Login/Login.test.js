import React from 'react';
import { mount } from 'enzyme';
import store, { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import Axios from 'axios';
// import * as actionCreators from 'store/actions/user/action_user';

import Login from './Login';


describe('<Login />', () => {
  let login;

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

  // it('should call loginHandler function', () => {
  //   const component = mount(login);
  //   const wrapper = component.find('Button').at(0);
  //   const spyPost = jest.spyOn(Axios, 'post')
  //     .mockImplementation(() => {});
  //   const spyPush = jest.spyOn(history, 'push')
  //     .mockImplementation(() => {});
  //   wrapper.simulate('click');

  //   expect(spyPush).toHaveBeenCalledTimes(1);
  //   expect(spyPost).toHaveBeenCalledTimes(1);
  // });

  // it('should call signupHandler function', () => {
  //   const component = mount(login);
  //   const wrapper = component.find('button').at(1);
  //   const spy = jest.spyOn(Axios, 'post')
  //     .mockImplementation(() => {});
  //   wrapper.simulate('click');
  //   expect(spy).toHaveBeenCalledTimes(1);
  // });
});
