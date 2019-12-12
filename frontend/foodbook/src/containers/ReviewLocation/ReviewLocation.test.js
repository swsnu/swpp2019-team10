import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import * as actionCreators from 'store/actions/review/action_review';
import ReviewPreview from 'components/ReviewPreview';
import ReviewLocation from './ReviewLocation';

const mockStore = getMockStore({}, {}, {});

const mockGeolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementation((success) => Promise.resolve(success({
      coords: {
        latitude: 51.1,
        longitude: 45.3,
      },
    }))),
};

const mockFakeGeolocation = {
  getCurrentPosition: jest.fn(),
};

describe('ReviewLocation', () => {
  let reviewLocation;
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
    global.navigator.geolocation = mockGeolocation;
    reviewLocation = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReviewLocation reviews={stubReviews} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(reviewLocation);
    const wrapper = component.find('.ReviewLocation');
    expect(wrapper.length).toBe(1);
  });

  it('should call onGetAll on loading', () => {
    const component = mount(reviewLocation);
    expect(component).not.toBe(null);
    /* fix value after implementation */
    expect(spyGetAll).toHaveBeenCalledTimes(0);
  });

  it('loading message should be shown up', () => {
    global.navigator.geolocation = mockFakeGeolocation;
    const component = mount(reviewLocation);

    const backWrapper = component.find('.review-location-loading');
    expect(backWrapper.length).toBe(1);
  });
});
