import React from 'react';
import { mount } from 'enzyme';
import GoogleMap from './GoogleMap';

describe('<GoogleMap />', () => {
  let googleMap;

  beforeEach(() => {
    googleMap = (
      <GoogleMap />
    );
  });

  it('should render without crashing', () => {
    const component = mount(googleMap);
    const wrapper = component.find('GoogleMap');
    expect(wrapper.length).toBe(2);
  });
});
