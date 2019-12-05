import { Form } from 'semantic-ui-react';

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import GoogleMap from 'components/GoogleMap';

import ReviewPreview from 'components/ReviewPreview/';
import * as actionCreators from 'store/actions/review/action_review';

class ReviewLocation extends Component {
  constructor(props) {
    super(props);
    this.setState();
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const onGetAll = this.props;
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.setState({
            lat,
            lng,
          });
          onGetAll(lng, lat);
        },

        /* Error callback, default location to 0,0 */
        () => {
          this.setState({
            lat: 0,
            lng: 0,
          });
        },
      );
    }
  }

  getPos = (lat, lng) => {
    this.setState({
      lat,
      lng,
    });
  }

  render() {
    const ready = 'lat' in this.state && 'lng' in this.state;

    if (!ready) {
      return (
        <div className="review-location-loading">
          <p>Loading...</p>
        </div>
      );
    }

    const { reviews, dateString, onGetAll } = this.props;
    const { lng, lat } = this.state;

    onGetAll(lng, lat);

    const googleMap = (
      <Form.Field>
        <GoogleMap center={{ lat, lng }} search getPos={this.getPos} />
      </Form.Field>
    );

    let reviewsToRender = reviews;
    if (dateString) {
      reviewsToRender = reviewsToRender.filter((review) => review.date === dateString);
    }
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
  dateString: propTypes.string,
  reviews: propTypes.arrayOf(Object),
  onGetAll: propTypes.func.isRequired,
};

ReviewLocation.defaultProps = {
  dateString: undefined,
  reviews: [{ id: 0, isMine: true }, { id: 1, isMine: false }],
};

const mapStateToProps = (state) => ({
  reviews: state.review.reviewList,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAll: (lng, lat) => {
    dispatch(actionCreators.GET_REVIEW_LOCATION(lng, lat));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewLocation));
