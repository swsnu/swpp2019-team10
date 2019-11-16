import {
  Rating,
  Button,
  TextArea,
} from 'semantic-ui-react';
import React, { Component } from 'react';
import './ReviewDetail.css';
import PropTypes from 'prop-types';
import GoogleMap from 'components/GoogleMap';

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
      /* open is variable for modal component,
        currently it's undecided if this will be converted to modal so it's left unused. */
      open: false,
      error: null,
    };
  }

  componentDidMount() {
    const { match, onGetReview } = this.props;
    onGetReview(match.params.id);
  }

  /*
  show = () => () => this.setState({ open: true });

  close = () => this.setState({ open: false });
  */

  deleteHandler() {
    const { history, match, onDeleteReview } = this.props;
    onDeleteReview(match.params.id);

    history.push('/main');
  }

  render() {
    const {
      error, open,
    } = this.state;

    const { history, match, review } = this.props;

    const {
      content, restaurant, author, menu, image,
      rating, date, tag, longitude, latitude,
    } = review;

    if (error != null) {
      return (
        <div className="Review-error-wrapper">
          <p>{error.content}</p>
        </div>
      );
    }

    const reviewID = match.params.id;

    // const isUserAuthor = ;
    const authorOnly = /* isUserAuthor ? */(
      <div className="AuthorButtons">
        <Button
          id="edit-review-button"
          type="submit"
          onClick={() => history.push(`/main/${reviewID}/edit`)}
        >
          Edit
        </Button>
        <Button
          id="delete-review-button"
          type="submit"
          onClick={() => this.deleteHandler()}
        >
          Delete
        </Button>
      </div>
    );
    //  : <div />;

    const googleMap = (<GoogleMap center={{ lat: latitude, lng: longitude }} />);

    return (
      <div className="ReviewDetail-wrapper">
        <div className="ui special cards">
          <div className="card" style={{ width: '630px' }}>
            {open}
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
            <div className="blurring dimmable image">
              <img src={image} alt="food img" />
            </div>
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
              <Recommendation />
            </div>
            {authorOnly}
            <Button
              id="back-review-button"
              type="button"
              onClick={() => history.push('/main')}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

ReviewDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  onGetReview: PropTypes.func,
  onDeleteReview: PropTypes.func,
  review: PropTypes.shape(PropTypes.any),
};

ReviewDetail.defaultProps = {
  match: {
    params: {
      id: 0,
    },
  },
  history: {
    push: null,
  },
  onGetReview: null,
  onDeleteReview: null,
  review: {},
};

const mapStateToProps = (state) => ({
  review: state.review.reviewDetail,
});

const mapDispatchToProps = (dispatch) => ({
  onGetReview: (id) => {
    dispatch(actionCreators.GET_REVIEW(id));
  },
  onDeleteReview: (id) => {
    dispatch(actionCreators.DELETE_REVIEW(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetail);
