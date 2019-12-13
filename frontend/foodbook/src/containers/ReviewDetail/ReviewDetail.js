/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Rating, Button, Modal, Form, Image, Grid, Icon,
} from 'semantic-ui-react';
import React, { Component } from 'react';
import './ReviewDetail.css';
import PropTypes from 'prop-types';
import GoogleMap from 'components/GoogleMap';
import FormReview from 'containers/FormReview/FormReview';

import Recommendation from 'containers/Recommendation';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/review/action_review';

const parseTagName = (tags) => {
  const positive = tags.filter((tagPositive) => tagPositive.sentimental === 1);

  const netural = tags.filter((tagNetural) => tagNetural.sentimental === 0);

  const negative = tags.filter((tagNegative) => {
    const score = tagNegative.sentimental;
    return score !== 0 && score !== 1;
  });

  const getName = (obj) => obj.name;
  const positives = positive.map(getName).join(', ');
  const negatives = negative.map(getName).join(', ');
  const neturals = netural.map(getName).join(', ');

  return (
    <span className="tags-wrapper">
      <Icon name="thumbs up" size="mini" />
      <span className="positive" style={{ color: 'blue' }}>
        { positives }
      </span>
      <Icon name="thumbs down" size="mini" />
      <span className="negative" style={{ color: 'red' }}>
        { negatives }
      </span>
      <Icon name="hand point right" size="mini" />
      <span className="neturals" style={{ color: 'grey' }}>
        { neturals }
      </span>
      <br />
    </span>
  );
};

class ReviewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
    };
  }

  open = () => {
    console.log('opened');
    this.setState({ open: true });
  }

  loadReview = () => {
    this.setState({ ready: false });
    const { id, onGetReview } = this.props;
    onGetReview(id).then(() => {
      this.setState({ ready: true });
    });
  }

  close = () => this.setState({ open: false });

  deleteHandler() {
    const { id, onDeleteReview } = this.props;
    onDeleteReview(id).then(this.close());
  }

  render() {
    const {
      error, open, ready,
    } = this.state;

    const {
      review, user, fixed, id,
    } = this.props;

    const {
      content, restaurant, author, menu, image, category,
      rating, date, tag, longitude, latitude,
    } = review;

    const errorContent = error ? (
      <div className="Review-error-wrapper">
        <p>{error.content}</p>
      </div>
    ) : null;

    const loadContent = (
      <div className="form-review-loading">
        <p>Loading...</p>
      </div>
    );

    const triggerButton = (
      <Button id="detail-modal-trigger" className="ui medium image" inverted={fixed} onClick={this.open}>
        Go
      </Button>
    );

    const isAuthor = user.username === author;

    const buttons = (
      <Grid columns={7} stretched>
        <Grid.Column />
        <Grid.Column />
        <Grid.Column />
        <Grid.Column />
        <Grid.Column>
          {isAuthor ? <FormReview fixed={false} mode="EDIT" id={id} onClose={this.loadReview} /> : <div />}
        </Grid.Column>
        <Grid.Column>
          {isAuthor
            ? (
              <Button
                id="delete-review-button"
                type="submit"
                onClick={() => this.deleteHandler()}
              >
              Delete
              </Button>
            ) : <div />}
        </Grid.Column>
        <Grid.Column>
          <Button
            id="back-review-button"
            type="button"
            onClick={this.close}
          >
            Back
          </Button>
        </Grid.Column>
      </Grid>
    );

    const imgArea = image !== '' ? (
      <Image fluid src={image} alt="food img" />
    )
      : <div />;

    const googleMap = (<GoogleMap center={{ lat: latitude, lng: longitude }} marker />);

    const modalContent = ready ? (
      <Modal.Content scrolling>
        <Form id="review-detail" style={{ width: '1000px' }}>
          <Form.Group width="equal">
            <Form.Field>
              {author}
            </Form.Field>
            <Form.Field>
              {date}
            </Form.Field>
          </Form.Group>
          <Form.Field>
            {imgArea}
          </Form.Field>
          <Form.Field>
            {googleMap}
          </Form.Field>
          <Form.Group width="equal">
            <Form.TextArea
              id="review-restaurant"
              rows="1"
              type="text"
              label="Restaurant"
              value={restaurant}
              readOnly
            />
            <Form.TextArea
              id="review-category"
              rows="1"
              type="text"
              label="Category"
              value={category}
              readOnly
            />
            <Form.TextArea
              id="review-menu"
              rows="1"
              type="text"
              label="Menu"
              value={menu}
              readOnly
            />
          </Form.Group>
          <Form.Field>
            {Array.isArray(tag) && parseTagName(tag)}
          </Form.Field>
          <Form.Field>
            <Rating defaultRating={rating} maxRating="5" icon="star" disabled />
          </Form.Field>
          <Form.TextArea
            id="review-content"
            rows="4"
            type="text"
            label="Content"
            value={content}
            readOnly
          />
          <Form.Field>
            <Recommendation data={menu} id={id} onClose={this.loadReview} />
          </Form.Field>
        </Form>
      </Modal.Content>
    )
      : loadContent;

    return (
      <Modal
        className="review-detail-modal"
        open={open}
        onOpen={this.loadReview}
        trigger={(
          triggerButton
        )}
      >
        <Modal.Header>
          Review
        </Modal.Header>
        {error ? errorContent : modalContent}
        <Modal.Actions>
          {buttons}
        </Modal.Actions>
      </Modal>
    );
  }
}

ReviewDetail.propTypes = {
  id: PropTypes.number,
  onGetReview: PropTypes.func,
  onDeleteReview: PropTypes.func,
  review: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    restaurant: PropTypes.string,
    author: PropTypes.string,
    menu: PropTypes.string,
    image: PropTypes.any,
    rating: PropTypes.number,
    date: PropTypes.string,
    tag: PropTypes.any,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    category: PropTypes.string,
  }),
  fixed: PropTypes.bool,
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
};

ReviewDetail.defaultProps = {
  id: 0,
  onGetReview: null,
  onDeleteReview: null,
  review: {
    id: 0,
  },
  fixed: false,
  user: { username: '' },
};

const mapStateToProps = (state) => ({
  review: state.review.reviewDetail,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  onGetReview: (id) => dispatch(actionCreators.GET_REVIEW(id)),
  onDeleteReview: (id) => dispatch(actionCreators.DELETE_REVIEW(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetail);
