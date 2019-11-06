import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button, Modal, Divider
} from 'semantic-ui-react';
import ReviewPreview from 'components/ReviewPreview';

class RecommendationTag extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;
    const { data } = this.props;

    const recoList = [];

    data.forEach((re) => {
      recoList.push(
        <div key={re.tag} className="recommendation-tag-wrapper">
          You liked it because...
          <h3>{`It was ${re.tag}!`}</h3>

          {re.reviewsForTag.map((review) => (
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
          ))}
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
          <Button color="green" inverted> Recommend By Your Tag! </Button>
        }
      >
        <Modal.Header>
          Recommendation By Tag!
        </Modal.Header>
        <Modal.Content scrolling>
          {recoList}
        </Modal.Content>
        <Modal.Actions>
          <Button icon="check" content="All Done" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}

RecommendationTag.propTypes = {
  data: propTypes.arrayOf(Object).isRequired,
};

export default RecommendationTag;
