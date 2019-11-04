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
  const picture = 'null';
  const review = '1';
  const friends = '1';

  beforeEach(() => {
    friend = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Friend name={name} picture={picture} review={review} friend={friends} />
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

  it('should render correctly when reviews and friends are more than two', () => {
    const component = mount(friend);
    const friendWrapper = component.find('.friendNumWrapper');
    const reviewWrapper = component.find('.reviewNumWrapper');
    expect(friendWrapper.text()).toEqual('Friends');
    expect(reviewWrapper.text()).toEqual('Reviews');
  });

  it('should handle zero reviews or friends', () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Friend name={name} picture={picture} review="0" friend="0" />
        </ConnectedRouter>
      </Provider>,
    );

    const friendWrapper = component.find('.friendNumWrapper');
    const reviewWrapper = component.find('.reviewNumWrapper');
    expect(friendWrapper.text()).toEqual('Friend');
    expect(reviewWrapper.text()).toEqual('Review');
  });
});
