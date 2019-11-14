// https://github.com/google-map-react/google-map-react-examples

import ApiKey from 'ApiKey';
import { Icon } from 'semantic-ui-react';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import SearchBox from './SearchBox';

const Marker = () => <div><Icon color="yellow" name="hand point down outline" size="huge" /></div>;

class GoogleMap extends Component {
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

  render() {
    const {
      places,
      mapApiLoaded,
      mapInstance,
      mapApi,
      center,
      zoom,
    } = this.state;

    const { search } = this.props;

    return (
      <div style={this.style}>
        {search && mapApiLoaded
          && <SearchBox map={mapInstance} mapApi={mapApi} setplace={this.setPlace} />}
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
  height: PropTypes.string,
  width: PropTypes.string,
  zoom: PropTypes.number,
  search: PropTypes.bool,
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
};

export default GoogleMap;
