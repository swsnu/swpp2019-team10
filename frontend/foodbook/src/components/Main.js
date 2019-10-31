import React, { Component } from 'react';
import {
  Container,
  Grid,
  Header,
  Menu,
} from 'semantic-ui-react';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'feed',
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    let mainRenderer = <div />;

    switch (activeItem) {
      case 'feed':
        mainRenderer = (<div className="main-feed-wrapper"> Feed </div>);
        break;

      case 'calendar':
        mainRenderer = (<div className="main-calendar-wrapper"> calendar </div>);
        break;

      case 'location':
        mainRenderer = (<div className="main-location-wrapper"> location </div>);
        break;

      case 'type':
        mainRenderer = (<div className="main-type-wrapper"> type </div>);
        break;

      case 'menu':
        mainRenderer = (<div className="main-menu-wrapper"> menu </div>);
        break;

      default: // exceptional Case
        mainRenderer = (<div className="main-error-wrapper"> error </div>);
        break;
    }

    return (
      <div className="main">
        <Container text style={{ marginTop: '2em' }}>
          <Header as="h1">FoodBook</Header>
        </Container>
        {/* Title Region */}

        <Menu borderless style={menuStyle}>
          <Container text className="menu">
            <Menu.Item header>View:</Menu.Item>
            <Menu.Item as="a" active={activeItem === 'feed'} name="feed" onClick={this.handleItemClick} id="button-feed">
                Feed
            </Menu.Item>
            <Menu.Item as="a" active={activeItem === 'calendar'} name="calendar" onClick={this.handleItemClick} id="button-calendar">Calendar</Menu.Item>
            <Menu.Item as="a" active={activeItem === 'location'} name="location" onClick={this.handleItemClick} id="button-location">Location</Menu.Item>
            <Menu.Item as="a" active={activeItem === 'type'} name="type" onClick={this.handleItemClick} id="button-type">Type</Menu.Item>
            <Menu.Item as="a" active={activeItem === 'menu'} name="menu" onClick={this.handleItemClick} id="button-menu">Menu</Menu.Item>
          </Container>
        </Menu>
        {/* view select region */}

        <Container text>
          <Grid columns={2} divided>
            <Grid.Row className="wrapper-friend">
              <Grid.Column width={3}>
                Friend List View should rendered here
                {/* TODO:  Implement here the friends tab */}
              </Grid.Column>
              {/* Friend Region */}

              <Grid.Column width={13} className="wrapper-reviews">
                {mainRenderer}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/* Article Region */}
        </Container>
      </div>
    );
  }
}
