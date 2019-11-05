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
    reviewsToRender = reviewsToRender.filter((review) => {
      return review.props.date === dateString
    });
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
      isMine
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
    id= {-1}
    key= "99"
    author= "cat"
    menu= "cat"
    rating= {3}
    date= "2019-11-05"
    image= 'https://i.pinimg.com/474x/91/ec/7e/91ec7ec701884e2959643bf4b31d8ee8--cat-food-food-networktrisha.jpg'
    tag= {[{ name: 'good', positive: true }, { name: 'bad', positive: false }]}
    isMine
  />
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
