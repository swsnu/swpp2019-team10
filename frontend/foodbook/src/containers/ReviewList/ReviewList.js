import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ReviewPreview from 'components/ReviewPreview/';
import * as actionCreators from 'store/actions/review/action_review';

const ReviewList = (props) => {
  const { reviews, dateString } = props;

  let reviewsToRender = reviews || [];
  if (dateString) reviewsToRender = reviewsToRender.filter((review) => review.date === dateString);

  reviewsToRender = reviewsToRender.map((review) => (
    <ReviewPreview
      key={review.id}
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
            <ReviewPreview
              key="-1"
              id={-1}
              author="React"
              restaurant="302"
              menu="GalbiTang"
              content="ZMTGR"
              image="http://recipe1.ezmember.co.kr/cache/recipe/2017/11/15/268859d03a5850821af32b009d8001731.jpg"
              rating={3}
              date="2019-11-04"
              tag={[{ name: 'hot', positive: true }, { name: 'pricy', positive: false }]}
              isMine
            />
            {/* mock */}
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
  reviews: undefined,
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
