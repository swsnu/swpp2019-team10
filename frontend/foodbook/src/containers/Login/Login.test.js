import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
// import * as actionCreators from 'store/actions/user/action_user';

import Login from './Login';

const stubInitState = {
  info: {
    id: '',
    username: '',
    login: false,
    friendCount: 0,
    writeCount: 0,
  }, // stores login information

  taste: {
    // TODO: implement this!
  },
};

const mockStore = getMockStore(stubInitState, {}, {});

describe('<Login />', () => {
  let login;

  beforeEach(() => {
    login = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Login />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const component = mount(login);
    const wrapper = component.find('.login');
    expect(wrapper.length).toBe(1);
  });

  it('should call loginHandler function', () => {
    const component = mount(login);
    const wrapper = component.find('Button');
    const spy = jest.spyOn(history, 'push')
      .mockImplementation(() => {});
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
