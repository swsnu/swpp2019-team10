import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import Main from './Main';
// import * as actionCreators from 'store/actions/user/action_user';

const mockStore = getMockStore({}, {}, {});

describe('main', () => {
  let main;
  beforeEach(() => {
    main = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Main />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redner without crashing', () => {
    const component = mount(main);
    const wrapper = component.find('.main');
    expect(wrapper.length).toBe(1);
  });

  it('should render article(review)s correctly', () => {
    const component = mount(main);
    const wrapper = component.find('.main-feed-wrapper');
    expect(wrapper.length).toBe(1); // FIXME: should modified after implementing the reviewList.
  });

  it('should handle unknown case', () => {
    const component = mount(main);
    const instance = component.find('Main').instance();
    instance.setState({
      activeItem: 'illegal',
    });
    expect(instance.state.activeItem).toEqual('illegal');
    component.update();
    expect(component.find('.main-error-wrapper').length).toBe(1);
  });

  it('should change state when calendar is clicked', () => {
    const component = mount(main);
    const wrapper = component.find('a').at(1);
    wrapper.simulate('click');
    const instance = component.find('Main').instance();
    expect(instance.state.activeItem).toEqual('calendar');
  });

  it('should change state when location is clicked', () => {
    const component = mount(main);
    const wrapper = component.find('a').at(2);
    wrapper.simulate('click');
    const instance = component.find('Main').instance();
    expect(instance.state.activeItem).toEqual('location');
  });

  it('should change state when type is clicked', () => {
    const component = mount(main);
    const wrapper = component.find('a').at(3);
    wrapper.simulate('click');
    const instance = component.find('Main').instance();
    expect(instance.state.activeItem).toEqual('type');
  });

  it('should change state when menu is clicked', () => {
    const component = mount(main);
    const wrapper = component.find('a').at(4);
    wrapper.simulate('click');
    const instance = component.find('Main').instance();
    expect(instance.state.activeItem).toEqual('menu');
  });
});
