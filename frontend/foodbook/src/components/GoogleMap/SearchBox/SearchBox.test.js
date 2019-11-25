import React from 'react';
import { mount } from 'enzyme';
import SearchBox from './SearchBox';

describe('<SearchBox />', () => {
  let searchBox;

  let setPlace = null;

  let getPlaces = null;
  const geoFalsePlace = {};
  const geoViewPlace = {
    geometry: {
      viewport: true,
    },
  };

  const geoDefaultPlace = {
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

    getPlaces = jest.fn().mockImplementation(() => ([geoFalsePlace]));
    wrapper.instance().onPlacesChanged();
    expect(getPlaces).toHaveBeenCalledTimes(1);

    getPlaces = jest.fn().mockImplementation(() => ([geoViewPlace]));
    wrapper.instance().onPlacesChanged();

    getPlaces = jest.fn().mockImplementation(() => ([geoDefaultPlace]));
    wrapper.instance().onPlacesChanged();
    expect(setPlace).toHaveBeenCalledTimes(2);
  });
});
