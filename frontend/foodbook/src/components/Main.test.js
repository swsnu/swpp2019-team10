import React from 'react';
import { shallow, mount } from 'enzyme';
import Main from './Main';

describe('<Main />', () => {
  it('should redner without crashing', () => {
    const component = shallow(<Main />);
    const wrapper = component.find('.main');
    expect(wrapper.length).toBe(1);
  });

  it('should render article(review)s correctly', () => {
    const component = mount(<Main />);
    const wrapper = component.find('.mock-article');
    expect(wrapper.length).toBe(10); // FIXME: should modified after implementing the reviewList.
  });

  it('should change state when view change menu are clicked', () => {
    const component = mount(<Main />);
    const wrapper = component.find('a').at(1);
    wrapper.simulate('click');
    const instance = component.find('Main').instance();
    expect(instance.state.activeItem).toEqual('calendar');
  });
});
