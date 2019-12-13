import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import * as actionCreators from 'store/actions/recom/action_recom';
import RecommendationTag from './RecommendationTag';

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

const mockFakeGeolocation = {
  getCurrentPosition: jest.fn(),
};

jest.mock('@nivo/bar', () => ({
  Bar: 'MockBar',
}));

global.navigator.geolocation = mockGeolocation;

const initialUser = {
  user: {
    username: '',
    phone_number: '',
    age: -1,
    gender: '',
    number_of_reviews: -1,
    number_of_friends: -1,
    failed: false,
    taste: {},
  },
};

jest.mock('containers/RestaurantReview', () => jest.fn(() => (
  <div className="mockRestaurantReview">
            this is mock
  </div>
)));
describe('<RecommendationTag />', () => {
  const mockStore = getMockStore(initialUser, {}, {});

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
  const spyGetAll = jest.spyOn(actionCreators, 'GET_RECOMS_TST')
    .mockImplementation(() => ({
      type: '',
    }));
  // const spyGetIFH = jest.spyOn(actionCreators, 'GET_RECOMS_IFH')
  //   .mockImplementation(() => ({
  //     type: '',
  //   }));

  const mockStore2 = getMockStore(initialUser, {}, { recomtstList: resp });

  let recommend;
  let recommend2;
  let recommend3;

  beforeEach(() => {
    recommend = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <RecommendationTag id={0} history={history} />
        </ConnectedRouter>
      </Provider>
    );
    recommend2 = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <RecommendationTag id={0} history={history} />
        </ConnectedRouter>
      </Provider>
    );
    recommend3 = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <RecommendationTag id={-1} history={history} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('mode: tst', () => {
    it('should render without crashing', () => {
      const component = mount(recommend);
      const wrapper = component.find('RecommendationTag');
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
      component.find('RecommendationTag').setState({
        lat: 37.5,
        lng: 126.95,
      });
      component.find('Button #recom-tst-button').simulate('click');
      component.update();
      expect(spyGetAll).toHaveBeenCalledTimes(1);
      const wrapper = component.find('List #recommendList');
      expect(wrapper.length).toBe(1);
    });

    it('should render when recoms.length > 0', () => {
      const component = mount(recommend2);
      component.find('RecommendationTag').setState({
        lat: 37.5,
        lng: 126.95,
      });
      component.find('Button #recom-tst-button').simulate('click');
      component.update();
      const wrapper = component.find('List #recommendList');
      expect(wrapper.length).toBe(1);
    });
    it('should render when recoms.length > 0', () => {
      const component = mount(recommend3);
      component.find('RecommendationTag').setState({
        lat: 37.5,
        lng: 126.95,
      });
      const wrapper = component.find('Button #recom-tst-button');
      expect(wrapper.text()).toBe('I feel hungry!');
      wrapper.simulate('click');
      component.update();
      const wrapper1 = component.find('List #recommendList');
      expect(wrapper1.length).toBe(1);
    });
  });
});
