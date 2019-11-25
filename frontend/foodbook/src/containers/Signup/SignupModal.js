import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button, Modal, Header,
} from 'semantic-ui-react';

import Signup from '.';

class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;
    const { fixed, color } = this.props;

    return (
      <div className="signup-modal">
        <Modal
          open={open}
          onOpen={this.open}
          onClose={this.close}
          trigger={(
            <Button as="a" inverted={!fixed} onClick={this.open} color={color}>
              Sign up
            </Button>
          )}
        >
          <Header as="h2" color="teal" textAlign="center">
                Sign-up into Foodbook!
          </Header>
          <Modal.Content scrolling>
            <Signup closeModal={this.close} />
          </Modal.Content>
          <Modal.Actions>
            <Button icon="check" color="teal" form="signup-form" type="submit" content="Join" className="signup-submit-button" />
            <Button icon="x" color="teal" content="close" onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

SignupModal.propTypes = {
  fixed: propTypes.bool,
  color: propTypes.string,
};

SignupModal.defaultProps = {
  color: undefined,
  fixed: false,
};

export default SignupModal;
