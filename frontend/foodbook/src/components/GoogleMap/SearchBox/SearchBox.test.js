import React from 'react';
import { mount } from 'enzyme';
import SearchBox from './SearchBox';

describe('<SearchBox />', () => {
  let searchBox;

  beforeEach(() => {
    const geoFalsePlace = {};
    const geoViewPlace = {
      geometry: {
        viewPort: true,
      },
    };
    const geoDefaultPlace = {
      geometry: {
        location: { lat: 0.0, lng: 0.0 },
      },
    };

    const mapInstance = {
      fitBounds: jest.fn(),
      setCenter: jest.fn(),
      setZoom: jest.fn(),
    };

    const mapApi = {
      places: {
        SearchBox: () => ({
          addListener: jest.fn(),
          bindTo: jest.fn(),
          getPlaces: jest.fn().mockImplementation(
            () => ([geoFalsePlace, geoViewPlace, geoDefaultPlace]),
          ),
        }),
      },
      event: {
        clearInstanceListeners: jest.fn(),
      },
    };
    const setPlace = jest.fn();

    searchBox = (
      <SearchBox map={mapInstance} mapApi={mapApi} setplace={setPlace} />
    );
  });

  it('should render without crashing', () => {
    const component = mount(searchBox);
    const wrapper = component.find('SearchBox');
    expect(wrapper.length).toBe(2);
  });
});
