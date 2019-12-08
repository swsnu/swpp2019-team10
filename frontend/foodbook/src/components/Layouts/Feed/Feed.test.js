import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import * as actionCreators from 'store/actions/review/action_review';
import ReviewPreview from 'components/ReviewPreview';
import Feed from '.';

const mockStore = getMockStore({}, {}, {});

describe('Feed', () => {
  let feed;
  let dateUndefinedFeed;
  const spyGetAll = jest.spyOn(actionCreators, 'GET_REVIEWS')
    .mockImplementation(() => ({ type: '' }));

  const stubReviews = [
    <ReviewPreview
      key="0"
      id={0}
      date="0"
      isMine
    />,

    <ReviewPreview
      key="1"
      id={1}
      date="1"
      isMine={false}
    />,
  ];

  beforeEach(() => {
    feed = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Feed reviews={stubReviews} dateString="0" />
        </ConnectedRouter>
      </Provider>
    );

    dateUndefinedFeed = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Feed reviews={stubReviews} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(feed);
    const wrapper = component.find('.feed');
    expect(wrapper.length).toBe(2);
  });

  it('should call onGetAll on loading', () => {
    const component = mount(feed);
    expect(component).not.toBe(null);
    expect(spyGetAll).toHaveBeenCalledTimes(1);
  });

  it('should handle dateString', () => {
    const component = mount(feed);
    const instance = component.find(Feed.WrappedComponent).instance();
    instance.forceUpdate();
    const wrapper = component.find('.feed');
    expect(wrapper.length).toBe(2);
  });

  it('should render when dateString is undefined', () => {
    const component = mount(dateUndefinedFeed);
    const instance = component.find(Feed.WrappedComponent).instance();
    instance.forceUpdate();
    const wrapper = component.find('ReviewPreview');
    expect(wrapper.length).toBe(2);
  });
});
