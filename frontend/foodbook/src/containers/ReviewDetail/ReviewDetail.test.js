import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import axios from 'axios';

import ReviewDetail from './ReviewDetail';

// https://jestjs.io/docs/en/mock-functions.html
jest.mock('axios');

describe('<ReviewDetail />', () => {
  const mockStore = getMockStore({}, {}, {});

  const resp = {
    content: 'test',
    restaurant: 1,
    author: 2,
    menu: 3,
    image: 'test.jpg',
    rating: 0.0,
    date: '1970-01-01',
  };

  axios.get.mockResolvedValue(resp);

  let reviewDetail;

  beforeEach(() => {
    reviewDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReviewDetail
            history={history}
            match={{ params: { id: 1 } }}
          />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on author mode', () => {
    it('should render without errors', () => {
      const component = mount(reviewDetail);
      const wrapper = component.find('Connect(ReviewDetail)');
      expect(wrapper.length).toBe(1);
      const backWrapper = component.find('#back-review-button').at(1);

      backWrapper.simulate('click');
    });

    it('error message should be shown up', () => {
      const component = mount(reviewDetail);
      const wrapper = component.find('Connect(ReviewDetail)');
      component.setState({ error: true });
      component.render();
      expect(wrapper.length).toBe(1);
      const backWrapper = component.find('#back-review-button').at(1);

      backWrapper.simulate('click');
    });
  });
});
