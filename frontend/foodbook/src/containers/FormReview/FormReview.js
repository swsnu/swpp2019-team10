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
import axios from 'axios';
import ImageSelectPreview from 'react-image-select-pv';
import * as actionCreators from 'store/actions/review/action_review';

class FormReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* open is variable for modal component,
        currently it's undecided if this will be converted to modal so it's left unused. */
      open: false,
      ready: false,
    };
  }

  componentDidMount() {
    this.getGeoLocation();
    const { mode, id } = this.props;

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
      this.onGetReview(id);
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

    const { id } = this.props;

    const reviewDict = {
      restaurant_name: restaurant,
      menu_name: menu,
      content,
      rating,
      longitude,
      latitude,
    };

    axios.put(`/api/review/${id}/`, reviewDict).then(() => {
      this.setState({ open: false });
    }).catch((error) => this.setState({
      error: error.response,
    }));
  }

  postContentHandler = () => {
    const {
      restaurant,
      menu,
      content,
      rating,
      longitude,
      latitude,
    } = this.state;

    const reviewDict = {
      restaurant_name: restaurant,
      menu_name: menu,
      content,
      rating,
      longitude,
      latitude,
    };

    axios.post('/api/review/', reviewDict).then((res) => {
      this.postImageHandler(res.data.id);
    }).catch((error) => this.setState({
      error: error.response,
    }));
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
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

  postImageHandler = (postID) => {
    const { image } = this.state;
    const { history } = this.props;

    if (image != null) {
      const fd = new FormData();
      const file = new File([image], 'img.jpg');

      fd.append('image', file);
      axios.post(`/api/review/${postID}/image/`, fd).then((/* res */) => {
        history.push('/main');
      }).catch((error) => this.setState({
        error: error.response,
      }));
    } else {
      history.push('/main');
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
      rating, content, restaurant, menu,
      ready, error, image, lat, lng, open,
    } = this.state;

    const { history, mode } = this.props;

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
};

FormReview.defaultProps = {
  history: {
    push: null,
  },
  mode: 'ADD',
  id: 0,
};

const mapStateToProps = (state) => ({
  review: state.review.reviewDetail,
});

const mapDispatchToProps = (dispatch) => ({
  /*
  onGetReview: (id) => {
    dispatch(actionCreators.GET_REVIEW(id));
  },
  onPostReview: (post) => {
    dispatch(actionCreators.POST_REVIEW(post));
  },
  onEditReview: (id, post) => {
    dispatch(actionCreators.EDIT_REVIEW(id, post));
  },
  */
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(FormReview);
