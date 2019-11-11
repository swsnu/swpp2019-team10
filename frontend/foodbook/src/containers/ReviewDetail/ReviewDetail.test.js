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
    restaurant: 'rest',
    author: 'author',
    menu: 'menu',
    image: '',
    rating: 0.0,
    tag: [{ name: 'good', positive: true }, { name: 'bad', positive: false }],
    date: '1970-01-01',
  };

  jest.spyOn(axios, 'get')
    .mockImplementation(() => new Promise((res) => {
      res({
        status: 200,
        data: resp,
      });
    }));

  jest.spyOn(axios, 'delete')
    .mockImplementation(() => new Promise((res) => {
      res({
        status: 200,
        data: resp,
      });
    }));

  let reviewDetail;

  beforeEach(() => {
    reviewDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReviewDetail
            history={history}
            match={{ params: { id: '1' } }}
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
    });

    it('delete button should work', () => {
      const component = mount(reviewDetail);
      const detailWrapper = component.find('ReviewDetail');

      detailWrapper.setState({ ready: true });
      component.update();
      const backWrapper = component.find('#delete-review-button').at(0);
      expect(backWrapper.length).toBe(1);

      backWrapper.simulate('click');
      component.update();
    });

    it('edit button should work', () => {
      const component = mount(reviewDetail);
      const detailWrapper = component.find('ReviewDetail');

      detailWrapper.setState({ ready: true });
      component.update();

      const wrapper = component.find('#edit-review-button').at(0);

      wrapper.simulate('click');
      component.update();
    });

    it('back button should work', () => {
      const component = mount(reviewDetail);
      const detailWrapper = component.find('ReviewDetail');

      detailWrapper.setState({ ready: true });
      component.update();

      const wrapper = component.find('#back-review-button').at(0);

      wrapper.simulate('click');
      component.update();
    });

    it('loading message should be shown up', () => {
      const component = mount(reviewDetail);
      const wrapper = component.find('ReviewDetail');
      expect(wrapper.length).toBe(1);

      wrapper.setState({ ready: false });
      component.update();

      const backWrapper = component.find('.Review-loading-wrapper');
      expect(backWrapper.length).toBe(1);
    });

    it('error message should be shown up', () => {
      const component = mount(reviewDetail);
      const detailWrapper = component.find('ReviewDetail');

      detailWrapper.setState({ ready: false, error: { response: 'Error' } });
      component.update();

      const backWrapper = component.find('.Review-error-wrapper');
      expect(backWrapper.length).toBe(1);
    });
  });
});
