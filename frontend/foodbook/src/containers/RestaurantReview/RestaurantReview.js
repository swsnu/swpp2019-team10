import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Button, Modal, Header, List,
} from 'semantic-ui-react';
import * as actionCreators from 'store/actions/review/action_review';
import ReviewPreview from 'components/ReviewPreview/ReviewPreview';

class RestaurantReview extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  clickHandler = (id) => {
    const { onGetAll } = this.props;
    onGetAll(id);
  }

  render() {
    const { open } = this.state;
    const { reviews, data } = this.props;

    let reviewList = reviews.map((review) => (
      <ReviewPreview
        key={`${review.id}`}
        id={review.id}
        author={review.author}
        restaurant={review.restaurant}
        menu={review.menu}
        content={review.content}
        image={review.image}
        rating={review.rating}
        date={review.date}
        tag={review.tag}
        isMine={review.isMine}
      />
    ));


    reviewList = (
      <List id="reviewList">
        {reviewList}
      </List>
    );

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        trigger={(
          <Button id="res-list-button" color="green" onClick={() => this.clickHandler(data.id)} inverted>
            {' '}
Show Reviews of
            {data.name}
!
            {' '}
          </Button>
        )}
      >
        <Modal.Header>
          {`Review for ${data.name}!`}
        </Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description>
            <Header> Reviews </Header>
            {reviewList}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button id="res-list-close-button" icon="check" content="All Done" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}

RestaurantReview.propTypes = {
  reviews: propTypes.arrayOf(Object),
  onGetAll: propTypes.func.isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
  data: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    longitude: propTypes.string,
    latitude: propTypes.string,
    rating: propTypes.number,
    my_rating: propTypes.number,
    other_rating: propTypes.number,
  }).isRequired,
};

RestaurantReview.defaultProps = {
  reviews: [],
};

const mapStateToProps = (state) => ({
  reviews: state.review.reviewRestaurantList,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAll: (id) => {
    dispatch(actionCreators.GET_RESTAURANT_REVIEWS(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RestaurantReview));
