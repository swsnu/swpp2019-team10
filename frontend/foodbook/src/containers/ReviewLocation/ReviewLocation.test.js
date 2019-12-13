import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import ReviewLocation from './ReviewLocation';

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

  const stubReviews = [

  ];

  const mockStore = getMockStore({}, { reviews: stubReviews }, {});

  beforeEach(() => {
    global.navigator.geolocation = mockGeolocation;
    reviewLocation = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReviewLocation />
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

  it('loading message should be shown up', () => {
    global.navigator.geolocation = mockFakeGeolocation;
    const component = mount(reviewLocation);

    const backWrapper = component.find('.review-location-loading');
    expect(backWrapper.length).toBe(1);
  });
});
