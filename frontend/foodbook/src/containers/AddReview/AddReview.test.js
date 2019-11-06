import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import axios from 'axios';

import AddReview from './AddReview';

// https://jestjs.io/docs/en/mock-functions.html
jest.mock('axios');

describe('<AddReview />', () => {
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

  axios.post.mockResolvedValue(resp);

  let addReview;

  beforeEach(() => {
    addReview = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <AddReview history={history} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const component = mount(addReview);
    const wrapper = component.find('AddReview');
    expect(wrapper.length).toBe(1);
  });

  it('should have submit button working', () => {
    const component = mount(addReview);

    const event = { target: { value: 'sometext' } };

    // submit button should be enabled first
    component.find('#review-restaurant-input').at(1).simulate('change', event);
    component.find('#review-menu-input').at(1).simulate('change', event);
    component.find('#review-content-input').at(1).simulate('change', event);


    const addWrapper = component.find('AddReview');

    addWrapper.setState({ rating: 5.0 });

    const submitButton = component.find('#submit-review-button').at(0);
    submitButton.simulate('click');
    component.update();

    addWrapper.setState({ image: '' });
    submitButton.simulate('click');
    component.update();
  });

  it('should have back button working', () => {
    const component = mount(addReview);

    const submitButton = component.find('#back-review-button').at(0);
    submitButton.simulate('click');
    component.update();
  });

  it('should have textfields working', () => {
    const component = mount(addReview);
    component.find('#review-restaurant-input').at(1).simulate('change', { target: { value: 'restaurant' } });
    component.find('#review-menu-input').at(1).simulate('change', { target: { value: 'menu' } });
    component.find('#review-content-input').at(1).simulate('change', { target: { value: 'content' } });
    component.update();

    const wrapper = component.find('AddReview');
    expect(wrapper.state('restaurant')).toBe('restaurant');
    expect(wrapper.state('menu')).toBe('menu');
    expect(wrapper.state('content')).toBe('content');
  });

  it('loading message should be shown up', () => {
    const component = mount(addReview);
    const wrapper = component.find('AddReview');
    wrapper.setState({ ready: false });
    component.update();

    const backWrapper = component.find('.AddReviewLoading');
    expect(backWrapper.length).toBe(1);
  });

  it('error message should be shown up', () => {
    const component = mount(addReview);
    const wrapper = component.find('AddReview');
    wrapper.setState({ ready: false, error: { response: 'Error' } });
    component.update();

    const backWrapper = component.find('.AddReviewError');
    expect(backWrapper.length).toBe(1);
  });
});
