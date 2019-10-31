import React from 'react';
import { shallow } from 'enzyme';
import { history } from 'store/store';
import Login from './Login';

describe('<Login />', () => {
  beforeEach(() => {
  });

  it('should render without crashing', () => {
    const component = shallow(<Login history={history} />);
    const wrapper = component.find('.login');
    expect(wrapper.length).toBe(1);
  });

  it('should call loginHandler function', () => {
    const component = shallow(<Login history={history} />);
    const wrapper = component.find('#login-button');
    const spy = jest.spyOn(history, 'push')
      .mockImplementation(() => {});
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
