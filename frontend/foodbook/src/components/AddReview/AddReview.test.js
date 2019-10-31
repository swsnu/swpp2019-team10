import React from 'react';
import { shallow } from 'enzyme';
import { history } from 'store/store';
import AddReview from './AddReview';

describe('<AddReview />', () => {
  beforeEach(() => {
  });
  it('should render without crashing', () => {
    const component = shallow(<AddReview history={history} />);
    const wrapper = component.find('.AddReview');
    expect(wrapper.length).toBe(1);
  });
});
