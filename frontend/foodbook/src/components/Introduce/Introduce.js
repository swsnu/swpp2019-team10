/* eslint max-classes-per-file: ["error", 3] */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';

import { connect } from 'react-redux';

import * as actionCreators from 'store/actions/user/action_user';

import LoginModal from 'containers/Login/LoginModal';
import SignupModal from 'containers/Signup/SignupModal';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const HomepageHeading = (props) => {
  const { mobile } = props;

  return (
    <Container text>
      <Header
        as="h1"
        content="FoodBook"
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
        }}
      />
      <Header
        as="h2"
        content="Why are you depending solely on other's taste?"
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
    </Container>
  );
};

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

HomepageHeading.defaultProps = {
  mobile: false,
};

class DesktopContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  hideFixedMenu = () => this.setState({ fixed: false })

  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children, history } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" href="#start-wrapper" active>
                  Start
                </Menu.Item>
                <Menu.Item as="a" href="#why-wrapper">Why</Menu.Item>
                <Menu.Item as="a" href="#how-wrapper">How</Menu.Item>
                <Menu.Item as="a" href="#what-wrapper">What</Menu.Item>
                <Menu.Item position="right">
                  <LoginModal history={history} fixed={fixed} />
                  <SignupModal history={history} fixed={fixed} />
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading history={history} />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.defaultProps = {
  children: undefined,
};

DesktopContainer.propTypes = {
  children: PropTypes.node,
  history: PropTypes.objectOf(Object).isRequired,
};

class MobileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children, history } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" href="#star-wrapper" active>
            Start
          </Menu.Item>
          <Menu.Item as="a" href="#why-wrapper">Why</Menu.Item>
          <Menu.Item as="a" href="#what-wrapper">What</Menu.Item>
          <Menu.Item as="a" href="#how-wrapper">How</Menu.Item>
          <LoginModal history={history} fixed={false} />
          <SignupModal history={history} fixed={false} />
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <LoginModal history={history} fixed={false} />
                  <SignupModal history={history} fixed={false} />
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile history={history} />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.defaultProps = {
  children: undefined,
};

MobileContainer.propTypes = {
  children: PropTypes.node,
  history: PropTypes.objectOf(Object).isRequired,
};

const ResponsiveContainer = (props) => {
  const { history, children } = props;

  return (
    <div>
      <DesktopContainer history={history}>{children}</DesktopContainer>
      <MobileContainer history={history}>{children}</MobileContainer>
    </div>
  );
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export class Introduce extends Component {
  constructor(props) {
    super(props);

    const { onLoad, history } = this.props;
    onLoad().then((res) => {
      if (res.type === 'GET_USER_INFO') {
        history.push('/main/');
      }
    }).catch();
  }

  render() {
    const { history } = this.props;

    return (
      <div id="start-wrapper">
        <ResponsiveContainer history={history}>
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={8}>
                  <br id="why-wrapper" />
                  <Header as="h3" style={{ fontSize: '2em' }}>
                Here Should contain contents about how our service works.
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
                  Ea esse laborum quis dolor irure dolore aliqua.
                  Laborum aliqua aliquip minim tempor ipsum exercitation culpa ullamco laboris.
                  Aliquip adipisicing non id minim ut Lorem ullamco eu fugiat.
                  Cillum nostrud irure enim officia sit mollit exercitation
                  nisi occaecat adipisicing labore amet anim sit.
                  Id commodo tempor ullamco nostrud adipisicing cillum cupidatat anim occaecat.
                  Consectetur velit consectetur in ex ipsum. Labore et mollit aliquip cupidatat.
                  </p>
                  <Header as="h3" style={{ fontSize: '2em' }}>
                Here should contain our strength/novelty of our service.
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
                Sunt ad id officia in occaecat voluptate pariatur.
                Sit reprehenderit Lorem tempor sunt ex Lorem irure nulla ullamco sunt ad.
                Aliquip exercitation deserunt incididunt anim velit exerciation Lorem irure nostrud.
                  </p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <Image bordered rounded size="large" alt="Image should be here" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <div id="how-wrapper">
            <Segment style={{ padding: '0em' }} vertical>
              <Grid celled="internally" columns="equal" stackable>
                <Grid.Row textAlign="center">
                  <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                    How one
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>should contain how our service will work</p>
                  </Grid.Column>
                  <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                    How two
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                    should contain how our service will work
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </div>
          <span id="what-wrapper" />
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
              <Header as="h3" style={{ fontSize: '2em' }}>
              Here should be what our service has to serve.
              </Header>
              <p style={{ fontSize: '1.33em' }}>
            Anim elit nisi esse duis enim.
            Ex consectetur pariatur tempor aute eiusmod irure est et anim
            fugiat irure eiusmod ea nostrud.
            Sint est ex aute minim et labore voluptate quis proident.
            Do voluptate enim minim adipisicing velit.
            Nisi cupidatat officia do aliquip fugiat est commodo laboris.
            In irure nostrud sint ex deserunt duis aliquip tempor exercitation minim nisi ullamco.
              </p>
              <Button as="a" size="large">
            Preview
              </Button>
              <Divider
                as="h4"
                className="header"
                horizontal
                style={{ margin: '3em 0em', textTransform: 'uppercase' }}
              >
                <span>Feature #1</span>
              </Divider>
              <Header as="h3" style={{ fontSize: '2em' }}>
            Feature Title
              </Header>
              <p style={{ fontSize: '1.33em' }}>
            Voluptate aute ex esse duis excepteur nulla veniam incididunt cupidatat.
            sit ipsum fugiat aliqua voluptate.
            Voluptate excepteur mollit velit laborum est magna magna quis mollit fugiat aute.
            Sint pariatur irure aliquip ut dolore excepteur ad minim cupidatat occaecat larum do.
            Adipisicing in mollit aliqua dolor.
            Laborum dolor sint do sint laborum esse qui ea laborum eiusmod.
            Nostrud qui occaecat consectetur ad. Nisi consectetur excepteur excepteur in.
              </p>
              <Button as="a" size="large">
            Preview
              </Button>
            </Container>
          </Segment>
        </ResponsiveContainer>
      </div>
    );
  }
}

Introduce.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
  onLoad: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({ onLoad: () => dispatch(actionCreators.GET_USER_INFO()) }
);

export default connect(null, mapDispatchToProps)(Introduce);
