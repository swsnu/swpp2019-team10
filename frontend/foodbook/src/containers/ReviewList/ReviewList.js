import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ReviewPreview from 'components/ReviewPreview/';
import * as actionCreators from 'store/actions/review/action_review';

const ReviewList = (props) => (
  <div className="ReviewList">
    <div className="ui special cards fluid">
      <div className="card fluid" style={{ width: '630px' }}>
        <div className="content">
          <br />

          <ReviewPreview
            key="1"
            imgUrl="https://www.yellowblissroad.com/wp-content/uploads/2015/07/lemon-chicken-fb.jpg"
            name="chicken"
            rating={3}
            tag={[{ name: 'crispy', positive: true }, { name: 'pricy', positive: false }]}
          />
        </div>
      </div>
    </div>
  </div>
);

ReviewList.propTypes = {
  dateString: propTypes.string,
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
