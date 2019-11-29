import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import * as actionCreators from 'store/actions/review/action_review';
import ReviewPreview from 'components/ReviewPreview';
import ReviewList from './ReviewLocation';

const mockStore = getMockStore({}, {}, {});

describe('ReviewList', () => {
  let reviewList;
  let dateUndefinedReviewList;
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
    reviewList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReviewList reviews={stubReviews} dateString="0" />
        </ConnectedRouter>
      </Provider>
    );

    dateUndefinedReviewList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReviewList reviews={stubReviews} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(reviewList);
    const wrapper = component.find('.ReviewList');
    expect(wrapper.length).toBe(1);
  });

  it('should call onGetAll on loading', () => {
    const component = mount(reviewList);
    expect(component).not.toBe(null);
    expect(spyGetAll).toHaveBeenCalledTimes(1);
  });

  it('should handle dateString', () => {
    const component = mount(reviewList);
    const instance = component.find(ReviewList.WrappedComponent).instance();
    instance.forceUpdate();
    const wrapper = component.find('ReviewList');
    expect(wrapper.length).toBe(1);
  });

  it('should render when dateString is undefined', () => {
    const component = mount(dateUndefinedReviewList);
    const instance = component.find(ReviewList.WrappedComponent).instance();
    instance.forceUpdate();
    const wrapper = component.find('ReviewPreview');
    expect(wrapper.length).toBe(2);
  });
});
