import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import Friend from './Friend';
// import * as actionCreators from 'store/actions/user/action_user';

const mockStore = getMockStore({}, {}, {});

describe('friend', () => {
  let friend;
  const name = 'a';

  beforeEach(() => {
    friend = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Friend name={name} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crash', () => {
    const component = mount(friend);
    const wrapper = component.find('.Friend');
    expect(wrapper.length).toBe(1);
  });
});
