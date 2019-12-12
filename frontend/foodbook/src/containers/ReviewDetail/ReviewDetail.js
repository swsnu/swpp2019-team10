/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Rating, Button, Modal, Form, Image, Grid,
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
  const parsed = tags.map((t, i) => {
    let className;
    if (t.sentimental === 0) className = `neu ${i}`;
    else if (t.sentimental === 1) className = `pos ${i}`;
    else className = `neg ${i}`;

    return (
      <span key={`${t.name}Wrapper`} className={className}>
        {t.name}
      </span>
    );
  });

  return (
    <div className="tags-wrapper" style={{ display: 'inline' }}>
      {parsed}
    </div>
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
    const { id, onGetReview } = this.props;
    onGetReview(id).then(this.setState({ open: true }));
  }

  close = () => this.setState({ open: false });

  deleteHandler() {
    const { id, onDeleteReview } = this.props;
    onDeleteReview(id).then(this.close());
  }

  render() {
    const {
      error, open,
    } = this.state;

    const {
      review, fixed, id,
    } = this.props;

    const {
      content, restaurant, author, menu, image, id: reviewId, category,
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

    // const isUserAuthor = ;

    const buttons = (
      <Grid columns={3} stretched stackable>
        <Grid.Column>
          <FormReview fixed={false} mode="EDIT" id={id} />
        </Grid.Column>
        <Grid.Column>
          <Button
            id="delete-review-button"
            type="submit"
            onClick={() => this.deleteHandler()}
          >
            Delete
          </Button>
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

    const modalContent = id === reviewId ? (
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
              fluid
              id="review-restaurant"
              rows="1"
              type="text"
              label="Restaurant"
              value={restaurant}
              readOnly
            />
            <Form.TextArea
              fluid
              id="review-category"
              rows="1"
              type="text"
              label="Category"
              value={category}
              readOnly
            />
            <Form.TextArea
              fluid
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
            fluid
            id="review-content"
            rows="4"
            type="text"
            label="Content"
            value={content}
            readOnly
          />
          <Form.Field>
            <Recommendation data={menu} id={id} />
          </Form.Field>
        </Form>
      </Modal.Content>
    )
      : loadContent;

    return (
      <Modal
        className="review-detail-modal"
        open={open}
        onOpen={this.open}
        onClose={this.close}
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
};

ReviewDetail.defaultProps = {
  id: 0,
  onGetReview: null,
  onDeleteReview: null,
  review: {
    id: 0,
  },
  fixed: false,
};

const mapStateToProps = (state) => ({
  review: state.review.reviewDetail,
});

const mapDispatchToProps = (dispatch) => ({
  onGetReview: (id) => dispatch(actionCreators.GET_REVIEW(id)),
  onDeleteReview: (id) => dispatch(actionCreators.DELETE_REVIEW(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetail);
