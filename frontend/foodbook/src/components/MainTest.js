import React, { Component } from 'react';
import {
  Menu,
  Dropdown,
  Grid,
} from 'semantic-ui-react';

import Calendar from 'containers/RealCalendar';
import Category from 'components/Category';
import Feed from './Layouts/Feed';

export class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedView: <Feed />,
    };
  }

  render() {
    const handleItemClick = (e, { value }) => {
      console.log('e', e);
      console.log('value', value)
    switch (value) {
      case 'feed':
        this.setState({
          selectedView: <Feed />,
        });
        break;

      case 'calendar':
          this.setState({
            selectedView: <Calendar />,
          });
        break;

      // case 'location':
      //   this.selectedView = <Location />;
      //   break;

      case 'category':
          this.setState({
            selectedView: <Category />,
          });

      default:
        break;
    } // TODO: change this function to work properly
    };

    const friendOptions = [
      {
        key: 'Me',
        text: 'Me',
        value: 'Me',
      },
      {
        key: 'Jenny Hess',
        text: 'Jenny Hess',
        value: 'Jenny Hess',
      },
      {
        key: 'Elliot Fu',
        text: 'Elliot Fu',
        value: 'Elliot Fu',
      },
      {
        key: 'Stevie Feliciano',
        text: 'Stevie Feliciano',
        value: 'Stevie Feliciano',
      },
      {
        key: 'Christian',
        text: 'Christian',
        value: 'Christian',
      },
    ];

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

    // TODO: Loading Friend List
    const { selectedView } = this.state;

    return (
      <div className="main">
        <Menu color="teal" style={{ height: '50px' }}>
          <Menu.Item> FoodBook </Menu.Item>
          <Menu.Item>
                  Change view:
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
              <Dropdown
                inline
                options={friendOptions}
                defaultValue={friendOptions[0].value}
                style={{ marginLeft: '3px' }}
              />
            </Menu.Item>
            <Menu.Item>
              <Dropdown
                scrolling
                selection
                search
                options={friendOptions}
                placeholder="Add New Friends..."
                style={{ width: '180px', height: '13px', marginTop: '5px' }}
                icon="search"
              />
            </Menu.Item>
            <Menu.Item style={{ marginRight: '50px' }}>
                     Logout
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        {/*  Top Menu Region */}
        <Grid>
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

export default Main;
