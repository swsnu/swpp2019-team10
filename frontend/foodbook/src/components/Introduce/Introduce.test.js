// Test for Signup Component - used TDD Development Method. 2019/11/11 rev 1.00

import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { getMockStore } from 'test-utils/mock';
import * as actionCreators from 'store/actions/user/action_user';

import Introduce from '.';

const store = getMockStore({}, {}, {});

describe('<Introduce />', () => {
  let introduce;

  beforeEach(() => {
    introduce = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Introduce history={history} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const component = mount(introduce);
    const wrapper = component.find('#start-wrapper');
    expect(wrapper.length).toBe(1);
  });

  it('should handle mobile env', () => {
    global.innerWidth = 300; // resize width
    global.dispatchEvent(new Event('resize')); // dispatch resizing event

    const component = mount(introduce);
    const wrapper = component.find('MenuItem').at(4);
    expect(wrapper.length).toBe(1);
  });

  it('should handle changing view page', () => {
    global.innerWidth = 300;
    global.dispatchEvent(new Event('resize'));

    const component = mount(introduce);
    const wrapper = component.find('MenuItem').at(5);
    expect(wrapper.length).toBe(1);
  });

  it('should revert when menu is fixed on top', () => {
    global.innerWidth = 800;
    global.dispatchEvent(new Event('resize'));
    const component = mount(introduce);
    const wrapper = component.find('DesktopContainer');

    wrapper.setState({
      fixed: false,
    });
    component.update();
    expect(component.find('Menu').at(0).prop('inverted')).toBe(true);

    wrapper.setState({
      fixed: true,
    });
    component.update();
    expect(component.find('Menu').at(0).prop('inverted')).toBe(false);
  });

  it('should redner correctly when not logged in', (done) => {
    const spyAction = jest.spyOn(actionCreators, 'GET_USER_INFO')
      .mockImplementation(() => () => new Promise((res) => {
        const data = {
          type: 'USER_IS_NOT_LOGGED_IN',
        };

        res(data);
      }));

    const spyHistory = jest.spyOn(history, 'push')
      .mockImplementation(() => {});

    const component = mount(introduce);
    expect(component.find('#start-wrapper').length).toBe(1);

    expect(spyAction).toHaveBeenCalledTimes(1);
    setTimeout(() => expect(spyHistory).toHaveBeenCalledTimes(0), 100);
    done();
  });

  it('should redirect to main page when logged in', (done) => {
    const spyAction = jest.spyOn(actionCreators, 'GET_USER_INFO')
      .mockImplementation(() => () => new Promise((res) => {
        const data = {
          type: 'GET_USER_INFO',
        };

        res(data);
      }));

    const spyHistory = jest.spyOn(history, 'push')
      .mockImplementation(() => {});

    const component = mount(introduce);
    expect(component.find('#start-wrapper').length).toBe(1);

    expect(spyAction).toHaveBeenCalledTimes(1);
    setTimeout(() => expect(spyHistory).toHaveBeenCalledTimes(1), 100);
    done();
  });
});
