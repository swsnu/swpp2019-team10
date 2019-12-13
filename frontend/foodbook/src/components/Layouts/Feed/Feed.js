import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ReviewPreview from 'components/ReviewPreview/';
import * as actionCreators from 'store/actions/review/action_review';
import { Card } from 'semantic-ui-react';

class Feed extends Component {
  constructor(props) {
    super(props);
    const { onGetAll, friendId, onGetFriendAll } = this.props;
    if (friendId === -1) {
      onGetAll();
    } else {
      onGetFriendAll(friendId);
    }
  }

  render() {
    const { reviews, dateString, category } = this.props;
    let reviewsToRender = reviews;
    if (dateString) {
      reviewsToRender = reviewsToRender.filter((review) => review.date === dateString);
    }

    if (category) {
      reviewsToRender = reviewsToRender
        .filter((review) => review.category.toUpperCase() === category.toUpperCase());
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
      <Card.Group itemsPerRow={5} className="feed">
        {reviewsToRender}
      </Card.Group>
    );
  }
}

Feed.propTypes = {
  dateString: propTypes.string,
  reviews: propTypes.arrayOf(Object),
  onGetAll: propTypes.func.isRequired,
  onGetFriendAll: propTypes.func.isRequired,
  friendId: propTypes.number,
  category: propTypes.string,
};

Feed.defaultProps = {
  dateString: undefined,
  category: undefined,
  reviews: [{ id: 0, isMine: true }, { id: 1, isMine: false }],
  friendId: -1,
};

const mapStateToProps = (state) => ({
  reviews: state.review.reviewList,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAll: () => {
    dispatch(actionCreators.GET_REVIEWS());
  },
  onGetFriendAll: (id) => {
    dispatch(actionCreators.GET_FRIEND_REVIEWS(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Feed));
