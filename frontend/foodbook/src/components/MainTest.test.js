import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import Main from './MainTest';

const mockStore = getMockStore({}, {}, {});

jest.mock('containers/ReviewList/ReviewList', () => jest.fn(() => (
  <div className="mockReviewList">
            this is mock
  </div>
)));

jest.mock('containers/FriendList/FriendList', () => jest.fn(() => (
  <div className="mockFriendList">
            this is mock
  </div>
)));

jest.mock('components/RawCalendar/RawCalendar', () => jest.fn(() => (
  <div className="mockRawCalendar">
            this is mock
  </div>
)));

describe('main', () => {
  let main;

  beforeEach(() => {
    main = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Main history={history} />
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
});
