import _ from 'lodash';
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

const Paragraph = () => (
  <p className="mock-article">
    {[
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ',
      'tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas ',
      'semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ',
      'ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean ',
      'fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. ',
      'Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor ',
      'neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, ',
      'accumsan porttitor, facilisis luctus, metus',
    ].join('')}
  </p>
);


export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: null,
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <div className="main">
        <Container text style={{ marginTop: '2em' }}>
          <Header as="h1">FoodBook</Header>
        </Container>

        <Menu
          borderless
          style={menuStyle}
        >
          <Container text className="menu">
            <Menu.Item header>View:</Menu.Item>
            <Menu.Item
              as="a"
              active={activeItem === 'feed'}
              name="feed"
              onClick={this.handleItemClick}
              id="button-feed
            "
            >
Feed
            </Menu.Item>
            <Menu.Item as="a" active={activeItem === 'calendar'} name="calendar" onClick={this.handleItemClick} id="button-calendar">Calendar</Menu.Item>
            <Menu.Item as="a" active={activeItem === 'location'} name="location" onClick={this.handleItemClick} id="button-location">Location</Menu.Item>
            <Menu.Item as="a" active={activeItem === 'type'} name="type" onClick={this.handleItemClick} id="button-type">Type</Menu.Item>
            <Menu.Item as="a" active={activeItem === 'menu'} name="menu" onClick={this.handleItemClick} id="button-menu">Menu</Menu.Item>
          </Container>
        </Menu>

        <Container text>
          <Grid columns={2} divided>
            <Grid.Row className="wrapper-friend">
              <Grid.Column width={3}>
                aa
                {/* Todo:  Implement here the friends tab */}
              </Grid.Column>

              <Grid.Column width={13} className="wrapper-reviews">
                {_.times(10, (i) => (
                  <Paragraph key={i} />
                ))}
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Container>
      </div>
    );
  }
}
