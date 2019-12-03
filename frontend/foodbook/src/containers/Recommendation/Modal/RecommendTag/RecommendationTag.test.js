import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

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

global.navigator.geolocation = mockGeolocation;

describe('<RecommendationTag />', () => {
  const mockStore = getMockStore({}, {}, {});

  const resp = [
    {
      name: 'TEST_RES_1',
      latitude: '37.5',
      longitude: '126.95',
      rating: 5,
    },
    {
      name: 'TEST_RES_2',
      latitude: '37.8',
      longitude: '126.95',
      rating: 2,
    },
  ];

  const mockStore2 = getMockStore({}, {}, { recomtstList: resp });

  let recommend;
  let recommend2;

  beforeEach(() => {
    recommend = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <RecommendationTag history={history} />
        </ConnectedRouter>
      </Provider>
    );
    recommend2 = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <RecommendationTag history={history} />
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

    it('should render when recoms.length == 0', () => {
      const component = mount(recommend);
      let wrapper = component.find('RecommendationTag');
      component.find('Button #recom-tst-button').simulate('click');
      component.update();
      wrapper = component.find('List #recommendList');
      expect(wrapper.length).toBe(1);
    });

    it('should render when recoms.length > 0', () => {
      const component = mount(recommend2);
      let wrapper = component.find('RecommendationTag');
      component.find('Button #recom-tst-button').simulate('click');
      component.update();
      wrapper = component.find('List #recommendList');
      expect(wrapper.length).toBe(1);
    });
  });
});
