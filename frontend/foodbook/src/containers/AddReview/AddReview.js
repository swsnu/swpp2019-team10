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
      // rating: null, https://codepen.io/depy/pen/vEWWdw
      // location: null,
      image: null,
    });
  }

  mapLoaded = () => {

  }

  addReviewHandler = () => {
    this.postContentHandler();
    this.postImageHandler();

    this.history.push('/main');
  }

  postContentHandler = () => {
    const reviewDict = {

    };
    axios.post('/api/review/', reviewDict);
  }

  postImageHandler = () => {
    const { image } = this.state;

    const fd = new FormData();
    const file = new File([image], 'img.jpg');

    fd.append('image', file);
    axios.post('/api/review/', fd);
  }

  render() {
    // https://www.npmjs.com/package/react-image-select-pv
    const imgUpload = (
      <div>
        <ImageSelectPreview
          onChange={(data) => this.setState({ image: data.content })}
          max={1}
        />
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
