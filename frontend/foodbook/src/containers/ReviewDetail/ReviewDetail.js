import {
  Rating, Button, TextArea, Modal,
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
      <Button id="detail-modal-trigger" className="ui medium image" inverted={!fixed} onClick={this.open}>
        Read Detail & Get Recommendation!
      </Button>
    );

    /*

              <Grid.Row className="add-review">
                <div className="ui special cards">
                  <div className="card" style={{ width: '630px' }}>
                    <div className="content">
                      <FormReview fixed={false} mode="ADD" />
                    </div>
                  </div>
                </div>
              </Grid.Row>
    */

    // const isUserAuthor = ;
    const authorOnly = /* isUserAuthor ? */(
      <div className="AuthorButtons">
        <FormReview fixed={false} mode="EDIT" id={id} />
        <Button
          id="delete-review-button"
          type="submit"
          onClick={() => this.deleteHandler()}
        >
          Delete
        </Button>
      </div>
    );

    const imgArea = image !== '' ? (
      <div className="blurring dimmable image">
        <img src={image} alt="food img" />
      </div>
    )
      : <div />;

    const googleMap = (<GoogleMap center={{ lat: latitude, lng: longitude }} />);

    const modalContent = id === reviewId ? (
      <Modal.Content>
        <div className="ReviewDetail-wrapper">
          {category}
          <div className="ui special cards">
            <div className="card" style={{ width: '630px' }}>
              <div className="content">
                <span className="header">{`${menu} ( ${restaurant} )`}</span>
                <div className="meta">
                  <span className="rating">
                    Rating:
                    <Rating defaultRating={rating} maxRating="5" icon="star" disabled />
                  </span>
                  <span className="tag">{Array.isArray(tag) && parseTagName(tag)}</span>
                </div>
              </div>
              {imgArea}
              <div className="google map">
                {googleMap}
              </div>
              {author}
              <br />
              {date}
              <br />
              <TextArea
                id="review-content-input"
                rows="4"
                type="text"
                value={content}
                readOnly
              />
              <div className="extra content">
                <Recommendation data={menu} id={id} />
              </div>
            </div>
          </div>
        </div>
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
          {authorOnly}
          <Button
            id="back-review-button"
            type="button"
            onClick={this.close}
          >
            Back
          </Button>
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
