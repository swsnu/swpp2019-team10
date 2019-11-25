import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';
// import * as actionCreators from 'store/actions/user/action_user';

import App from '.';

const mockStore = getMockStore({}, {}, {});

describe('<Login />', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const component = mount(app);
    const wrapper = component.find('.App');
    expect(wrapper.length).toBe(1);
  });
});
