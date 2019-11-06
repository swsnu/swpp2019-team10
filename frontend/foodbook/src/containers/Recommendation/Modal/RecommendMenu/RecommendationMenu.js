import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button, Modal, Divider,
} from 'semantic-ui-react';
import ReviewPreview from 'components/ReviewPreview';

class RecommendationMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;
    const { data } = this.props;

    const recentList = [];
    const frequentList = [];

    data.recentVisit.forEach((review) => {
      recentList.push(
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
        />,
      );
    });

    data.frequentVisit.forEach((review) => {
      frequentList.push(
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
        />,
      );
    });

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        trigger={
          <Button color="green" inverted> Recommend By Your Visit! </Button>
        }
      >
        <Modal.Header>
          Recommendation By Your Visit!
        </Modal.Header>
        <Modal.Content scrolling>
          <div className="recommendation-menu-recent-wrapper">
            <h2> You have recently visited here! </h2>
            <div style={{ marginLeft: '12%' }}>{recentList}</div>
          </div>
          <Divider horizontal> </Divider>
          <div className="recommendation-menu-frequent-wrapper">
            <h2> You frequently visited here! </h2>
            <div style={{ marginLeft: '12%' }}>{frequentList}</div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="check" content="All Done" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}

RecommendationMenu.propTypes = {
  data: propTypes.objectOf(Object).isRequired,
};

export default RecommendationMenu;
