import {
  Container,
  Grid,
  // Header,
  // Menu,
} from 'semantic-ui-react';

import React, { Component } from 'react';
// import { Button } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { axios } from 'axios';
import ImageSelectPreview from 'react-image-select-pv';
import StarRating from '../../components/StarRating/StarRating';
// import * as actionCreators from '../../Stores/Actions/index';

class AddReview extends Component {
  componentDidMount() {
    this.setState({
      // restauerant: '',
      // menu: '',
      // content: '',
      rating: 0,
      // https://codepen.io/depy/pen/vEWWdw
      // location: null,
      image: null,
    });
  }

  mapLoaded = () => {

  }

  addReviewHandler = () => {
    const postID = this.postContentHandler();
    this.postImageHandler(postID);

    this.history.push('/main');
  }

  postContentHandler = () => {
    const { rating } = this.state;
    const reviewDict = {
      rating,
    };
    axios.post('/api/review/', reviewDict);

    return 0;
  }

  postImageHandler = (postID) => {
    const { image } = this.state;

    const fd = new FormData();
    const file = new File([image], 'img.jpg');

    fd.append('image', file);
    axios.post(`/api/review/${postID}/image/`, fd);
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

    /* to be worked on */
    const googleMap = (<div className="locationGoogle" />);

    return (
      <div className="addReview">
        <Container text>
          <Grid rows={2} divided>
            <Grid.Row className="upload">
              <Grid.Column width={10}>
                {imgUpload}
              </Grid.Column>
              <Grid.Column width={10}>
                {googleMap}
              </Grid.Column>
            </Grid.Row>
            <StarRating onChange={(rating) => this.setState({ rating })} />
          </Grid>
        </Container>
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
