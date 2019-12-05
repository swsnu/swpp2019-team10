import React, { Component } from 'react';
import {
  Grid,
  Header,
  Menu,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';

import FriendList from 'containers/FriendList';
import RealCalendar from 'containers/RealCalendar/RealCalendar';
import ReviewList from 'containers/ReviewList';
import FormReview from 'containers/FormReview/FormReview';
import Logout from 'containers/Logout';


export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'feed',
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { history } = this.props;
    const { activeItem } = this.state;

    let mainRenderer = <div />;

    switch (activeItem) {
      case 'feed':
        mainRenderer = (
          <div className="main-feed-wrapper">
            <ReviewList />
          </div>
        );
        break;

      case 'calendar':
        mainRenderer = (
          <div className="main-calendar-wrapper">
            <RealCalendar />
          </div>
        );
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
        <Grid columns={2} container stackable>
          <Grid.Row height={10}></Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header as="h1"><NavLink to="/main">FoodBook</NavLink></Header>
              <Logout history={history} />
            </Grid.Column>
          </Grid.Row>
          {/* view select region */}

          <Grid.Row className="wrapper-friend">
            <Grid.Column width={4}>
              <Grid.Row style={{ height: '50px' }}></Grid.Row>
              <Grid.Row><FriendList /></Grid.Row>
            </Grid.Column>
            {/* Friend Region */}

            <Grid.Column width={9} className="wrapper-reviews">
              <Grid.Row style={{ height: '50px' }}>
                <Menu pointing secondary>
                  <Menu.Item as="a" active={activeItem === 'feed'} name="feed" onClick={this.handleItemClick} id="button-feed">
                      Feed
                  </Menu.Item>
                  <Menu.Item as="a" active={activeItem === 'calendar'} name="calendar" onClick={this.handleItemClick} id="button-calendar">Calendar</Menu.Item>
                  <Menu.Item as="a" active={activeItem === 'location'} name="location" onClick={this.handleItemClick} id="button-location">Location</Menu.Item>
                  <Menu.Item as="a" active={activeItem === 'type'} name="type" onClick={this.handleItemClick} id="button-type">Type</Menu.Item>
                  <Menu.Item as="a" active={activeItem === 'menu'} name="menu" onClick={this.handleItemClick} id="button-menu">Menu</Menu.Item>
                </Menu>
              </Grid.Row>
              <Grid.Row className="add-review">
                <div className="ui special cards">
                  <div className="card" style={{ width: '630px' }}>
                    <div className="content">
                      <FormReview fixed={false} />
                    </div>
                  </div>
                </div>
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

Main.propTypes = {
  history: propTypes.objectOf(Object).isRequired,
};
