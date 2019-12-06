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
  searchUsers: [{ id: 2, nickname: 'names' }],
}, {}, {});

const mockStore2 = getMockStore({
  friend: [],
  searchUsers: [],
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

  const spyPost = jest.spyOn(axios, 'post')
    .mockImplementation(() => new Promise((res) => {
      res({
        status: 200,
        data: [],
      });
    }));

  const spyDelete = jest.spyOn(axios, 'delete')
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
    const wrapper = component.find('.friend-preview');
    expect(wrapper.length).toBe(1);
  });

  it('should render when friend and search user do exist', () => {
    const component = mount(friendList);
    const wrapper = component.find('Button');
    expect(wrapper.length).toBe(2);
    expect(spyGet).toHaveBeenCalledTimes(1);
  });

  it('should handle delete click', () => {
    const component = mount(friendList);
    component.find('button').at(0).simulate('click');
    component.update();

    expect(spyDelete).toHaveBeenCalledTimes(1);
  });

  it('should handle add click', () => {
    const component = mount(friendList);
    component.find('button').at(1).simulate('click');
    component.update();

    expect(spyPost).toHaveBeenCalledTimes(1);
  });

  it('should have input field working', () => {
    const component = mount(friendList);
    expect(component.find('.prompt').length).toBe(1);
    component.find('.prompt').simulate('change', { target: { value: 'r' } });
    expect(spyGet).toHaveBeenCalledTimes(2);

    component.find('.prompt').simulate('change', { target: { value: '' } });
    expect(spyGet).toHaveBeenCalledTimes(3);
  });

  it('should render when friend and search user do not exist', () => {
    const component = mount(
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <FriendList />
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find('Button');
    expect(wrapper.length).toBe(0);
    expect(spyGet).toHaveBeenCalledTimes(1);
  });
});
