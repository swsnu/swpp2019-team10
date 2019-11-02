import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
// import * as actionCreators from '../../Stores/Actions/index';

import axios from 'axios';

function stringRenderer(name, str) {
  return (
    <div className="row">
      <div className="left">
        <h3>
          {name}
        </h3>
      </div>
      <div className="right">
        <p id={`review-${name}`}>{str}</p>
      </div>
    </div>
  );
}

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
      content: '',
      restaurant: 0,
      author: 0,
      menu: 0,
      image: '',
      rating: 0.0,
      date: '',
      ready: false,
      error: null,
    });

    axios.get(`/api/review/${match.params.id}/`).then((res) => {
      this.setState({
        content: res.data.content,
        restaurant: res.data.restaurant,
        author: res.data.author,
        menu: res.data.menu,
        image: res.data.image,
        rating: res.data.rating,
        date: res.data.date,
        ready: true,
      }).catch((error) => this.setState({
        error,
      }));
      /* requires user info api to get author name
      axios.get('/api/user/' + res.data.author)
        .then(res => {this.setState({ authorname: res.data.name })});
      */
    });
  }

  deleteHandler() {
    const { history, match } = this.props;
    axios.delete(`/api/review/${match.params.id}/`);
    history.push('/main');
  }

  render() {
    const {
      ready, error, content, restaurant, author, menu, image, rating, date,
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
        <button
          id="edit-article-button"
          type="submit"
          onClick={() => history.push(`/articles/${reviewID}/edit`)}
        >
          Edit
        </button>
        <button
          id="delete-article-button"
          type="submit"
          onClick={() => this.deleteHandler()}
        >
          Delete
        </button>
      </div>
    )
      : <div />;

    return (
      <div className="ReviewDetail">
        {stringRenderer('Author', author)}
        {stringRenderer('Restaurant', restaurant)}
        {stringRenderer('Menu', menu)}
        {stringRenderer('Image', image)}
        {stringRenderer('Content', content)}
        {stringRenderer('Rating', rating)}
        {stringRenderer('Date', date)}
        {authorOnly}
        <button
          id="back-review-article-button"
          type="button"
          onClick={() => history.push('/articles')}
        >
          Back
        </button>
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
