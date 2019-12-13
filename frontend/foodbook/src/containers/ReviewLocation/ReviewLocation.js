import { Form, Card } from 'semantic-ui-react';

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import GoogleMap from 'components/GoogleMap';

import ReviewPreview from 'components/ReviewPreview/';

// calculate distance in kilometers from latitudes and longitudes
const getDistance = (lat1, lng1, lat2, lng2) => {
  const deg2rad = (deg) => deg * (Math.PI / 180);

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const stdDistance = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const angle = Math.atan2(Math.sqrt(stdDistance), Math.sqrt(1 - stdDistance));
  const distance = R * angle * 2;

  return distance;
};

class ReviewLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { ready: false };
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.setState({
            lat,
            lng,
            ready: true,
          });
        },

        /* Error callback, default location to 0,0 */
        () => {
          this.setState({
            lat: 0,
            lng: 0,
            ready: true,
          });
        },
      );
    }
  }

  getInfo = (placeid, restaurant, lat, lng) => {
    this.setState({
      lat,
      lng,
    });
  }

  render() {
    const { ready } = this.state;

    if (!ready) {
      return (
        <div className="review-location-loading">
          <p>Loading...</p>
        </div>
      );
    }

    const { reviews } = this.props;
    const { lng, lat } = this.state;

    const googleMap = (
      <Form.Field>
        <GoogleMap center={{ lat, lng }} getInfo={this.getInfo} marker draggable />
      </Form.Field>
    );

    let reviewsToRender = reviews.filter((review) => getDistance(review.latitude, review.longitude, lng, lat) <= 1.0);
    reviewsToRender = reviewsToRender.map((review) => (
      <ReviewPreview
        key={`${review.id}`}
        id={review.id}
        author={review.author}
        restaurant={review.restaurant}
        menu={review.menu}
        content={review.content}
        image={review.image}
        rating={review.rating}
        date={review.date}
        tag={review.tag}
        isMine={review.isMine}
      />
    ));

    return (
      <div className="ReviewLocation">
        {googleMap}
        <Card.Group itemsPerRow={5} className="feed">
          {reviewsToRender}
        </Card.Group>
      </div>
    );
  }
}

ReviewLocation.propTypes = {
  reviews: propTypes.arrayOf(Object),
};

ReviewLocation.defaultProps = {
  reviews: [],
};

const mapStateToProps = (state) => ({
  reviews: state.review.reviewList,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewLocation));
