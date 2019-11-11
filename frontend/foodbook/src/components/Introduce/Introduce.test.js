import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { getMockStore } from 'test-utils/mock';
import * as actionCreators from 'store/actions/user/action_user';
import Introduce from './Introduce';

const store = getMockStore({}, {}, {});

describe('<Introduce />', () => {
  let introduce;

  beforeEach(() => {
    introduce = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Introduce />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const component = mount(introduce);
    const wrapper = component.find('.introduce');
    expect(wrapper.length).toBe(1);
  });

  it('should handle login page', () => {
    const component = mount(introduce);
    const wrapper = component.find('Button').at(0);
    const spyPush = jest.spyOn(history, 'push')
      .mockImplementation(() => {});
    wrapper.simulate('click');

    expect(spyPush).toHaveBeenCalledTimes(1);
  });

  it('should handle signup page', () => {
    const component = mount(introduce);
    const wrapper = component.find('Button').at(1);
    const spyPush = jest.spyOn(history, 'push')
      .mockImplementation(() => {});
    wrapper.simulate('click');

    expect(spyPush).toHaveBeenCalledTimes(1);
  });
});
