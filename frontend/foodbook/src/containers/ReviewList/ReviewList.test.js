import React from 'react';
import { mount } from 'enzyme';
import Axios from 'axios';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import ReviewList from './ReviewList';
// import * as actionCreators from 'store/actions/user/action_user';

const mockStore = getMockStore({}, {}, {});

jest.mock('../../components/ReviewPreview/ReviewPreview', () => jest.fn(() => (
  <div className="spyReview">
            this is mock
  </div>
)));

describe('ReviewList', () => {
  let reviewList;

  beforeEach(() => {
    reviewList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReviewList />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(reviewList);
    const wrapper = component.find('.ReviewList');
    expect(wrapper.length).toBe(1);
  });

  it('should render each review correctly', () => {
    const component = mount(reviewList);
    const wrapper = component.find('.spyReview');
    expect(wrapper.length).toBe(2);
  });

  it('should call onGetAll on loading', () => {
    const component = mount(reviewList);
    const listInstance = component.find(ReviewList.WrappedComponent).instance();
    listInstance.componentDidMount();
    const spyAll = jest.spyOn(Axios, 'get')
      .mockImplementation(() => {});
    expect(spyAll).toHaveBeenCalledTimes(1);
  });
});
