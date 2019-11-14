// https://github.com/google-map-react/google-map-react-examples

import ApiKey from 'ApiKey';
import { Icon } from 'semantic-ui-react';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import SearchBox from './SearchBox';

const Marker = () => <div><Icon color="yellow" name="hand point down outline" size="huge" /></div>;

class GoogleMap extends Component {
  // Important! Always set the container height explicitly
  style = { height: '50vh', width: '100%' }

  constructor(props) {
    super(props);
    const { center, zoom } = props;
    this.getGeoLocation();
    this.state = {
      center,
      zoom,
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
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
    this.setState({ places: place });
  };

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
      );
    }
  }

  render() {
    const {
      places,
      mapApiLoaded,
      mapInstance,
      mapApi,
      center,
      zoom,
    } = this.state;
    return (
      <div style={this.style}>
        {mapApiLoaded && <SearchBox map={mapInstance} mapApi={mapApi} setplace={this.setPlace} />}
        <GoogleMapReact
          bootstrapURLKeys={{ key: ApiKey.googleApiKey, libraries: ['places', 'geometry'] }}
          defaultCenter={center}
          defaultZoom={zoom}
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          {Array.isArray(places) && places.length > 0
            && places.map((place) => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
              />
            ))}
        </GoogleMapReact>
      </div>
    );
  }
}

GoogleMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
};

GoogleMap.defaultProps = {
  center: {
    lat: 37.450084,
    lng: 126.952459,
  },
  zoom: 17,
};

export default GoogleMap;
