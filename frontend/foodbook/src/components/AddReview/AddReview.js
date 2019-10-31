/*  eslint linebreak-style: ["error", "windows"]  */

import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import { connect } from 'react-redux';
<<<<<<< Updated upstream
=======
import { axios } from 'axios';
import ImageSelectPreview from 'react-image-select-pv';
>>>>>>> Stashed changes
// import * as actionCreators from '../../Stores/Actions/index';

class AddReview extends Component {
  componentDidMount() {
    this.setState({
<<<<<<< Updated upstream
      // image: null,
      // content: '',
    });
  }

  createArticleHandler = () => {

  }

  render() {
    return <Button id="upldPicButton">UploadPicture</Button>;
=======
      restauerant: '',
      menu: '',
      content: '',
      rating: null,
      image: null,
    });
  }

  addReviewHandler = () => {
    const fd = new FormData();
    const file = new File([this.image], 'random_name.jpg');
    fd.append('image', file);
    axios.post();
  }

  imageHandler = (data) => {
    this.setState({image: data.content });
  }

  render() {
    const imgUpload = <div><ImageSelectPreview onChange={(data) => this.imageHandler(data)} /></div>;
    return (
      <div className="addReview">
        {imgUpload}
      </div>
    );
>>>>>>> Stashed changes
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
