import React from 'react';
import { mount } from 'enzyme';
import GoogleMap from './GoogleMap';

describe('<GoogleMap />', () => {
  let googleMap;
  let googleMapMarker;
  let googleMapDraggable;

  const places = {
    place_id: 'id',
    id: 1,
    name: 'restaurant',
    geometry: {
      location: {
        lat: () => 0.0,
        lng: () => 0.0,
      },
    },
  };

  beforeEach(() => {
    googleMap = (
      <GoogleMap />
    );
    googleMapMarker = (
      <GoogleMap center={{ lat: 0.0, lng: 0.0 }} marker />
    );
    googleMapDraggable = (
      <GoogleMap center={{ lat: 0.0, lng: 0.0 }} marker draggable />
    );
  });

  it('should render without crashing', () => {
    const component = mount(googleMap);
    const wrapper = component.find('GoogleMap');
    expect(wrapper.length).toBe(2);
  });

  it('should render without crashing with marker', () => {
    const component = mount(googleMapMarker);
    const wrapper = component.find('GoogleMap');
    expect(wrapper.length).toBe(2);
  });

  it('should render without crashing with draggable marker', () => {
    const component = mount(googleMapDraggable);
    const wrapper = component.find('GoogleMap');
    expect(wrapper.length).toBe(2);
  });

  it('has setPlace functioning correctly', () => {
    const component = mount(googleMap);
    const wrapper = component.find('GoogleMap');
    wrapper.at(0).instance().setPlace(places);
    // add test with jest fn getInfo
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
