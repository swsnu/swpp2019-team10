import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import * as actionCreators from 'store/actions/recom/action_recom';
import RecommendationLocation from './RecommendationLocation';

// https://jestjs.io/docs/en/mock-functions.html

const mockGeolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementation((success) => Promise.resolve(success({
      coords: {
        latitude: 37.5,
        longitude: 126.95,
      },
    }))),
};
jest.mock('containers/RestaurantReview', () => jest.fn(() => (
  <div className="mockRestaurantReview">
            this is mock
  </div>
)));
jest.mock('components/GoogleMap/GoogleMap', () => jest.fn(() => (
  <div className="mockGoogleMap">
            this is mock
  </div>
)));
const mockFakeGeolocation = {
  getCurrentPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;

describe('<RecommendationLocation />', () => {
  const mockStore = getMockStore({}, {}, {});

  const resp = [
    {
      name: 'TEST_RES_1',
      latitude: '37.5',
      longitude: '126.95',
      rating: 5,
      my_rating: 0,
      other_rating: 3.5,
    },
    {
      name: 'TEST_RES_2',
      latitude: '37.8',
      longitude: '126.95',
      rating: 2,
      my_rating: 4,
      other_rating: 0,
    },
  ];

  const spyGetAll = jest.spyOn(actionCreators, 'GET_RECOMS_LOC')
    .mockImplementation(() => ({
      type: '',
    }));

  const mockStore2 = getMockStore({}, {}, { recomlocList: resp });

  let recommend;
  let recommend2;

  beforeEach(() => {
    recommend = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <RecommendationLocation history={history} id={1} />
        </ConnectedRouter>
      </Provider>
    );
    recommend2 = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <RecommendationLocation history={history} id={2} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('mode: loc', () => {
    it('should render without crashing', () => {
      const component = mount(recommend);
      const wrapper = component.find('RecommendationLocation');
      expect(wrapper.length).toBe(1);
    });

    it('should render loading', () => {
      global.navigator.geolocation = mockFakeGeolocation;
      const component = mount(recommend);
      const wrapper = component.find('.form-recoms-loading');
      expect(wrapper.length).toBe(1);
      global.navigator.geolocation = mockGeolocation;
    });

    it('should render when recoms.length == 0', () => {
      const component = mount(recommend);
      component.find('RecommendationLocation').setState({
        lat: 37.5,
        lng: 126.95,
      });
      component.update();
      component.find('Button #recom-loc-button').simulate('click');
      component.update();
      expect(spyGetAll).toHaveBeenCalledTimes(1);
      expect(component.find('.mockGoogleMap').length).toBe(1);
      const wrapper = component.find('List #recommendList');
      expect(wrapper.length).toBe(1);
    });

    it('should render when recoms.length > 0', () => {
      const component = mount(recommend2);
      component.find('RecommendationLocation').setState({
        lat: 37.5,
        lng: 126.95,
      });
      component.find('Button #recom-loc-button').simulate('click');
      component.update();
      expect(spyGetAll).toHaveBeenCalledTimes(1);
      expect(component.find('.mockGoogleMap').length).toBe(1);
      const wrapper = component.find('List #recommendList');
      expect(wrapper.length).toBe(1);
    });
  });
});
