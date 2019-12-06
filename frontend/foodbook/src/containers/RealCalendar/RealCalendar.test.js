import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import RealCalendar from './RealCalendar';


jest.mock('../../components/RawCalendar/RawCalendar', () => jest.fn((props) => (
  <div className="RawCalendar">
    {props.tileDisabled({ date: new Date('December 17, 1995 03:24:00') }) ? 'disable' : 'able'}
  </div>
)));

const initialReview = {
  reviewList: [{
    id: 1,
    restaurant: 'TEST_R',
    menu: 'TEST_M',
    rating: 5,
    date: '1995-12-17',
    image: undefined,
    tag: [],
  }],

  reviewDetail: {},
};

const initialDisableReview = {
  reviewList: [{
    id: 1,
    restaurant: 'TEST_R',
    menu: 'TEST_M',
    rating: 5,
    date: '2019-12-08',
    image: undefined,
    tag: [],
  }],

  reviewDetail: {},
};
const enableStore = getMockStore({}, initialReview, {});
const disableStore = getMockStore({}, initialDisableReview, {});

describe('<Realcalendar />', () => {
  let enRealcal;
  let disRealcal;
  beforeEach(() => {
    enRealcal = (
      <Provider store={enableStore}>
        <ConnectedRouter history={history}>
          <RealCalendar />
        </ConnectedRouter>
      </Provider>
    );
    disRealcal = (
      <Provider store={disableStore}>
        <ConnectedRouter history={history}>
          <RealCalendar />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be disabled', () => {
    const component = mount(disRealcal);
    const wrapper = component.find('.RawCalendar');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('disable');
  });

  it('should not be disabled', () => {
    const component = mount(enRealcal);
    const wrapper = component.find('.RawCalendar');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('able');
  });
});
