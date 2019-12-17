import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import * as actionCreators from 'store/actions/user/action_user';
import FriendList from './FriendList';

const mockStore = getMockStore({
  friends: [{ id: 1, nickname: 'name' }],
}, {}, {});

describe('friendlist', () => {
  let friendList;

  const spyGetFriends = jest.spyOn(actionCreators, 'GET_FRIENDS')
    .mockImplementation(() => ({ type: '' }));

  window.location.reload = jest.fn();

  beforeEach(() => {
    friendList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <FriendList history={history} />
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
    component.find('DropdownItem').at(0).simulate('click');
    component.update();
    expect(spyGetFriends).toHaveBeenCalledTimes(1);
  });

  it('should click friend', () => {
    const component = mount(friendList);
    component.find('DropdownItem').at(1).simulate('click');
    component.update();
    expect(spyGetFriends).toHaveBeenCalledTimes(1);
  });
});
