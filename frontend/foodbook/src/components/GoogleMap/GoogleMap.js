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
  style = { height: '50vh', width: '100%' }

  render() {
    const { center, zoom } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={this.style}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: ApiKey.googleApiKey }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={37.450084}
            lng={126.952459}
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
