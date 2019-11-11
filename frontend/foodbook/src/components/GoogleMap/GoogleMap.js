// https://github.com/google-map-react/google-map-react-examples

import ApiKey from 'ApiKey';
import { Icon } from 'semantic-ui-react';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import PropTypes from 'prop-types';

const Marker = ({ icon }) => <div><Icon name={icon} /></div>;

Marker.propTypes = {
  icon: PropTypes.string,
};

Marker.defaultProps = {
  icon: '',
};

class GoogleMap extends Component {
  // Important! Always set the container height explicitly
  style = { height: '50vh', width: '100%' }

  constructor(props) {
    super(props);
    const { center, zoom } = props;
    this.state = {
      center,
      marker: center,
      zoom,
    };
  }

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
    const { center, zoom, marker } = this.state;
    return (
      <div style={this.style}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: ApiKey.googleApiKey }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={marker.lat}
            lng={marker.lng}
            icon="hand point down outline"
          />
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
