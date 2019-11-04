import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import RawCalendar from './RawCalendar';

// import * as actionCreators from 'store/actions/user/action_user';

const mockStore = getMockStore({}, {}, {});

describe('Calendar', () => {
  let calendar;
  beforeEach(() => {
    calendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <RawCalendar />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(calendar);
    const wrapper = component.find('.RawCalendar');
    expect(wrapper.length).toBe(1);
  });
});
