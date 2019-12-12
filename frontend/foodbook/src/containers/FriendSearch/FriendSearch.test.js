import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import axios from 'axios';
import FriendSearch from './FriendSearch';
// import * as actionCreators from 'store/actions/user/action_user';

const mockStore = getMockStore({
  searchUsers: [{ id: 2, nickname: 'names' }],
}, {}, {});

describe('friendsearch', () => {
  let friendSearch;

  const spyGet = jest.spyOn(axios, 'get')
    .mockImplementation(() => new Promise((res) => {
      res({
        status: 200,
        data: [{ id: 2, nickname: 'names' }],
      });
    }));

  const spyPost = jest.spyOn(axios, 'post')
    .mockImplementation(() => new Promise((res) => {
      res({
        status: 200,
        data: [],
      });
    }));

  beforeEach(() => {
    friendSearch = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <FriendSearch />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(friendSearch);
    const wrapper = component.find('.searchFriend');
    expect(wrapper.length).toBe(1);
  });

  it('should handle add click', () => {
    const component = mount(friendSearch);
    component.find('input').simulate('change', { target: { value: 'n' } });
    expect(spyGet).toHaveBeenCalledTimes(1);
    component.update();
    component.find('DropdownItem').at(0).simulate('click');
    component.update();
    component.find('button').at(0).simulate('click');
    component.update();
    expect(spyPost).toHaveBeenCalledTimes(1);
  });

  it('should have input field working', () => {
    const component = mount(friendSearch);
    expect(component.find('input').length).toBe(1);
    component.find('input').simulate('change', { target: { value: 'r' } });
    expect(spyGet).toHaveBeenCalledTimes(1);

    component.find('input').simulate('change', { target: { value: '' } });
    expect(spyGet).toHaveBeenCalledTimes(2);
  });
});
