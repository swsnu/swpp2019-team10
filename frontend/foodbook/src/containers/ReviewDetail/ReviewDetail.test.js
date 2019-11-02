
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

  describe('on author mode', () => {
    axios.get = jest.fn(() => {
      return new Promise(() => {
        const result = {
          status: 200, data: {title: 'asdf',
            content: 'asd',
            author_id: 1,
            name: 'Software Lover'}
        }
      })
    })

        
    axios.delete = jest.fn(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200, data: {title: 'asdf',
            content: 'asd',
            author_id: 1,
            name: 'Software Lover'}
        }
      })
    })

        
    axios.post = jest.fn(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200, data: {title: 'asdf',
            content: 'asd',
            author_id: 1,
            name: 'Software Lover'}
        }
      })
    })
    
    it('should render without errors', () => {
      const component = mount(<Provider store={store}>
                <ReviewDetail history={history} match={{params: {id: 1}}}/></Provider>);
      let wrapper = component.find('Connect(ArticleDetail)');
      expect(wrapper.length).toBe(1);
      const wrapper2 = component.find('#back-detail-article-button');
      wrapper2.simulate('click');
    });

    it('should be editable', () => {
      const component = mount(<Provider store={store}>
                <ArticleDetail id='detail' history={history} match={{params: {id: 1}}}/></Provider>);
      const wrapAD = component.find('#detail').at(1);
      wrapAD.setState({title: 'asdf',
        content: 'asd',
        author_id: 1,
        authorname: 'Software Lover'})
      const wrapper = component.find('#edit-article-button');
      wrapper.simulate('click');
    });

    it('should be deletable', () =>{
      const component = mount(<Provider store={store}>
                <ArticleDetail id='detail' history={history} match={{params: {id: 1}}}/></Provider>);
      const wrapAD = component.find('#detail').at(1);
      wrapAD.setState({title: 'asdf',
        content: 'asd',
        author_id: 1,
        authorname: 'Software Lover'})
      const wrapper = component.find('#delete-article-button');
      wrapper.simulate('click');
    });
  });

  describe('on non-author mode', () =>{
    axios.get = jest.fn(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200, data: {title: 'asdf',
            content: 'asd',
            author_id: 2,
            name: 'No u'}
        }
      })
    })
        
    it('should render without errors', () => {
      const component = mount(<Provider store={store}>
                <ReviewDetail history={history} match={{params: {id: 1}}}/></Provider>);
      let wrapper = component.find('Connect(ArticleDetail)');
      expect(wrapper.length).toBe(1);
      const wrapper2 = component.find('#back-detail-article-button');
      wrapper2.simulate('click');
    });
  })
    
});