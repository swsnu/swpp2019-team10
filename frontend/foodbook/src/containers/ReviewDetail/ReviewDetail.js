import {
  Rating,
  Button,
  TextArea,
} from 'semantic-ui-react';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './ReviewDetail.css';
import PropTypes from 'prop-types';
import ClickToEdit from 'react-click-to-edit';

import { connect } from 'react-redux';
// import * as actionCreators from '../../Stores/Actions/index';

import axios from 'axios';

const parseTagName = (tags) => tags.map((tag, i) => (
  <ClickToEdit key={tag.name} wrapperClass={tag.positive ? `pos ${i}` : `neg ${i}`} inputClass={tag.positive ? `pos ${i}` : `neg ${i}`} textClass={tag.positive ? `pos ${i}` : `neg ${i}`} value={tag.name} style={{ display: 'inline' }} endEditing={() => {}}>
    {/* FIXME */}
    <span key={`${tag.name}Wrapper`} className={tag.positive ? `pos ${i}` : `neg ${i}`}>
      {tag.name}
    </span>
  </ClickToEdit>
));

class ReviewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;

    this.setState({
      content: 'asdf',
      restaurant: 'Foodbook',
      author: 'Team10',
      menu: 'Logo',
      imgUrl: 'https://www.yellowblissroad.com/wp-content/uploads/2015/07/lemon-chicken-fb.jpg',
      rating: 5.0,
      date: '2019-11-04',
      tag: [{ name: 'crispy', positive: true }, { name: 'pricy', positive: false }],
      ready: true,
      error: null,
    });

    axios.get(`/api/review/${match.params.id}/`); /* .then((res) => {
      this.setState({
        content: res.data.content,
        restaurant: res.data.restaurant,
        author: res.data.author,
        menu: res.data.menu,
        imgUrl: res.data.image,
        rating: res.data.rating,
        date: res.data.date,
        ready: true,
      }).catch((error) => this.setState({
        error,
      }));
      */

    /* requires user info api to get author name
      axios.get('/api/user/' + res.data.author)
        .then(res => {this.setState({ authorname: res.data.name })});
    }) */
  }

  deleteHandler() {
    const { history, match } = this.props;
    axios.delete(`/api/review/${match.params.id}/`);
    history.push('/main');
  }

  render() {
    const {
      ready, error, content, restaurant, author, menu, imgUrl, rating, date, tag,
    } = this.state;

    const { history, match } = this.props;

    if (!ready) {
      if (error != null) {
        history.push('/main');
        return (
          <div className="ReviewDetailError">
            <p>{error}</p>
          </div>
        );
      }
      return (
        <div className="ReviewDetailLoading">
          <p>Loading...</p>
        </div>
      );
    }

    const reviewID = match.params.id;

    const isUserAuthor = true;
    const authorOnly = isUserAuthor ? (
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
    )
      : <div />;

    const googleMap = (<div className="locationGoogle"> Map will be here </div>);

    return (
      <div className="ReviewDetail">
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
              <img src={imgUrl} alt="food img" />
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
              onChange={(event) => this.setState({ content: event.target.value })}
            />
            <div className="extra content">
              <NavLink to="/recommendation">
                          Read Detail & Get Recommendation!
                {/* FIXME: Not Yet Implemented */}
              </NavLink>
            </div>
            {authorOnly}
            <Button
              id="back-review-button"
              type="button"
              onClick={() => history.push('/articles')}
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
      id: PropTypes.number,
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
