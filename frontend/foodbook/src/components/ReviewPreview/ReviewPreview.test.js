import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import ReviewPreview from './ReviewPreview';
// import * as actionCreators from 'store/actions/user/action_user';

const mockStore = getMockStore({}, {}, {});

describe('ReviewPreview', () => {
  let reviewPreview;
  let reviewPreviewFriend;
  const tagList = [{ name: 'good', sentimental: 1 }, { name: 'bad', sentimental: -1 }, { name: 'netural', sentimental: 0 }];
  const posTag = [tagList[0]];
  const negTag = [tagList[1]];
  const neuTag = [tagList[2]];

  beforeEach(() => {
    reviewPreview = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReviewPreview id={0} tag={posTag} isMine />
          <ReviewPreview id={1} tag={negTag} isMine />
          <ReviewPreview id={2} tag={neuTag} isMine />
        </ConnectedRouter>
      </Provider>
    );

    reviewPreviewFriend = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReviewPreview id={0} tag={posTag} isMine={false} />
          <ReviewPreview id={1} tag={negTag} isMine={false} />
          <ReviewPreview id={2} tag={neuTag} isMine={false} />
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
    expect(wrapper.length).not.toBe(0);
  });

  it('should render detail link when author is me', () => {
    const component = mount(reviewPreview);
    const wrapper = component.find('ReviewDetail');
    expect(wrapper.length).toBe(3);
  });

  it('should render author name when author is friend', () => {
    const component = mount(reviewPreviewFriend);
    const wrapper = component.find('.author-wrapper');
    expect(wrapper.length).toBe(3);
  });
});
