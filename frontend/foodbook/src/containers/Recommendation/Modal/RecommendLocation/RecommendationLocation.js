import React, { Component } from 'react'
import { Button, Icon, Modal, Image } from 'semantic-ui-react'

class RecommendationLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        trigger={
          <Button color="green" inverted> Recommend By Location! </Button>
        }
      >
        <Modal.Header>Modal #2</Modal.Header>
        <Modal.Content image scrolling>
          <Image size='large' src='http://127.0.0.1:8000/media/mocks/bbqChicken.jpeg' wrapped />
          <p>That's everything!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button icon='check' content='All Done' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default RecommendationLocation;