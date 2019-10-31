/*  eslint linebreak-style: ["error", "windows"]  */

import React, { Component } from 'react';
// import { Button } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { axios } from 'axios';
import ImageSelectPreview from 'react-image-select-pv';
// import * as actionCreators from '../../Stores/Actions/index';

class AddReview extends Component {
  componentDidMount() {
    this.setState({
      // restauerant: '',
      // menu: '',
      // content: '',
      // rating: null,
      image: null,
    });
  }

  addReviewHandler = () => {
    const { image } = this.state;

    const fd = new FormData();
    const file = new File([image], 'img.jpg');

    fd.append('image', file);
    axios.post({ data: fd });

    this.history.push('/main');
  }

  render() {
    const imgUpload = (
      <div>
        <ImageSelectPreview onChange={(data) => this.setState({ image: data.content })} />
      </div>
    );

    return (
      <div className="addReview">
        {imgUpload}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
