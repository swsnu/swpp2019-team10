import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import ReviewPreview from './ReivewPreview';
// import * as actionCreators from 'store/actions/user/action_user';

const mockStore = getMockStore({}, {}, {});

describe('ReviewPreview', () => {
  let reviewPreview;
  const name = 'a';
  const tag = [{ name: '1', positive: true }];
  const rating = 1;
  const imgUrl = '1';

  beforeEach(() => {
    reviewPreview = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReviewPreview name={name} tag={tag} rating={rating} imgUrl={imgUrl} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crash', () => {
    const component = mount(reviewPreview);
    const wrapper = component.find('.review-preview');
    expect(wrapper.length).toBe(1);
  });

  // FIXME: how to mock parseTagName.
});
