// Test for Signup Component - used TDD Development Method. 2019/11/11 rev 1.00

import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { getMockStore } from 'test-utils/mock';
import Introduce from './Introduce';

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

  it('should handle going to main page', () => {
    const component = mount(introduce);
    const wrapper = component.find('Button').at(2);
    const spyPush = jest.spyOn(history, 'push')
      .mockImplementation(() => {});
    wrapper.simulate('click');
    expect(spyPush).toHaveBeenCalledTimes(1);
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
});
