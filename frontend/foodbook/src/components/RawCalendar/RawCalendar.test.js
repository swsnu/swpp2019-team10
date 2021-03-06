import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import Calendar from './RawCalendar';

// import * as actionCreators from 'store/actions/user/action_user';

const mockStore = getMockStore({}, {}, {});

jest.mock('components/Layouts/Feed/Feed', () => jest.fn(() => (
  <div className="mockReviewList">
            this is mock
  </div>
)));

describe('Calendar', () => {
  let calendar;
  beforeEach(() => {
    calendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Calendar tileDisabled={() => false} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const mockCDM = jest.spyOn(Calendar.prototype, 'componentDidMount').mockImplementation(() => {});
    const component = mount(calendar, { lifecycleExperimental: true });
    const wrapper = component.find('.RawCalendar');
    expect(wrapper.length).toBe(1);
    expect(mockCDM).toHaveBeenCalledTimes(1);
  });

  it('should change date when clicked', () => {
    const component = mount(calendar);
    const wrapper = component.find('.react-calendar__tile').at(0);
    wrapper.simulate('click');
    expect(wrapper.length).toBe(1);
  });
});
