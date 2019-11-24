import React from 'react';
import { mount } from 'enzyme';
import GoogleMap from './GoogleMap';

describe('<GoogleMap />', () => {
  let googleMap;

  let places = [{
    geometry: {
      location: {
        lat: () => 0.0,
        lng: () => 0.0,
      },
    },
  }];

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

  it('has setPlace functioning correctly', () => {
    const component = mount(googleMap);
    const wrapper = component.find('GoogleMap');
    wrapper.at(0).instance().setPlace(places);

    expect(wrapper.at(0).state('places')).toBe(places);
  });

  it('has apiHasLoaded functioning correctly', () => {
    const component = mount(googleMap);
    const wrapper = component.find('GoogleMap');
    wrapper.at(0).instance().apiHasLoaded('map', 'maps');

    expect(wrapper.at(0).state('mapApiLoaded')).toBe(true);
    expect(wrapper.at(0).state('mapInstance')).toBe('map');
    expect(wrapper.at(0).state('mapApi')).toBe('maps');
  });
});
