import React from 'react';
import { shallow } from 'enzyme';
import store, { history } from 'store/store';
import { Provider } from 'react-redux';
import AddReview from './AddReview';

describe('<AddReview />', () => {
  beforeEach(() => {
  });
  it('should render without crashing', () => {
    const component = shallow(
      <Provider store={store}>
        <AddReview history={history} />
      </Provider>,
    );
    const wrapper = component.find('Connect(AddReview)');
    expect(wrapper.length).toBe(1);
  });
});
