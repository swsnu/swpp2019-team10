import React from 'react';
import { shallow } from 'enzyme';
import { history } from 'store/store';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import App from './App';

const loggedOutUser = {
  user: {
    username: '',
    phone_number: '',
    age: -1,
    gender: '',
    number_of_reviews: -1,
    number_of_friends: -1,
    failed: false,
  }, // stores login information

  taste: {
    // TODO: implement this!
  },

  search: undefined,
  logged_in: false,
};

const loggedInUser = {
  user: {
    username: '',
    phone_number: '',
    age: -1,
    gender: '',
    number_of_reviews: -1,
    number_of_friends: -1,
    failed: false,
  }, // stores login information

  taste: {
    // TODO: implement this!
  },

  search: undefined,
  logged_in: true,
};

const loggedInStore = getMockStore(loggedInUser, {}, {});
const loggedOutStore = getMockStore(loggedOutUser, {}, {});

describe('<App />', () => {
  let loggedInApp;
  let loggedOutApp;

  beforeEach(() => {
    loggedInApp = (
      <Provider store={loggedInStore}>
        <App history={history} />
      </Provider>
    );

    loggedOutApp = (
      <Provider store={loggedOutStore}>
        <App history={history} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing when logged in', () => {
    const component = shallow(loggedInApp);
    const wrapper = component.find(App);
    expect(wrapper.length).toBe(1);
  });

  it('should render without crashing when logged out', () => {
    const component = shallow(loggedOutApp);
    const wrapper = component.find(App);
    expect(wrapper.length).toBe(1);
  });
});
