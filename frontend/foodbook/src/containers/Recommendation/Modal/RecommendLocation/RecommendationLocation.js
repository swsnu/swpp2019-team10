import React, { Component } from 'react';
import {
  Button, Header, Image, Modal,
} from 'semantic-ui-react';

class RecommendationLocation extends Component {
    state = { open: false }

    show = (dimmer) => () => this.setState({ dimmer, open: true })

    close = () => this.setState({ open: false })

    render() {
      const { open, dimmer } = this.state;

      return (
        <div>
          <Button onClick={this.show('blurring')}>Show</Button>

          <Modal dimmer={dimmer} open={open} onClose={this.close}>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image scrolling>
              <Image
                wrapped
                size="medium"
                src="/images/avatar/large/rachel.png"
              />
              <Modal.Description>
                <Header>Default Profile Image</Header>
                <p>
                  We have found the following gravatar image associated with your
                  e-mail address.
                </p>
                <p>Is it okay to use this photo?</p>

                <p>
                  We have found the following gravatar image associated with your
                  e-mail address.
                </p>
                <p>Is it okay to use this photo?</p>

                <p>
                  We have found the following gravatar image associated with your
                  e-mail address.
                </p>
                <p>Is it okay to use this photo?</p>

                <p>
                  We have found the following gravatar image associated with your
                  e-mail address.
                </p>
                <p>Is it okay to use this photo?</p>

                <p>
                  We have found the following gravatar image associated with your
                  e-mail address.
                </p>
                <p>Is it okay to use this photo?</p>

                <p>
                  We have found the following gravatar image associated with your
                  e-mail address.
                </p>
                <p>Is it okay to use this photo?</p>

                <p>
                  We have found the following gravatar image associated with your
                  e-mail address.
                </p>
                <p>Is it okay to use this photo?</p>

                <p>
                  We have found the following gravatar image associated with your
                  e-mail address.
                </p>
                <p>Is it okay to use this photo?</p>

                <p>
                  We have found the following gravatar image associated with your
                  e-mail address.
                </p>
                <p>Is it okay to use this photo?</p>

                <p>
                  We have found the following gravatar image associated with your
                  e-mail address.
                </p>
                <p>Is it okay to use this photo?</p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={this.close}>
                Nope
              </Button>
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="Yep, that's me"
                onClick={this.close}
              />
            </Modal.Actions>
          </Modal>
        </div>
      );
    }
}

export default RecommendationLocation;
