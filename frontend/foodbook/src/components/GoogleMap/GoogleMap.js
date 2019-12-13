// https://github.com/google-map-react/google-map-react-examples

import ApiKey from 'ApiKey';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import SearchBox from './SearchBox';

class GoogleMap extends Component {
  markers = [];
  posMarker = null;

  constructor(props) {
    super(props);

    const {
      center, zoom, height, width,
    } = props;

    this.style = { height, width };

    this.state = {
      center,
      zoom,
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
    };
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  setPlace = (place) => {
    const { getInfo } = this.props;
    getInfo(
      place.place_id,
      place.name,
      place.geometry.location.lat(),
      place.geometry.location.lng(),
    );
  };

  render() {
    const {
      mapApiLoaded,
      mapInstance,
      mapApi,
      center,
      zoom,
    } = this.state;

    // eslint-disable-next-line no-unused-vars
    const {
      search, marker, draggable, restaurants,
    } = this.props;

    const location = {
      lat: center.lat,
      lng: center.lng,
    };

    if (marker && mapApiLoaded) {
      const icon = {
        url: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
        size: new mapApi.Size(71, 71),
        origin: new mapApi.Point(0, 0),
        anchor: new mapApi.Point(17, 34),
        scaledSize: new mapApi.Size(40, 40),
      };

      // Create a marker for current position
      const markerDict = {
        map: mapInstance,
        icon,
        title: '',
        position: { lat: location.lat, lng: location.lng },
      };
      if (draggable) markerDict.draggable = true;

      const { getInfo } = this.props;

      const currMarker = new mapApi.Marker(markerDict);

      if (this.posMarker !== null) this.posMarker.setMap(null);
      if (draggable) {
        currMarker.addListener('dragend', (evt) => {
          // Clear out the old markers.
          const lat = evt.latLng.lat();
          const lng = evt.latLng.lng();
          this.setState({
            center: {
              lat,
              lng,
            },
          });
          getInfo('', '', lat, lng);
        });
      }
      this.posMarker = currMarker;
    }
    if (restaurants.length !== 0 && mapApiLoaded) {
      restaurants.forEach((restaurant) => {
        const icon = {
          url: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
          size: new mapApi.Size(71, 71),
          origin: new mapApi.Point(0, 0),
          anchor: new mapApi.Point(17, 34),
          scaledSize: new mapApi.Size(20, 20),
        };

        // Create a marker for each place.
        const markerDict = {
          map: mapInstance,
          icon,
          title: restaurant.name,
          position: { lat: restaurant.latitude, lng: restaurant.longitude },
        };

        this.markers.push(new mapApi.Marker(markerDict));
      });
    }

    return (
      <div style={this.style}>
        {search && mapApiLoaded
          && <SearchBox map={mapInstance} mapApi={mapApi} setplace={this.setPlace} />}
        <GoogleMapReact
          bootstrapURLKeys={{ key: ApiKey.googleApiKey, libraries: ['places', 'geometry'] }}
          center={center}
          defaultZoom={zoom}
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        />
      </div>
    );
  }
}

GoogleMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  height: PropTypes.string,
  width: PropTypes.string,
  zoom: PropTypes.number,
  search: PropTypes.bool,
  marker: PropTypes.bool,
  draggable: PropTypes.bool,
  getInfo: PropTypes.func,
  restaurants: PropTypes.arrayOf(Object),
};

GoogleMap.defaultProps = {
  center: {
    lat: 37.450084,
    lng: 126.952459,
  },
  height: '50vh',
  width: '100%',
  zoom: 17,
  search: false,
  marker: false,
  draggable: false,
  getInfo: () => {},
  restaurants: [],
};

export default GoogleMap;
