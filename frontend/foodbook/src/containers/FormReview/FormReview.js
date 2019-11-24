// Review Add, Edit form.
// "mode" is passed as props. "ADD", "EDIT"
// "id" is passed as props. Only used for "EDIT" mode.

import {
  Rating,
  TextArea,
  Button,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import './FormReview.css';
import GoogleMap from 'components/GoogleMap';

import { connect } from 'react-redux';
import ImageSelectPreview from 'react-image-select-pv';
import * as actionCreators from 'store/actions/review/action_review';

class FormReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* open is variable for modal component,
        currently it's undecided if this will be converted to modal so it's left unused. */
      open: false,
    };
  }

  componentDidMount() {
    this.getGeoLocation();
    const { mode, id, onGetReview } = this.props;

    if (mode === 'ADD') {
      this.setState({
        restaurant: '',
        menu: '',
        content: '',
        rating: 0,
        longitude: 0.0,
        latitude: 0.0,
        image: null,
        error: null,
      });
    } else if (mode === 'EDIT') {
      onGetReview(id);
    } else {
      this.setState({
        error: 'Unknown Form Type',
      });
    }
  }

  show = () => () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  editContentHandler = () => {
    const {
      restaurant,
      menu,
      content,
      rating,
      longitude,
      latitude,
    } = this.state;

    const { id, onEditReview } = this.props;

    const reviewDict = {
      restaurant_name: restaurant,
      menu_name: menu,
      content,
      rating,
      longitude,
      latitude,
    };

    onEditReview(id, reviewDict);
  }

  postContentHandler = () => {
    const { onPostReview } = this.props;

    const {
      restaurant,
      menu,
      content,
      rating,
      longitude,
      latitude,
      image,
    } = this.state;

    const reviewDict = {
      restaurant_name: restaurant,
      menu_name: menu,
      content,
      rating,
      longitude,
      latitude,
    };

    let fd = false;

    if (image != null) {
      fd = new FormData();
      const file = new File([image], 'img.jpg');

      fd.append('image', file);
    }

    onPostReview(reviewDict, fd);
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
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
      latitude: lat,
      longitude: lng,
    });
  }

  render() {
    const {
      history, mode, id, review,
    } = this.props;

    let ready = false;

    if ((mode === 'ADD' && 'lat' in this.state && 'lng' in this.state)
      || (mode === 'EDIT' && id === review.id && !('content' in this.state))) {
      ready = true;
      if (mode === 'EDIT') {
        const { review: loadedReview } = this.props;
        const {
          rating, content, restaurant, menu, image,
        } = loadedReview;
        this.setState({
          rating, content, restaurant, menu, image,
        });
      }
    }

    const {
      rating, content, restaurant, menu,
      error, image, open,
    } = this.state;

    const { lat, lng } = this.state;

    if (error != null) {
      return (
        <div className="form-review-error">
          <p>{error.content}</p>
        </div>
      );
    }

    if (!ready) {
      return (
        <div className="form-review-loading">
          <p>Loading...</p>
        </div>
      );
    }

    // https://www.npmjs.com/package/react-image-select-pv
    const imageField = mode === 'ADD' ? (
      <div>
        <ImageSelectPreview
          id="add-review-image-selector"
          onChange={(data) => this.setState({ image: data[0].blob })}
          max={1}
        />
      </div>
    )
      : (
        <img src={image} alt="food img" />
      );

    const googleMap = mode === 'ADD'
      ? <GoogleMap center={{ lat, lng }} search getPos={this.getPos} />
      : <GoogleMap center={{ lat, lng }} />;

    const contentHandler = mode === 'ADD' ? this.postContentHandler : this.editContentHandler;

    const confirmDisabled = content === '' || restaurant === '' || menu === '' || rating === 0;

    return (
      <div className="review-fields">
        <div className="ui-special-cards">
          <div className="card" style={{ width: '630px' }}>
            <div className="content">
              <span className="header">
                Author
                {open}
              </span>
              <div className="meta">
                <span className="rating">
                  Rating:
                  <Rating
                    id="review-rating"
                    defaultRating={rating}
                    maxRating="5"
                    icon="star"
                    onRate={(e, { rating: rate }) => this.setState({ rating: rate })}
                  />
                </span>
              </div>
            </div>
            <div className="image-field">
              {imageField}
            </div>
            <div className="google-map">
              {googleMap}
            </div>
            <br />
            Restaurant
            <TextArea
              id="review-restaurant-input"
              rows="1"
              type="text"
              value={restaurant}
              onChange={(event) => this.setState({ restaurant: event.target.value })}
            />
            <br />
            Menu
            <TextArea
              id="review-menu-input"
              rows="1"
              type="text"
              value={menu}
              onChange={(event) => this.setState({ menu: event.target.value })}
            />
            <br />
            Content
            <TextArea
              id="review-content-input"
              rows="4"
              type="text"
              value={content}
              onChange={(event) => this.setState({ content: event.target.value })}
            />
            <br />
            <Button
              id="back-review-button"
              type="button"
              onClick={() => history.push('/main')}
            >
              Back
            </Button>
            <Button
              id="submit-review-button"
              type="button"
              disabled={confirmDisabled}
              onClick={() => { contentHandler(); }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

FormReview.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  mode: PropTypes.string,
  id: PropTypes.number,
  review: PropTypes.shape({
    id: PropTypes.number,
  }),
  onPostReview: PropTypes.func,
  onGetReview: PropTypes.func,
  onEditReview: PropTypes.func,
};

FormReview.defaultProps = {
  history: {
    push: null,
  },
  mode: 'ADD',
  id: 0,
  review: {
    id: 0,
  },
  onPostReview: null,
  onGetReview: null,
  onEditReview: null,
};

const mapStateToProps = (state) => ({
  review: state.review.reviewDetail,
});

const mapDispatchToProps = (dispatch) => ({
  onGetReview: (id) => {
    dispatch(actionCreators.GET_REVIEW(id));
  },
  onPostReview: (post) => {
    dispatch(actionCreators.POST_REVIEW(post));
  },
  onEditReview: (id, post) => {
    dispatch(actionCreators.EDIT_REVIEW(id, post));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormReview);
