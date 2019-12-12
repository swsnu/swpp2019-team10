import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import axios from 'axios';
import FriendList from './FriendList';
// import * as actionCreators from 'store/actions/user/action_user';

const mockStore = getMockStore({
  friend: [{ id: 1, nickname: 'name' }],
}, {}, {});

const mockStore2 = getMockStore({
  friend: [],
}, {}, {});

describe('friendlist', () => {
  let friendList;

  const spyGet = jest.spyOn(axios, 'get')
    .mockImplementation(() => new Promise((res) => {
      res({
        status: 200,
        data: [],
      });
    }));

  beforeEach(() => {
    friendList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <FriendList />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(friendList);
    const wrapper = component.find('.friendList');
    expect(wrapper.length).toBe(1);
  });
});
