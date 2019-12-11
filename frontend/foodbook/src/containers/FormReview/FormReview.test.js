import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import axios from 'axios';

import FormReview from './FormReview';

// https://jestjs.io/docs/en/mock-functions.html

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

global.navigator.geolocation = mockGeolocation;

describe('<FormReview />', () => {
  const mockStore = getMockStore({}, {}, {});

  const resp = {
    id: 1,
    content: 'content',
    restaurant: 'restaurant',
    author: 'author',
    menu: 'menu',
    image: 'blob',
    rating: 0.0,
    date: '1970-01-01',
  };

  let addReview;
  let editReview;
  let unknownReview;

  const spyPost = jest.spyOn(axios, 'post')
    .mockImplementation(() => new Promise((res) => {
      res({
        status: 200,
        data: resp,
      });
    }));

  /*
  const spyGet = jest.spyOn(axios, 'get')
    .mockImplementation(() => new Promise((res) => {
      res({
        status: 200,
        data: resp,
      });
    }));
  */

  const spyPut = jest.spyOn(axios, 'put')
    .mockImplementation(() => new Promise((res) => {
      res({
        status: 200,
        data: resp,
      });
    }));

  beforeEach(() => {
    addReview = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <FormReview history={history} mode="ADD" />
        </ConnectedRouter>
      </Provider>
    );
    editReview = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <FormReview history={history} mode="EDIT" id={0} />
        </ConnectedRouter>
      </Provider>
    );
    unknownReview = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <FormReview history={history} mode="UNKNOWN" />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('mode: ADD', () => {
    it('should render without crashing', () => {
      const component = mount(addReview);
      const wrapper = component.find('FormReview');
      expect(wrapper.length).toBe(1);
    });

    it('should have textfields working', () => {
      const component = mount(addReview);
      component.find('#review-modal-trigger').simulate('click');
      component.update();
      component.find('TextArea #review-restaurant-input').simulate('change', { target: { value: 'restaurant' } });
      component.find('TextArea #review-menu-input').simulate('change', { target: { value: 'menu' } });
      component.find('TextArea #review-content-input').simulate('change', { target: { value: 'content' } });
      component.update();

      const wrapper = component.find('FormReview');
      expect(wrapper.state('restaurant')).toBe('restaurant');
      expect(wrapper.state('menu')).toBe('menu');
      expect(wrapper.state('content')).toBe('content');
    });

    it('should check category restriction', () => {
      const component = mount(addReview);
      component.find('#review-modal-trigger').simulate('click');
      component.update();
      const instance = component.find(FormReview.WrappedComponent).instance();
      const wrapperChicken = component.find('DropdownItem').at(0);

      expect(instance.state.category).toBe('');

      component.find('DropdownMenu').simulate('click');

      // category may change so test only one category, rest will be consistent
      wrapperChicken.simulate('click');
      expect(instance.state.category).toBe('chicken');
    });

    it('should have image upload functioning', () => {
      const component = mount(addReview);
      component.find('#review-modal-trigger').simulate('click');
      component.update();
      const wrapper = component.find('FormReview');
      const imageWrapper = component.find('#add-review-image-selector').at(0);
      imageWrapper.props().onChange([{ blob: 'blob' }]);

      expect(wrapper.state('image')).toBe('blob');
    });

    it('should have rating functioning', () => {
      const component = mount(addReview);
      component.find('#review-modal-trigger').simulate('click');
      component.update();
      const wrapper = component.find('FormReview');

      const ratingWrapper = component.find('#review-rating').at(0);
      ratingWrapper.props().onRate('dummy', { rating: 5 });

      expect(wrapper.state('rating')).toBe(5);
    });

    it('should have submit button working', () => {
      const component = mount(addReview);
      component.find('#review-modal-trigger').simulate('click');
      component.update();
      const event = { target: { value: 'sometext' } };
      component.update();

      // text fields are tested already
      component.find('TextArea #review-restaurant-input').simulate('change', event);
      component.find('TextArea #review-menu-input').simulate('change', event);
      component.find('TextArea #review-content-input').simulate('change', event);
      component.find('#review-rating').at(0).props().onRate(null, { rating: 5.0 });
      component.find('DropdownMenu').simulate('click');
      component.find('DropdownItem').at(0).simulate('click');
      component.update();

      const addWrapper = component.find('FormReview');

      const submitButton = component.find('#submit-review-button').at(0);
      submitButton.simulate('click');
      component.update();
      expect(spyPost).toHaveBeenCalledTimes(1);

      addWrapper.setState({ image: 'blob' });
      component.update();
      component.find('Popup #review-modal-trigger').simulate('click');
      component.update();
      component.find('TextArea #review-restaurant-input').simulate('change', event);
      component.find('TextArea #review-menu-input').simulate('change', event);
      component.find('TextArea #review-content-input').simulate('change', event);
      component.find('#review-rating').at(0).props().onRate(null, { rating: 5.0 });
      component.update();
      component.find('#submit-review-button').at(0).simulate('click');
      component.update();
      expect(spyPost).toHaveBeenCalledTimes(2);
    });

    it('should have back button working', () => {
      const component = mount(addReview);
      component.find('#review-modal-trigger').simulate('click');
      component.update();
      const submitButton = component.find('Button #back-review-button');
      submitButton.simulate('click');
      component.update();
      const wrapper = component.find('Form #review-form');
      expect(wrapper.length).toBe(0);
    });

    it('loading message should be shown up', () => {
      global.navigator.geolocation = mockFakeGeolocation;
      const component = mount(addReview);

      const backWrapper = component.find('.form-review-loading');
      expect(backWrapper.length).toBe(1);
      global.navigator.geolocation = mockGeolocation;
    });

    it('error message should be shown up', () => {
      const component = mount(addReview);
      component.find('#review-modal-trigger').simulate('click');
      component.update();
      const wrapper = component.find('FormReview');
      wrapper.setState({ ready: false, error: { response: 'Error' } });
      component.update();

      const backWrapper = component.find('.form-review-error');
      expect(backWrapper.length).toBe(1);
    });

    it('has setPlace functioning correctly', () => {
      const component = mount(addReview);
      const wrapper = component.find('FormReview');
      wrapper.at(0).instance().getPos(23.0, 9.0);

      expect(wrapper.at(0).state('longitude')).toBe(9.0);
      expect(wrapper.at(0).state('latitude')).toBe(23.0);
    });
  });

  describe('mode: EDIT', () => {
    it('should render without crashing', () => {
      const component = mount(editReview);
      component.find('#review-modal-trigger').simulate('click');
      component.update();
      const wrapper = component.find('FormReview');
      expect(wrapper.length).toBe(1);
    });

    it('should have textfields working', () => {
      const component = mount(editReview);
      setTimeout(() => {
        component.find('Popup #review-modal-trigger').simulate('click');
        component.update();
        expect(component.find('TextArea #review-restaurant-input').length).toBe(1);
        component.find('TextArea #review-restaurant-input').simulate('change', { target: { value: 'restaurant' } });
        component.find('TextArea #review-menu-input').simulate('change', { target: { value: 'menu' } });
        component.find('TextArea #review-content-input').simulate('change', { target: { value: 'content' } });
        component.update();

        const wrapper = component.find('FormReview');
        expect(wrapper.state('restaurant')).toBe('restaurant');
        expect(wrapper.state('menu')).toBe('menu');
        expect(wrapper.state('content')).toBe('content');
      }, 300);
    });

    it('should have submit button working', () => {
      const component = mount(editReview);
      setTimeout(() => {
        const event = { target: { value: 'sometext' } };
        component.update();
        component.find('#review-modal-trigger').simulate('click');
        component.update();
        // text fields are tested already
        component.find('TextArea #review-restaurant-input').simulate('change', event);
        component.find('TextArea #review-menu-input').simulate('change', event);
        component.find('TextArea #review-content-input').simulate('change', event);
        component.find('#review-rating').at(0).props().onRate(null, { rating: 5.0 });
        component.find('DropdownMenu').simulate('click');
        component.find('DropdownItem').at(0).simulate('click');
        component.update();
  
        const submitButton = component.find('#submit-review-button').at(0);
        submitButton.simulate('click');
        component.update();
        expect(spyPut).toHaveBeenCalledTimes(1);
      }, 300);
    });
  });

  describe('mode: UNKNOWN', () => {
    it('error message should be shown up', () => {
      const component = mount(unknownReview);

      const backWrapper = component.find('.form-review-error');
      expect(backWrapper.length).toBe(1);
    });
  });
});
