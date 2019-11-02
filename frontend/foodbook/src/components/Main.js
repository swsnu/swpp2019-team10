import React, { Component } from 'react';
import {
  Container,
  Grid,
  Header,
  Menu,
  Popup,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import FriendList from 'containers/FriendList';
import ReivewPreview from 'components/ReviewPreview';

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
        mainRenderer = (
          <div className="main-feed-wrapper">
            <ReivewPreview
              key="1"
              imgUrl="https://www.yellowblissroad.com/wp-content/uploads/2015/07/lemon-chicken-fb.jpg"
              name="chicken"
              rating={3}
              tag={
          [{ name: 'crispy', positive: true }, { name: 'pricy', positive: false }]
}
            />
          </div>
        );
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

        <Grid columns={2} divided container stackable>
          <Grid.Row className="wrapper-friend">
            <Grid.Column width={4}>
              <FriendList />
              {/* TODO:  Implement here the friends tab */}
            </Grid.Column>
            {/* Friend Region */}

            <Grid.Column width={12} className="wrapper-reviews">
              <Grid.Row className="add-review">
                <Popup
                  trigger={(
                    <NavLink to="/upload/" className="ui medium image">
                      <i className="edit outline icon fluid massive center link" style={{ marginLeft: '85%' }} />
                    </NavLink>
                    )}
                  content="Add new review!"
                />
              </Grid.Row>
              <br />
              {mainRenderer}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
