import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button, Header, Modal, Icon,
} from 'semantic-ui-react';

import RecommendationLocation from './Modal/RecommendLocation';
import RecommendationTag from './Modal/RecommendTag';
// import RecommendationMenu from './Modal/RecommendMenu';
// import RecommendationFriend from './Modal/RecommendFriend';
/*
  return object should be like:
    friendsReviews(array of review object): reviews for friend's favorite choice for given menu
*/

export class Recommendation extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  show = () => () => this.setState({ open: true })

  close = () => {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const { open } = this.state;
    const { data, id } = this.props;

    return (
      <div className="Recommendation-wrapper">
        <Modal
          open={open}
          dimmer="blurring"
          trigger={
            <Button color="facebook" id="recom-modal-trigger" onClick={this.show()}> Get Recommendation! </Button>
          }
          onClose={this.close}
        >
          <Modal.Header>Get Recommendation!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header> Choose One:  </Header>
              <br />
              <RecommendationLocation data={data} id={id} />
              <br />
              <br />
              <RecommendationTag data={data} id={id} />
              <br />
              <br />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button id="close-recom-button" color="green" onClick={this.close} inverted>
              <Icon name="checkmark" />
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

Recommendation.propTypes = {
  data: propTypes.string,
  id: propTypes.number.isRequired,
  onClose: propTypes.func,
};

Recommendation.defaultProps = {
  data: 'menu',
  onClose: () => {},
};

export default Recommendation;
