import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import * as actionCreators from 'store/actions/user/action_user';
import Myinfo from './Myinfo';

const mockStore = getMockStore({
  user: {
    username: 'jaeho',
    phone_number: '000',
    age: 20,
    gender: 'Male',
    number_of_reviews: 5,
    number_of_friends: 5,
    nickname: 'jaeho',
  },
  friend: {
    username: 'jaeho2',
    phone_number: '0001',
    age: 22,
    gender: 'Male',
    number_of_reviews: 5,
    number_of_friends: 5,
    nickname: 'jaeho2',
  },
}, {}, {});

const mockStore2 = getMockStore({
  user: {
    username: 'jaeho',
    phone_number: '000',
    age: 20,
    gender: 'Male',
    number_of_reviews: 1,
    number_of_friends: 1,
    nickname: 'jaeho',
  },
  friend: {
    username: 'jaeho2',
    phone_number: '0001',
    age: 22,
    gender: 'Male',
    number_of_reviews: 5,
    number_of_friends: 5,
    nickname: 'jaeho2',
  },
}, {}, {});

describe('myinfo', () => {
  let myinfo;

  const spyGetFriend = jest.spyOn(actionCreators, 'GET_FRIEND_INFO')
    .mockImplementation(() => ({ type: '' }));

  beforeEach(() => {
    myinfo = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Myinfo />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crash', () => {
    const component = mount(myinfo);
    const wrapper = component.find('.Myinfo');
    expect(wrapper.length).toBe(2);
  });

  it('should render without crash when friend', () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Myinfo friendId={2} />
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find('.Myinfo');
    expect(wrapper.length).toBe(2);
    expect(spyGetFriend).toHaveBeenCalledTimes(1);
  });

  it('should render correctly when reviews and friends are more than two', () => {
    const component = mount(myinfo);
    const friendWrapper = component.find('.friendNumWrapper').at(0);
    const reviewWrapper = component.find('.reviewNumWrapper').at(0);
    expect(friendWrapper.text()).toEqual('Friends');
    expect(reviewWrapper.text()).toEqual('Reviews');
  });

  it('should handle one reviews or friends', () => {
    const component = mount(
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Myinfo />
        </ConnectedRouter>
      </Provider>,
    );

    const friendWrapper = component.find('.friendNumWrapper').at(0);
    const reviewWrapper = component.find('.reviewNumWrapper').at(0);
    expect(friendWrapper.text()).toEqual('Friend');
    expect(reviewWrapper.text()).toEqual('Review');
  });
});
