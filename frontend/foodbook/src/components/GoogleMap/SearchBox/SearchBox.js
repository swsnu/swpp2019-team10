// https://github.com/google-map-react/google-map-react-examples/blob/master/src/components/SearchBox.js

import React, { Component } from 'react';

class SearchBox extends Component {
  markers = [];

  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  componentDidMount({ map, mapApi } = this.props) {
    this.searchBox = new mapApi.places.SearchBox(this.searchInput);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
    this.searchBox.bindTo('bounds', map);
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  onPlacesChanged = ({ map, setplace, mapApi } = this.props) => {
    let places = this.searchBox.getPlaces();
    places = places.filter((place) => 'types' in place && ((place.types.includes('restaurant') || place.types.includes('food'))));

    if (places.length === 0) {
      return;
    }

    // Clear out the old markers.
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];

    // For each place, get the icon, name and location.
    const bounds = new mapApi.LatLngBounds();
    places.forEach((place) => {
      const icon = {
        url: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
        size: new mapApi.Size(71, 71),
        origin: new mapApi.Point(0, 0),
        anchor: new mapApi.Point(17, 34),
        scaledSize: new mapApi.Size(25, 25),
      };

      // Create a marker for each place.
      const marker = new mapApi.Marker({
        map,
        icon,
        title: place.name,
        position: place.geometry.location,
      });

      marker.addListener('click', () => setplace(place));
      this.markers.push(marker);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    this.searchInput.blur();
  };

  clearSearchBox() {
    this.searchInput.value = '';
  }

  render() {
    return (
      <input
        ref={(ref) => {
          this.searchInput = ref;
        }}
        type="text"
        onFocus={this.clearSearchBox}
        placeholder="Enter restaurant name"
      />
    );
  }
}

export default SearchBox;
