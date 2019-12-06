import ApiKey from 'ApiKey';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import InfoWindow from 'google-map-react';
import Marker from 'google-map-react';
import PropTypes from 'prop-types';

import SearchBox from './SearchBox';

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
      selected: null,
    };

    // this.setPlace = this.setPlace.bind(this);
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

  clickEvent = (place) => {
    this.setState({ selected: place });
    const { getPos } = this.props;
    getPos(place.geometry.location.lat(), place.geometry.location.lng());
  };

  closeEvent = () => {
    this.setState({ selected: null });
  }

  render() {
    const {
      places,
      mapApiLoaded,
      mapInstance,
      mapApi,
      center,
      zoom,
      selected,
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
                position={{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }}
                onClick={() => {
                  this.closeEvent();
                }}
                icon={{
                  url: `https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png`,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
              />
            ))}
          {selected && (
            <InfoWindow
              onCloseClick={() => {
                this.setState({ selected: null });
              }}
              position={{
                lat: selected.geometry.coordinates[1],
                lng: selected.geometry.coordinates[0],
              }}
            >
              <div>
                <h2>{selected.properties.NAME}</h2>
                <p>{selected.properties.DESCRIPTIO}</p>
              </div>
            </InfoWindow>
          )}
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
  getPos: PropTypes.func,
  selected: PropTypes.shape({ }),
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
  getPos: () => {},
  selected: null,
};

export default GoogleMap;
