import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button, Modal,
} from 'semantic-ui-react';
import Login from '.';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;
    const { history, fixed } = this.props;

    return (
      <Modal
        className="login-modal"
        open={open}
        onOpen={this.open}
        onClose={this.close}
        trigger={(
          <Button as="a" inverted={!fixed} onClick={this.open} style={{ marginRight: '10px' }}>
            Log in
          </Button>
      )}
      >
        <Modal.Header>
          Login
        </Modal.Header>
        <Modal.Content>
          <Login history={history} />
        </Modal.Content>
        <Modal.Actions>
          <Button icon="x" content="close" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  history: propTypes.objectOf(Object).isRequired,
  fixed: propTypes.bool,
};

LoginModal.defaultProps = {
  fixed: false,
};

export default LoginModal;
