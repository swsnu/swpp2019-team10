
import React from 'react';
import { shallow, mount } from 'enzyme';
import ReviewDetail from './ReviewDetail';
import axios from 'axios';

import { Provider } from 'react-redux';
// import { connectRouter, ConnectedRouter } from 'connected-react-router';
// import { Route, Redirect, Switch } from 'react-router-dom';

import store, { history } from '../../store/store';

import { getMockStore } from '../../test-utils/mock';

// https://jestjs.io/docs/en/mock-functions.html
jest.mock('axios');

describe('<ReviewDetail />', () => {
  const initialState = {

  };
    
  const store = getMockStore(initialState);

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

  describe('on author mode', () => {
    it('should render without errors', () => {
      const component = mount(<Provider store={store}>
        <ReviewDetail history={history} match={{params: {id: 1}}}/></Provider>);
      const wrapper = component.find('Connect(ReviewDetail)');
      expect(wrapper.length).toBe(1);
      const wrapper2 = component.find('#back-review-button');
      wrapper2.simulate('click');
    });

    it('should be editable', () => {
      const component = mount(<Provider store={store}>
        <Review id='detail' history={history} match={{params: {id: 1}}}/></Provider>);
      const wrapAD = component.find('#detail').at(1);
      // set user to author of the article
      const wrapper = component.find('#edit-article-button');
      wrapper.simulate('click');
    });

    it('should be deletable', () =>{
      const component = mount(<Provider store={store}>
        <ArticleDetail id='detail' history={history} match={{params: {id: 1}}}/></Provider>);
      const wrapAD = component.find('#detail').at(1);
      // set user to author of the article
      const wrapper = component.find('#delete-article-button');
      wrapper.simulate('click');
    });
  });
);