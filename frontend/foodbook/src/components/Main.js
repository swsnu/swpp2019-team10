import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Menu,
  Dropdown,
  Grid,
  Header,
  Container,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import Calendar from 'containers/RealCalendar';
import Category from 'components/Category';
import Myinfo from 'containers/Myinfo';
import FormReview from 'containers/FormReview';
import Location from 'containers/ReviewLocation';
import Logout from 'containers/Logout';
import FriendList from 'containers/FriendList';
import FriendSearch from 'containers/FriendSearch';
import Feed from './Layouts/Feed';

export class Main extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    const friendId = match.params.id ? match.params.id : -1;

    this.state = {
      selectedView: <Feed friendId={parseInt(friendId, 10)} />,
    };
  }

  render() {
    const { match } = this.props;

    const friendId = match.params.id ? match.params.id : -1;

    const handleItemClick = (e, { value }) => {
      if (value === 'feed') {
        this.setState({
          selectedView: <Feed friendId={parseInt(friendId, 10)} className="feed" />,
        });
      } else if (value === 'calendar') {
        this.setState({
          selectedView: <Calendar friendId={parseInt(friendId, 10)} className="calendar" />,
        });
      } else if (value === 'category') {
        this.setState({
          selectedView: <Category friendId={parseInt(friendId, 10)} className="category" />,
        });
      } else {
        this.setState({
          selectedView: <Location friendId={parseInt(friendId, 10)} className="location" />,
        });
      }
    };

    const viewOptions = [
      {
        key: 'feed',
        text: 'Feed',
        value: 'feed',
      },
      {
        key: 'location',
        text: 'Location',
        value: 'location',
      },
      {
        key: 'calendar',
        text: 'Calendar',
        value: 'calendar',
      },
      {
        key: 'category',
        text: 'Category',
        value: 'category',
      },
    ];

    const { selectedView } = this.state;
    const { history } = this.props;

    return (
      <div className="main">
        <Menu color="teal" style={{ height: '50px' }}>
          <Menu.Item>
            {' '}
            <Header as="h1"><NavLink to="/">FoodBook</NavLink></Header>
            {' '}
          </Menu.Item>
          <Menu.Item>
            <b>Change view:</b>
            <Dropdown
              scrolling
              options={viewOptions}
              placeholder="Change views"
              defaultValue={viewOptions[0].value}
              onChange={handleItemClick}
            />
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item>
                Go to friend&apos;s home:
              <FriendList history={history} />
            </Menu.Item>
            <Menu.Item>
              <FriendSearch />
            </Menu.Item>
            <Menu.Item style={{ marginRight: '50px' }}>
              <Logout history={history} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        {/*  Top Menu Region */}
        <Grid>
          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={6}>
              <Container className="myinfo">
                <Myinfo friendId={parseInt(friendId, 10)} />
              </Container>
            </Grid.Column>
            <Grid.Column width={2}>
              <FormReview mode="ADD" fixed={false} />
            </Grid.Column>
            <Grid.Column width={2} />
            {/* TODO: I Feel Hungry Button */}
            <Grid.Column width={4} />
          </Grid.Row>


          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={12} className="content-wrapper">
              <center>
                {selectedView}
              </center>
            </Grid.Column>
            <Grid.Column width={2} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Main.propTypes = {
  history: propTypes.objectOf(Object).isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default Main;
