import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button, Modal, Divider,
} from 'semantic-ui-react';
import ReviewPreview from 'components/ReviewPreview';

class RecommendationFriend extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;
    const { data } = this.props;

    const freindsReview = [];

    data.forEach((review) => {
      freindsReview.push(
        <div className={review.author} key={review.id}>
          <h3>{`Your Friend ${review.author} Likes`}</h3>
          <ReviewPreview
            key={review.id}
            id={review.id}
            author={review.author}
            menu={review.menu}
            rating={review.rating}
            date={review.date}
            isMine={review.isMine}
            image={review.image}
            tag={review.tag}
          />
          <Divider> </Divider>
        </div>,
      );
    });

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        trigger={
          <Button color="green" inverted> Recommend By Your Friends! </Button>
        }
      >
        <Modal.Header>
          Recommendation By Your Friends!
        </Modal.Header>
        <Modal.Content scrolling>
          <div className="recommendation-friends-wrapper">
            <div style={{ marginLeft: '12%' }}>{freindsReview}</div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="check" content="All Done" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}

RecommendationFriend.propTypes = {
  data: propTypes.arrayOf(Object).isRequired,
};

export default RecommendationFriend;
