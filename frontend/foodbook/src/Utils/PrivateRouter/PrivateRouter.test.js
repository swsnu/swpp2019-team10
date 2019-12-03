import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { getMockStore } from 'test-utils/mock';

import * as actionCreators from 'store/actions/user/action_user';

import PrivateRouter from '.';

const store = getMockStore({}, {}, {});

describe('<PrivateRouter />', () => {
  let route;
  let component;

  const mockComponent = () => <div className="inner-wrapper"> test </div>;

  beforeEach(() => {
    route = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PrivateRouter component={mockComponent} history={history} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect correctly when not logged in', (done) => {
    const spyAction = jest.spyOn(actionCreators, 'GET_USER_INFO')
      .mockImplementation(() => () => new Promise((res) => {
        const data = {
          type: 'USER_IS_NOT_LOGGED_IN',
        };

        res(data);
      }));

    const spyHistory = jest.spyOn(history, 'push')
      .mockImplementation(() => {});

    component = mount(route);
    const wrapper = component.find('.inner-wrapper');
    expect(wrapper.length).toBe(1);
    expect(spyAction).toHaveBeenCalledTimes(1);
    setTimeout(() => expect(spyHistory).toHaveBeenCalledTimes(1), 100);
    done();
  });

  it('should redner correctly when logged in', (done) => {
    const spyAction = jest.spyOn(actionCreators, 'GET_USER_INFO')
      .mockImplementation(() => () => new Promise((res) => {
        const data = {
          type: 'GET_USER_INFO',
        };

        res(data);
      }));

    const spyHistory = jest.spyOn(history, 'push')
      .mockImplementation(() => {});

    component = mount(route);
    const wrapper = component.find('.inner-wrapper');
    expect(wrapper.length).toBe(1);
    expect(spyAction).toHaveBeenCalledTimes(1);
    setTimeout(() => expect(spyHistory).toHaveBeenCalledTimes(0), 100);
    done();
  });

  it('should redirect correctly when server error', (done) => {
    const spyAction = jest.spyOn(actionCreators, 'GET_USER_INFO')
      .mockImplementation(() => () => new Promise((res, rej) => {
        const data = {
          type: 'ERROR',
        };

        rej(data);
      }));

    const spyHistory = jest.spyOn(history, 'push')
      .mockImplementation(() => {});

    component = mount(route);
    const wrapper = component.find('.inner-wrapper');
    expect(wrapper.length).toBe(1);
    expect(spyAction).toHaveBeenCalledTimes(1);
    setTimeout(() => expect(spyHistory).toHaveBeenCalledTimes(1), 100);
    done();
  });
});
