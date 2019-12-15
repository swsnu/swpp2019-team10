import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
import Main from './Main';

const initialUser = {
  user: {
    username: '',
    phone_number: '',
    age: -1,
    gender: '',
    number_of_reviews: -1,
    number_of_friends: -1,
    failed: false,
    taste: {},
  },
};

const mockStore = getMockStore(initialUser, { reviewList: [] }, {});

jest.mock('components/Layouts/Feed/Feed', () => jest.fn(() => (
  <div className="mockReviewList">
            this is mock
  </div>
)));

jest.mock('containers/FriendList/FriendList', () => jest.fn(() => (
  <div className="mockFriendList">
            this is mock
  </div>
)));

jest.mock('components/RawCalendar/RawCalendar', () => jest.fn(() => (
  <div className="mockRawCalendar">
            this is mock
  </div>
)));

jest.mock('containers/FriendSearch/FriendSearch', () => jest.fn(() => (
  <div className="mockFriendSearch">
            this is mock
  </div>
)));

jest.mock('containers/Myinfo/Myinfo', () => jest.fn(() => (
  <div />
)));

describe('main', () => {
  let main;

  beforeEach(() => {
    main = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Main
            history={history}
            match={{
              params: { id: undefined }, isExact: true, path: '', url: '',
            }}
          />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const component = mount(main);
    const wrapper = component.find('.main');
    expect(wrapper.length).toBe(1);
  });

  it('should render without crashing when friend main', () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Main
            history={history}
            match={{
              params: { id: '2' }, isExact: true, path: '', url: '',
            }}
          />
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find('.main');
    expect(wrapper.length).toBe(1);
  });

  it('should change view well', () => {
    const component = mount(main);

    const wrapperButton = component.find('DropdownMenu').at(0);
    const wrapperFeed = component.find('DropdownItem').at(0);
    const wrapperLocation = component.find('DropdownItem').at(1);
    const wrapperCalendar = component.find('DropdownItem').at(2);
    const wrapperCategory = component.find('DropdownItem').at(3);

    const instance = component.find(Main).instance();

    wrapperButton.simulate('click');
    wrapperCalendar.simulate('click');
    instance.forceUpdate();
    expect(component.find('.calendar').length).not.toBe(0);

    wrapperButton.simulate('click');
    wrapperFeed.simulate('click');
    instance.forceUpdate();
    expect(component.find('.feed').length).not.toBe(0);

    wrapperButton.simulate('click');
    wrapperCategory.simulate('click');
    instance.forceUpdate();
    expect(component.find('.category').length).not.toBe(0);

    wrapperButton.simulate('click');
    wrapperLocation.simulate('click');
    instance.forceUpdate();
    // expect(component.find('.location').length).not.toBe(0); TODO: implement location
  });
});
