import {
  // Container,
  // Grid,
  Rating,
  // Header,
  // Menu,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import './AddReview.css';

import { connect } from 'react-redux';
import { axios } from 'axios';
import ImageSelectPreview from 'react-image-select-pv';

// import for tag handling function, it'd be better to make tag js separately
import ReivewPreview from '../../components/ReviewPreview';

// import StarRating from '../../components/StarRating/StarRating';
// import * as actionCreators from '../../Stores/Actions/index';

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    this.setState({
      restaurant: '',
      menu: '',
      content: '',
      rating: 0,
      tag: [],
      // https://codepen.io/depy/pen/vEWWdw
      // location: null,
      image: null,
      error: null,
      ready: true,
    });
  }

  mapLoaded = () => {

  }

  addReviewHandler = () => {
    const postID = this.postContentHandler();
    this.postImageHandler(postID);

    this.history.push('/main');
  }

  postContentHandler = () => {
    const {
      restaurant,
      menu,
      content,
      rating,
      // tag,
    } = this.state;

    const reviewDict = {
      restaurant_name: restaurant,
      menu_name: menu,
      content,
      rating,
      // tag,
    };

    axios.post('/api/review/', reviewDict);

    return 0;
  }

  postImageHandler = (postID) => {
    const { image } = this.state;

    const fd = new FormData();
    const file = new File([image], 'img.jpg');

    fd.append('image', file);
    axios.post(`/api/review/${postID}/image/`, fd);
  }

  render() {
    // https://www.npmjs.com/package/react-image-select-pv
    const imgUpload = (
      <div>
        <ImageSelectPreview
          onChange={(data) => this.setState({ image: data.content })}
          max={1}
        />
      </div>
    );

    const {
      rating, content, restaurant, menu, ready, error,
    } = this.state;

    const { history } = this.props;

    if (!ready) {
      if (error != null) {
        history.push('/main');
        return (
          <div className="ReviewDetailError">
            <p>{error}</p>
          </div>
        );
      }
      return (
        <div className="ReviewDetailLoading">
          <p>Loading...</p>
        </div>
      );
    }

    const googleMap = (<div className="locationGoogle"> Map will be here </div>);

    const tagArea = <div />;
    /*
    (
      <div className="tags">
        <span className="tagShow">{ReivewPreview.parseTagName(tag)}</span>
      </div>
    );
    */

    const confirmDisabled = false;

    return (
      <div className="addReview">
        <div className="ui special cards">
          <div className="card" style={{ width: '630px' }}>
            <div className="content">
              <span className="header">
                Author name will be here
              </span>
              <div className="meta">
                <span className="rating">
                  Rating:
                  <Rating defaultRating={rating} maxRating="5" icon="star" />
                </span>
                {tagArea}
              </div>
            </div>
            <div className="blurring dimmable image">
              {imgUpload}
            </div>
            <div className="google map">
              {googleMap}
            </div>
            Restaurant
            <textarea
              id="review-restaurant-input"
              rows="1"
              type="text"
              value={restaurant}
              onChange={(event) => this.setState({ restaurant: event.target.value })}
            />
            <br />
            Menu
            <textarea
              id="review-menu-input"
              rows="1"
              type="text"
              value={menu}
              onChange={(event) => this.setState({ menu: event.target.value })}
            />
            <br />
            Content
            <textarea
              id="review-content-input"
              rows="4"
              type="text"
              value={content}
              onChange={(event) => this.setState({ content: event.target.value })}
            />
            <br />
            <button
              id="back-add-review-button"
              type="button"
              onClick={() => history.push('/articles')}
            >
              Back
            </button>
            <button
              id="submit-review-button"
              type="button"
              disabled={confirmDisabled}
              onClick={() => { this.addReviewHandler(); }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AddReview.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

AddReview.defaultProps = {
  history: {
    push: () => {},
  },
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
