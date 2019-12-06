import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ReviewPreview from 'components/ReviewPreview/';
import * as actionCreators from 'store/actions/review/action_review';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    const { onGetAll } = this.props;
    onGetAll();
  }


  render() {
    const { reviews, dateString } = this.props;
    let reviewsToRender = reviews;
    if (dateString) {
      reviewsToRender = reviewsToRender.filter((review) => review.date === dateString);
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
        isMine={review.isMine}
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
  }
}

ReviewList.propTypes = {
  dateString: propTypes.string,
  reviews: propTypes.arrayOf(Object),
  onGetAll: propTypes.func.isRequired,
};

ReviewList.defaultProps = {
  dateString: undefined,
  reviews: [{ id: 0, isMine: true }, { id: 1, isMine: false }],
};

const mapStateToProps = (state) => ({
  reviews: state.review.reviewList,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAll: () => dispatch(actionCreators.GET_REVIEWS()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewList));
