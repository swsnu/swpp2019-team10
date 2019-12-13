import { Form } from 'semantic-ui-react';

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import GoogleMap from 'components/GoogleMap';

import ReviewPreview from 'components/ReviewPreview/';
// import * as actionCreators from 'store/actions/review/action_review';

const distance = (lat1, lng1, lat2, lng2) => {
  if ((lat1 === lat2) && (lng1 === lng2)) {
    return 0;
  }

  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lng1 - lng2;
  const radtheta = (Math.PI * theta) / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist *= 1.609344;
  return dist;
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
          // const onGetAll = this.props;
          // onGetAll(lng, lat);
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

    const { reviews /* , onGetAll */ } = this.props;
    const { lng, lat } = this.state;

    // onGetAll(lng, lat);

    const googleMap = (
      <Form.Field>
        <GoogleMap center={{ lat, lng }} getInfo={this.getInfo} marker draggable />
      </Form.Field>
    );

    let reviewsToRender = reviews;
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
        <div className="ui special cards fluid">
          <div className="card fluid" style={{ width: '630px' }}>
            <div className="content">
              <br />
              {reviewsToRender}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReviewLocation.propTypes = {
  reviews: propTypes.arrayOf(Object),
  // onGetAll: propTypes.func.isRequired,
};

ReviewLocation.defaultProps = {
  reviews: [{ id: 0, isMine: true }, { id: 1, isMine: false }],
};

const mapStateToProps = (state) => ({
  reviews: state.review.reviewList,
});

const mapDispatchToProps = (dispatch) => ({
  /*
  onGetAll: (lng, lat) => {
    dispatch(actionCreators.GET_REVIEW_LOCATION(lng, lat));
  },
  */
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewLocation));
