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

const mockNoResponseGeolocation = {
  getCurrentPosition: jest.fn(),
};

const mockFakeGeolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementation((success, failure) => Promise.reject(failure())),
};

const stubReviews = {
  reviewList: [
    {
      id: 0,
      date: '0',
      isMine: true,
      category: 'pizza',
      latitude: 51.1,
      longitude: 45.3,
    },
    {
      id: 1,
      date: '1',
      isMine: true,
      category: 'chicken',
      latitude: 11.1,
      longitude: 45.3,
    },
  ],
  reviewDetail: {},
};

describe('ReviewLocation', () => {
  let reviewLocation;

  const mockStore = getMockStore({}, stubReviews, {});

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
    global.navigator.geolocation = mockNoResponseGeolocation;
    const component = mount(reviewLocation);

    const backWrapper = component.find('.review-location-loading');
    expect(backWrapper.length).toBe(1);
  });

  it('default location should be set', () => {
    global.navigator.geolocation = mockFakeGeolocation;
    const component = mount(reviewLocation);
    const wrapper = component.find('ReviewLocation');
    console.log(wrapper.at(0).state());
    expect(wrapper.at(0).state('searchLng')).toBe(0);
    expect(wrapper.at(0).state('searchLat')).toBe(0);
  });
});
