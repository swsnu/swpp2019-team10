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

// import StarRating from '../../components/StarRating/StarRating';
// import * as actionCreators from '../../Stores/Actions/index';

class FormReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        ready: true,
      });
    } else if (mode === 'EDIT') {
      axios.get(`/api/review/${id}/`).then((res) => {
        this.setState({
          content: res.data.content,
          restaurant: res.data.restaurant,
          menu: res.data.menu,
          rating: res.data.rating,
          ready: true,
          longitude: res.data.longitude,
          latitude: res.data.latitude,
        });
      }).catch((error) => this.setState({
        error: error.response,
      }));
    } else {
      this.setState({
        error: 'Unknown Form Type',
      });
    }
  }

  mapLoaded = () => {

  }

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

    axios.put(`/api/review/${id}/`, reviewDict).then((res) => {
      this.postImageHandler(res.data.id);
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
            userLoc: {
            },
          });
          this.googleMap = (
            <GoogleMap center={{
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }}
            />
          );
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

  render() {
    // https://www.npmjs.com/package/react-image-select-pv
    const imgUpload = (
      <div>
        <ImageSelectPreview
          id="add-review-image-selector"
          onChange={(data) => this.setState({ image: data[0].blob })}
          max={1}
        />
      </div>
    );

    const {
      rating, content, restaurant, menu, ready, error, userLoc,
    } = this.state;

    const { history, mode } = this.props;

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


    const confirmDisabled = content === '' || restaurant === '' || menu === '' || rating === 0;

    return (
      <div className="review-fields">
        <div className="ui-special-cards">
          <div className="card" style={{ width: '630px' }}>
            <div className="content">
              <span className="header">
                Author
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
            <div className="blurring dimmable image">
              {imgUpload}
            </div>
            <div className="google map">
              {googleMap}
            </div>
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
              onClick={() => { this.postContentHandler(); }}
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
    push: () => {},
  },
  mode: 'ADD',
  id: 0,
};

const mapDispatchToProps = (/* dispatch */) => ({});

const mapStateToProps = (/* state */) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FormReview);
