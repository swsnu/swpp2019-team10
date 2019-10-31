/*  eslint linebreak-style: ["error", "windows"]  */

import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import { connect } from 'react-redux';
// import * as actionCreators from '../../Stores/Actions/index';

class AddReview extends Component {
  componentDidMount() {
    this.setState({
      // image: null,
      // content: '',
    });
  }

  createArticleHandler = () => {

  }

  render() {
    return <Button id="upldPicButton">UploadPicture</Button>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
