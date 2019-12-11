import React from 'react';
import { mount } from 'enzyme';
import SearchBox from './SearchBox';

describe('<SearchBox />', () => {
  let searchBox;

  let setPlace = null;

  let getPlaces = null;

  const geoViewPlace = {
    types: ['restaurant'],
    geometry: {
      location: { lat: 0.0, lng: 0.0 },
      viewport: true,
    },
  };

  const geoDefaultPlace = {
    types: ['food'],
    geometry: {
      location: { lat: 0.0, lng: 0.0 },
    },
  };

  beforeEach(() => {
    const mapInstance = {
      fitBounds: jest.fn(),
      setCenter: jest.fn(),
      setZoom: jest.fn(),
    };

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
          getPlaces: () => getPlaces(),
        })),
      },
      event: {
        clearInstanceListeners: jest.fn(),
      },
    };
    setPlace = jest.fn();

    searchBox = (
      <SearchBox map={mapInstance} mapApi={mapApi} setplace={setPlace} />
    );
  });

  it('should render without crashing', () => {
    const component = mount(searchBox);
    const wrapper = component.find('SearchBox');
    expect(wrapper.length).toBe(1);
    component.unmount();
  });

  it('should have clearSearchBox functioning', () => {
    const component = mount(searchBox);
    const wrapper = component.find('SearchBox');
    wrapper.instance().searchInput.value = 'test';
    wrapper.instance().clearSearchBox();
    expect(wrapper.instance().searchInput.value).toBe('');
  });

  it('should have onPlacesChanged functioning', () => {
    const component = mount(searchBox);
    const wrapper = component.find('SearchBox');

    getPlaces = jest.fn().mockImplementation(() => ([geoViewPlace]));
    wrapper.instance().onPlacesChanged();

    getPlaces = jest.fn().mockImplementation(() => ([geoDefaultPlace]));
    wrapper.instance().onPlacesChanged();
    // expect(setPlace).toHaveBeenCalledTimes(1);
  });
});
