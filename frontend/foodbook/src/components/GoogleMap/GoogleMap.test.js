import React from 'react';
import { mount } from 'enzyme';
import GoogleMap from './GoogleMap';

describe('<GoogleMap />', () => {
  let googleMap;
  let googleMapMarker;
  let googleMapDraggable;
  let googleMapRestaurants;
  const mapApi = {
    Marker: jest.fn(() => ({
      addListener: jest.fn(),
      setMap: jest.fn(),
    })),
    LatLngBounds: jest.fn(() => ({
      union: jest.fn(),
      extend: jest.fn(),
    })),
    Size: jest.fn(),
    Point: jest.fn(),
    places: {
      SearchBox: jest.fn(() => ({
        addListener: jest.fn(),
        bindTo: jest.fn(),
        getPlaces: jest.fn(),
      })),
    },
    event: {
      clearInstanceListeners: jest.fn(),
    },
  };

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

  const stubRestaurants = [
    {
      name: 'REST_1',
      latitude: 1,
      longitude: 1,
    },
    {
      name: 'REST_2',
      latitude: 2,
      longitude: 2,
    },
    {
      name: 'REST_3',
      latitude: 3,
      longitude: 3,
    },
  ];

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
    googleMapRestaurants = (
      <GoogleMap center={{ lat: 0.0, lng: 0.0 }} marker restaurants={stubRestaurants} />
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
    const component = mount(googleMapDraggable);
    const wrapper = component.find('GoogleMap');
    wrapper.at(0).instance().apiHasLoaded('map', mapApi);

    expect(wrapper.at(0).state('mapApiLoaded')).toBe(true);
    expect(wrapper.at(0).state('mapInstance')).toBe('map');
    expect(wrapper.at(0).state('mapApi')).toBe(mapApi);
  });

  it('have 3 markers', () => {
    const component = mount(googleMapRestaurants);
    const wrapper = component.find('GoogleMap');
    wrapper.at(0).instance().apiHasLoaded('map', mapApi);
    expect(wrapper.at(0).instance().markers.length).toBe(3);
  });
});
