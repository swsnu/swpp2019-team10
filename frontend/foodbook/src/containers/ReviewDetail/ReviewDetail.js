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
// import * as actionCreators from '../../Stores/Actions/index';

import axios from 'axios';

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
      ready: false,
      open: false,
      error: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;

    axios.get(`/api/review/${match.params.id}/`).then((res) => {
      this.setState({
        content: res.data.content,
        restaurant: res.data.restaurant,
        author: res.data.author,
        menu: res.data.menu,
        image: res.data.image,
        rating: res.data.rating,
        date: res.data.date,
        tag: res.data.tag,
        ready: true,
      });
    }).catch((error) => this.setState({
      error: error.response,
    }));
  }

  show = () => () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  deleteHandler() {
    const { history, match } = this.props;
    axios.delete(`/api/review/${match.params.id}/`).then(
      () => history.push('/main'),
    ).catch(
      (error) => this.setState({ error: error.response }),
    );
  }

  render() {
    const {
      ready, error, content, restaurant, author, menu, image, rating, date, tag, open,
    } = this.state;

    const { history, match } = this.props;

    if (error != null) {
      return (
        <div className="Review-error-wrapper">
          <p>{error.content}</p>
        </div>
      );
    }

    if (!ready) {
      return (
        <div className="Review-loading-wrapper">
          <p>Loading...</p>
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

    const googleMap = (<GoogleMap />);

    return (
      <div className="ReviewDetail-wrapper">
        <div className="ui special cards">
          <div className="card" style={{ width: '630px' }}>
            <div className="content">
              <span className="header">{`${menu} ( ${restaurant} )`}</span>
              <div className="meta">
                <span className="rating">
                  Rating:
                  <Rating defaultRating={rating} maxRating="5" icon="star" disabled />
                </span>
                <span className="tag">{parseTagName(tag)}</span>
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
};

ReviewDetail.defaultProps = {
  match: {
    params: {
      id: 0,
    },
  },
  history: {
    push: () => {},
  },
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetail);
