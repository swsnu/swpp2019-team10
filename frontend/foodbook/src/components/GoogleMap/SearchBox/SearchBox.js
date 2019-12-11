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
    const places = this.searchBox.getPlaces();
    if (places.length === 0) {
      return;
    }

    // Clear out the old markers.
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];

    // For each place, get the icon, name and location.
    const bounds = new mapApi.maps.LatLngBounds();
    places.forEach((place) => {
      const icon = {
        url: place.icon,
        size: new mapApi.maps.Size(71, 71),
        origin: new mapApi.maps.Point(0, 0),
        anchor: new mapApi.maps.Point(17, 34),
        scaledSize: new mapApi.maps.Size(25, 25),
      };

      // Create a marker for each place.

      const marker = new mapApi.maps.Marker({
        map,
        icon,
        title: place.name,
        position: place.geometry.location,
      });

      marker.addListener('click', () => console.log(place.place_id, place.name, marker.getPosition()));
      this.markers.push();

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

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
        placeholder="Enter a location"
      />
    );
  }
}

export default SearchBox;
