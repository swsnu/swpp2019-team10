import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
// import * as actionCreators from '../../Stores/Actions/index';

import axios from 'axios';

class ReviewDetail extends Component {
  componentDidMount() {
    axios.get(`/api/review/${this.props.match.params.id}/`).then((res) => {
      this.setState({
        content: res.data.content,
        // eslint-disable-next-line react/no-unused-state
        author_id: res.data.author_id,
      });
      /* requires user info api to get author name
      axios.get('/api/user/' + res.data.author_id)
        .then(res => {this.setState({ authorname: res.data.name })});
      */
    });
  }

  deleteHandler() {
    axios.delete(`/api/review/${this.props.match.params.id}/`)
    this.props.history.push('/articles');
  }

  render() {
    let article_id = this.props.match.params.id;

    const { content } = this.state;

    const isUserAuthor = true;
    const authorOnly = isUserAuthor ? (
      <div className="AuthorButtons">
        <button id="edit-article-button"
          onClick={() => this.props.history.push(
            '/articles/' + this.props.match.params.id + '/edit')}> Edit </button>
        <button id="delete-article-button"
          onClick={() => this.deleteHandler()}> Delete </button>
      </div>
    )
      : <div />;

    return (
      <div className="ReviewDetail">
        <div className="row">
          <div className="left">
            <h3>Name:</h3>
          </div>
          <div className="right">
            <p id="review-author">{/* author name */}</p>
          </div>
        </div>
        <div className="row">
          <div className="left">
            <h3>Content:</h3>
          </div>
          <div className="right">
            <p id="article-content">{content}</p>
          </div>
        </div>
        {authorOnly}
        <button id="back-detail-article-button"
          onClick={() => this.props.history.push('/articles')}> Back </button>    
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
