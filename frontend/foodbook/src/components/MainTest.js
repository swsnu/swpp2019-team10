import React, { Component } from 'react';
import {
  Container,
  Header,
  Menu,
  Dropdown,
} from 'semantic-ui-react';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'bio' };
  }

  render() {
    const handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    const { activeItem } = this.state;

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

    // TODO: Loading Friend List

    return (
      <div>
        <Menu fixed colored color="teal" style={{ height: '50px' }}>
          <Container>
            <Menu.Item> FoodBook </Menu.Item>
            <Menu.Item as="a" active={activeItem === 'feed'} onClick={handleItemClick} name="feed">Feed</Menu.Item>
            <Menu.Item as="a" active={activeItem === 'calendar'} onClick={handleItemClick} name="calendar">Calendar</Menu.Item>
            <Menu.Item as="a" active={activeItem === 'location'} onClick={handleItemClick} name="location">Location</Menu.Item>
            <Menu.Item as="a" active={activeItem === 'category'} onClick={handleItemClick} name="category">Category</Menu.Item>

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
                  selection
                  search
                  options={friendOptions}
                  placeholder="Add New Friends..."
                  style={{ width: '180px', height: '13px', marginTop: '5px' }}
                  icon="search"
                />
              </Menu.Item>
              <Menu.Item
                name="logout"
              />
            </Menu.Menu>
          </Container>
        </Menu>
        <Container text style={{ marginTop: '5em' }}>
          <Header as="h1">Semantic UI React Fixed Template</Header>
          <p>This is a basic fixed menu template using fixed size containers.</p>
          <p>
        A text container is used for the main container, which is useful for single column layouts.
          </p>
        </Container>
      </div>
    );
  }
}

export default Main;
