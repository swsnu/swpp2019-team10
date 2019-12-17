import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import Category from './Category';

// import * as actionCreators from 'store/actions/user/action_user';

const mockStore = getMockStore({}, {}, {});

jest.mock('components/Layouts/Feed/Feed', () => jest.fn(() => (
  <div className="mockReviewList">
            this is mock
  </div>
)));

describe('Category', () => {
  let category;
  beforeEach(() => {
    category = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Category />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(category);
    const wrapper = component.find('.Category');
    expect(wrapper.length).toBe(1);
  });

  it('should change value', () => {
    const component = mount(category);
    const wrapper = component.find('DropdownMenu');
    const wrapperChicken = component.find('DropdownItem').at(0);
    const instance = component.find('Category').instance();
    wrapper.simulate('click');
    wrapperChicken.simulate('click');
    expect(instance.state.category).toBe('chicken');
  });
});
