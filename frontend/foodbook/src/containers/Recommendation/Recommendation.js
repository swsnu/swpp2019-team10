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

  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { data } = this.props;

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
              <RecommendationLocation data={data} />
              <br />
              <br />
              <RecommendationTag data={data} />
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
};

Recommendation.defaultProps = {
  data: 'menu',
};

export default Recommendation;
