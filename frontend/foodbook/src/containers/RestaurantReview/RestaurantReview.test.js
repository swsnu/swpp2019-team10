import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import RestaurantReview from './RestaurantReview';

// https://jestjs.io/docs/en/mock-functions.html

jest.mock('components/ReviewPreview/ReviewPreview', () => jest.fn(() => (
  <div className="mockReviewList">
            this is mock
  </div>
)));

describe('<RestaurantReview />', () => {
  const mockStore = getMockStore({}, {}, {});

  const user1 = {
    id: 1,
    author: 'cat',
    menu: 'cat',
    rating: 3,
    date: '2019-11-05',
    isMine: true,
    image: 'https://i.pinimg.com/474x/91/ec/7e/91ec7ec701884e2959643bf4b31d8ee8--cat-food-food-networktrisha.jpg',
    tag: [{ name: 'good', sentimental: 1 }, { name: 'bad', sentimental: -1 }, { name: 'netural', sentimental: 0 }],
  };

  const user2 = {
    id: 2,
    author: 'cat2',
    menu: 'cat2',
    rating: 4,
    date: '2019-11-06',
    isMine: true,
    image: 'https://i.pinimg.com/474x/91/ec/7e/91ec7ec701884e2959643bf4b31d8ee8--cat-food-food-networktrisha.jpg',
    tag: [{ name: 'good', sentimental: 1 }, { name: 'bad', sentimental: -1 }, { name: 'netural', sentimental: 0 }],
  };

  const resp = [
    user1,
    user2,
  ];

  const mockStore2 = getMockStore({}, { reviewRestaurantList: resp }, {});

  let recommend;
  let recommend2;

  beforeEach(() => {
    recommend = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <RestaurantReview data={user1} history={history} />
        </ConnectedRouter>
      </Provider>
    );
    recommend2 = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <RestaurantReview data={user1} history={history} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('shold handle restaurant review list', () => {
    it('should render without crashing', () => {
      const component = mount(recommend);
      const wrapper = component.find('RestaurantReview');
      expect(wrapper.length).toBe(1);
    });

    it('should render when list.length == 0', () => {
      const component = mount(recommend);
      component.find('Button #res-list-button').simulate('click');
      component.update();
      const wrapper = component.find('.mockReviewList');
      expect(wrapper.length).toBe(0);
    });

    it('should render when recoms.length > 0', () => {
      const component = mount(recommend2);
      component.find('Button #res-list-button').simulate('click');
      component.update();
      const wrapper = component.find('.mockReviewList');
      expect(wrapper.length).toBe(2);
    });
  });
});
