import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ReviewPreview from 'components/ReviewPreview/';
import * as actionCreators from 'store/actions/review/action_review';

const ReviewList = (props) => {
  const { reviews, dateString } = props;

  let reviewsToRender = reviews;
  if (dateString) {
    reviewsToRender = reviewsToRender.filter((review) => review.props.date === dateString);
  }

  reviewsToRender = reviewsToRender.map((review) => (
    <ReviewPreview
      key={`${review.props.id}`}
      id={review.props.id}
      author={review.props.author}
      restaurant={review.props.restaurant}
      menu={review.props.menu}
      content={review.props.content}
      image={review.props.image}
      rating={review.props.rating}
      date={review.props.date}
      tag={review.props.tag}
      isMine={review.props.isMine}
    />
  ));

  return (
    <div className="ReviewList">
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
};

ReviewList.propTypes = {
  dateString: propTypes.string,
  reviews: propTypes.arrayOf(Object),
};

ReviewList.defaultProps = {
  dateString: undefined,
  reviews: [
    <ReviewPreview
      key="0"
      id={0}
      isMine
    />,

    <ReviewPreview
      key="1"
      id={1}
      menu="cat-review-by-some-friend"
      isMine={false}
    />,
  ],
};

const mapStateToProps = (state) => ({
  Reviews: state.review.reviewList,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAll: () => {
    dispatch(actionCreators.GET_REVIEWS());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewList));
