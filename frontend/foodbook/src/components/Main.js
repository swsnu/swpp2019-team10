import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container,
  Grid,
  Header,
  Menu,
  Visibility,
} from 'semantic-ui-react'

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}

const Paragraph = () => (
  <p>
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
)


export default class Main extends Component {
    state = {
        menuFixed: false,
        activeItem: null,
    }
    
  handleItemClick = (e, { name }) => this.setState({activeItem: name})
  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickTopMenu = () => this.setState({ menuFixed: false })

  render() {
    const { menuFixed, activeItem } = this.state

    return (
      <div>
        <Container text style={{ marginTop: '2em' }}>
          <Header as='h1'>FoodBook</Header>
        </Container>

        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            borderless
            fixed={menuFixed ? 'top' : undefined}
            style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            <Container text>
              <Menu.Item header>View:</Menu.Item>
              <Menu.Item as='a' active={activeItem === 'feed'} name='feed' onClick={this.handleItemClick}>Feed</Menu.Item>
              <Menu.Item as='a' active={activeItem === 'calendar'} name='calendar' onClick={this.handleItemClick}>Calendar</Menu.Item>
              <Menu.Item as='a' active={activeItem === 'activeItem'} name='location' onClick={this.handleItemClick}>Location</Menu.Item>
              <Menu.Item as='a' active={activeItem === 'type'} name='type' onClick={this.handleItemClick}>Type</Menu.Item>
              <Menu.Item as='a' active={activeItem === 'menu'} name='menu' onClick={this.handleItemClick}>Menu</Menu.Item>
            </Container>
          </Menu>
        </Visibility>

        <Container text>
            <Grid columns= {2} divided>
                <Grid.Row>
                    <Grid.Column width={3}>
                        {/* Todo:  Implement here the friends tab */}
                    </Grid.Column>

                    <Grid.Column width={13}>
                        {_.times(10, (i) => (
                            <Paragraph key={i} />
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Container>
      </div>
    )
  }
}