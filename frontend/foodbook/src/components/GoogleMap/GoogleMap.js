// https://github.com/google-map-react/google-map-react-examples

import ApiKey from 'ApiKey';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import SearchBox from './SearchBox';

class GoogleMap extends Component {
  markers = [];

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
    const { search, marker, draggable } = this.props;

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
        scaledSize: new mapApi.Size(25, 25),
      };

      // Create a marker for each place.

      const markerDict = {
        map: mapInstance,
        icon,
        title: '',
        position: location,
      };

      if (draggable) markerDict.draggable = true;

      const amarker = new mapApi.Marker(markerDict);
      amarker.addListener('dragend', (evt) => {
        // Clear out the old markers.
        this.markers.forEach((onemarker) => onemarker.setMap(null));
        this.markers = [];

        this.setState({
          center: {
            lat: evt.latLng.lat(),
            lng: evt.latLng.lng(),
          },
        });
      });
      this.markers.push(amarker);
    }

    return (
      <div style={this.style}>
        {search && mapApiLoaded
          && <SearchBox map={mapInstance} mapApi={mapApi} setplace={this.setPlace} />}
        <GoogleMapReact
          bootstrapURLKeys={{ key: ApiKey.googleApiKey, libraries: ['places', 'geometry'] }}
          defaultCenter={center}
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
};

export default GoogleMap;
