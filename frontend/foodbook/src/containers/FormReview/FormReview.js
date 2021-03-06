/* eslint-disable jsx-a11y/label-has-associated-control */
// Review Add, Edit form.
// "mode" is passed as props. "ADD", "EDIT"
// "id" is passed as props. Only used for "EDIT" mode.

import {
  Rating, Button, Form, Image, Modal, Popup,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './FormReview.css';
import GoogleMap from 'components/GoogleMap';

import { connect } from 'react-redux';
import ImageSelectPreview from 'react-image-select-pv';
import * as actionCreators from 'store/actions/review/action_review';

class FormReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    const { mode } = this.props;

    if (mode === 'ADD') {
      this.setState({
        placeid: '',
        restaurant: 'Select icon from Map',
        menu: '',
        content: '',
        rating: 0,
        longitude: 0.0,
        latitude: 0.0,
        category: '',
        image: null,
        error: null,
      });
    } else if (mode !== 'EDIT') {
      this.setState({
        error: 'Unknown Form Type',
      });
    }
  }

  open = () => {
    const { review: loadedReview, mode } = this.props;
    if (mode === 'EDIT') {
      const {
        rating, content, restaurant, menu, image, category, longitude, latitude, placeid,
      } = loadedReview;
      this.setState({
        rating, content, restaurant, menu, image, category, longitude, latitude, placeid,
      });
      this.setState({ open: true });
    }
    this.getGeoLocation();
  };

  close = () => {
    this.setState({
      placeid: '',
      restaurant: 'Select icon from Map',
      menu: '',
      content: '',
      rating: 0,
      category: '',
      image: null,
      error: null,
      open: false,
    });

    const { onClose } = this.props;
    onClose();
  };

  editContentHandler = () => {
    const {
      restaurant,
      menu,
      content,
      rating,
      longitude,
      latitude,
      category,
      placeid,
    } = this.state;

    const { id, onEditReview } = this.props;

    const reviewDict = {
      restaurant_name: restaurant,
      menu_name: menu,
      content,
      rating,
      longitude,
      latitude,
      category,
      placeid,
    };

    onEditReview(id, reviewDict).then(this.close());
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
      category,
      placeid,
    } = this.state;

    const reviewDict = {
      restaurant_name: restaurant,
      menu_name: menu,
      content,
      rating,
      longitude,
      latitude,
      category,
      placeid,
    };

    let fd = false;

    fd = new FormData();
    const file = new File([image], 'img.jpg');
    fd.append('image', file);

    onPostReview(reviewDict, fd).then(this.close());
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            open: true,
          });
        },

        () => {
          this.setState({
            latitude: 37.450084,
            longitude: 126.952459,
            open: true,
          });
        },
      );
    }
  }

  getInfo = (placeid, restaurant, lat, lng) => {
    this.setState({
      placeid,
      restaurant,
      latitude: lat,
      longitude: lng,
    });
  }

  handleCategory = (e, { value }) => {
    this.setState({
      category: value,
    });
  };

  render() {
    const {
      mode, fixed,
    } = this.props;

    const {
      rating, content, restaurant, menu, category,
      error, image, open,
    } = this.state;

    if (error != null) {
      return (
        <div className="form-review-error">
          <p>{error.content}</p>
        </div>
      );
    }

    const { latitude, longitude } = this.state;

    // https://www.npmjs.com/package/react-image-select-pv
    const imageHtml = image !== '' ? <Image src={image} alt="food img" /> : <div />;

    const imageField = mode === 'ADD' ? (
      <Form.Field>
        <ImageSelectPreview
          id="add-review-image-selector"
          onChange={(data) => this.setState({ image: '0' in data ? data[0].blob : null })}
          max={1}
        />
      </Form.Field>
    )
      : imageHtml;

    const googleMap = mode === 'ADD'
      ? <GoogleMap center={{ lat: latitude, lng: longitude }} search getInfo={this.getInfo} />
      : <GoogleMap center={{ lat: latitude, lng: longitude }} marker />;

    const contentHandler = mode === 'ADD' ? this.postContentHandler : this.editContentHandler;

    const confirmDisabled = content === '' || restaurant === 'Select icon from Map' || menu === '' || rating === 0 || category === '' || image === null;

    let triggerButton;
    switch (mode) {
      case 'ADD':
        triggerButton = (
          <Button className="ui medium image" inverted={!fixed} onClick={this.open}>
            <i className="edit outline black icon massive center link" />
          </Button>
        );
        break;
      case 'EDIT':
        triggerButton = (
          <Button inverted={fixed} onClick={this.open}>
            Edit
          </Button>
        );
        break;
      default:
        triggerButton = (
          <Button inverted={fixed} onClick={this.open}>
            Error
          </Button>
        );
    }

    const categoryList = ['Chicken', 'Pizza', 'Korean', 'Chinese', 'Japanese',
      'Western', 'Fastfood', 'Dessert', 'Snack', 'Asian'].map((str) => ({
      key: str,
      text: str,
      value: str.toLowerCase(),
    }));

    return (
      <Modal
        className="form-review-modal"
        open={open}
        trigger={(
          <Popup
            id="review-modal-trigger"
            trigger={triggerButton}
            content={mode === 'ADD' ? 'ADD Your Reivew!' : 'Edit this review!'}
            position="right center"
          />
      )}
      >
        <Modal.Header>
          {mode === 'ADD' ? 'Submit New Review' : 'Edit Review'}
        </Modal.Header>
        <Modal.Content scrolling>
          <Form id="review-form" style={{ width: '1000px' }}>
            <Form.Field className="image-field">
              {imageField}
            </Form.Field>
            <Form.Field className="google-map">
              {googleMap}
            </Form.Field>
            <br />
            <br />
            <Form.Group widths="equal">
              <Form.TextArea
                id="review-restaurant-input"
                rows="1"
                label="Restaurant"
                value={restaurant}
                readOnly
              />
              <Form.Dropdown
                label="Category"
                name="category"
                placeholder="Food's category here"
                selection
                value={category}
                onChange={this.handleCategory}
                options={categoryList}
                className="category-input-wrapper"
              />
              <Form.TextArea
                id="review-menu-input"
                rows="1"
                label="Menu"
                value={menu}
                onChange={(event) => this.setState({ menu: event.target.value })}
              />
            </Form.Group>
            <Form.Field>
              <label>Rating:</label>
              <Rating
                id="review-rating"
                defaultRating={rating}
                maxRating="5"
                icon="star"
                size="huge"
                onRate={(e, { rating: rate }) => this.setState({ rating: rate })}
              />
            </Form.Field>
            <Form.TextArea
              id="review-content-input"
              rows="4"
              label="Content"
              value={content}
              onChange={(event) => this.setState({ content: event.target.value })}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            id="back-review-button"
            type="button"
            onClick={this.close}
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
        </Modal.Actions>
      </Modal>
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
  onClose: PropTypes.func,
  onPostReview: PropTypes.func,
  onEditReview: PropTypes.func,
  fixed: PropTypes.bool,
};

FormReview.defaultProps = {
  history: {
    push: null,
  },
  mode: null,
  id: 0,
  review: {
    id: 0,
  },
  onClose: () => {},
  onPostReview: null,
  onEditReview: null,
  fixed: false,
};

const mapStateToProps = (state) => ({
  review: state.review.reviewDetail,
});

const mapDispatchToProps = (dispatch) => ({
  onPostReview: (post, img) => dispatch(actionCreators.POST_REVIEW(post, img)),
  onEditReview: (id, post) => dispatch(actionCreators.EDIT_REVIEW(id, post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormReview));
