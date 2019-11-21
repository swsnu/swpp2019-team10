import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import SignupModal from './SignupModal';

const initialUser = {
  user: {
    username: '',
    phone_number: '',
    age: -1,
    gender: '',
    profile_pic: '',
    number_of_reviews: -1,
    number_of_friends: -1,
    failed: false,
  },

  taste: {},
};

const store = getMockStore(initialUser, {}, {});

describe('<Login />', () => {
  let signupModal;
  let component;

  beforeEach(() => {
    signupModal = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <SignupModal history={history} fixed={false} />
        </ConnectedRouter>
      </Provider>
    );

    component = mount(signupModal);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing when not fixed', () => {
    const wrapper = component.find('.signup-modal');
    expect(wrapper.length).toBe(1);
  });

  it('should render without crashing when fixed', () => {
    const unfixedSignupModal = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <SignupModal history={history} fixed />
        </ConnectedRouter>
      </Provider>
    );
    const fixed = mount(unfixedSignupModal);
    const wrapper = fixed.find('.signup-modal');
    expect(wrapper.length).toBe(1);
  });
});
