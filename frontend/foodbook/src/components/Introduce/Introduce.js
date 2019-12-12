/* eslint max-classes-per-file: ["error", 3] */
/* eslint react/jsx-one-expression-per-line: 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
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
        color="blue"
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
          <Segment style={{ padding: '8em 3em' }} vertical>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={10}>
                  <br id="why-wrapper" />
                  <Header as="h3" style={{ fontSize: '2em', marginTop: '3em' }}>
                    Different Taste, Same Review on Same Place?
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
                  Are you using one of the following applications to search for restaurants?
                    <br />
                    <b>Mango Plate, Instagram, Naver (Kakao, Google) Map, Naver Blog. </b>
                    <br />
                  If so, you are wrong! We know everyone&apos;s tastes are different.
                    <br />
                  Don&apos;t struggle to hash out the restaurant reviews
                  that aren&apos;t relevant to <i>your tastes.</i>
                    <br />
                  Use our service, and get recommendations for restaurants
                    <i>related to your own taste.</i>
                  </p>
                  <Header as="h3" style={{ fontSize: '2em' }}>
                    Are your food photos still sleeping in the album?
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
                  Are you taking pictures of food habitually? So what do you do with those pictures?
                    <br />
                  The pictures are often posted once on social media and then simply forgotten.
                    <br />
                  Take advantage of the your <i>sleeping pictures of food!</i>
                    <br />
                  Take a simple record, and that will be one of the <i>history</i> of your taste.
                  </p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <Image bordered rounded size="large" alt="Image should be here" src="https://media.thetab.com/blogs.dir/4/files/2016/03/ginafood-1024x768.jpg" style={{ marginTop: '3em' }} />
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
                      Post your own reviews.
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                      Your comments <b>don&apos;t</b> have to <b>long or complex.</b> <br />
                      Our <i>Tagging service</i> will automatically analysis your comments.
                      <br />
                      Figure out why you <i>liked or hated</i> that food.
                    </p>
                  </Grid.Column>
                  <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                      Get Recommendations.
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                      Our <i>Recommendation algorithm</i> will seek <b>your own taste.</b>
                      <br />
                      Find the appropriate restaurant/menu which <b>matches well with you!</b>
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </div>
          <span id="what-wrapper" />
          <Segment vertical>
            <Container text>
              <Divider
                as="h4"
                className="header"
                horizontal
                style={{ margin: '5em 0em', textTransform: 'uppercase' }}
              >
                <span>Feature #1</span>
              </Divider>
              <Header as="h3" style={{ fontSize: '2em', textAlign: 'center' }}>
                Be a unique Reviewer!
              </Header>
              <p style={{ fontSize: '1.33em', marginTop: '1.5em' }}>
                Have you ever struggled to create a food reviewing blog and failed?
                <br />
                You don&apos;t have to try to be a <i>special reviewer.</i>
                Just keep posting it <b>like a diary.</b>
                <br />
                You will have become a great reviewer already.
                <br />
                Each taste is unique, so are you!
                <br />
              </p>

              <Divider
                as="h4"
                className="header"
                horizontal
                style={{ margin: '3em 0em', textTransform: 'uppercase' }}
              >
                <span>Feature #2</span>
              </Divider>
              <Header as="h3" style={{ fontSize: '2em', textAlign: 'center' }}>
                Feel hungry?
              </Header>
              <p style={{ fontSize: '1.33em', marginTop: '1.5em' }}>
              Hungry, but <i>haven&apos;t you decided</i> on the menu yet?
                <br />
              It is far more difficult to select the menu,
               especially when you are within indecisive friends.
                <br />
              Our service will recommend the restaurant and menu
              even when you don&apos;t know <i>what to eat.</i>
                <br />
              Of course, considering <b>your taste.</b>
              </p>

              <Divider
                as="h4"
                className="header"
                horizontal
                style={{ margin: '3em 0em', textTransform: 'uppercase' }}
              >
                <span>Feature #3</span>
              </Divider>
              <Header as="h3" style={{ fontSize: '2em', textAlign: 'center' }}>
                Finding good restaurants nearby?
              </Header>
              <p style={{ fontSize: '1.33em', marginTop: '1.5em' }}>
              Are you looking for a good restaurant in a strange place?
                <br />
              Get a recommendation for restaurants that <b>you</b> would like.
                <br />
              Stop searching
                <i>&quot;Best 10 Restuarants&quot;,
                </i> which other people than you may like.
                <br />
              </p>

              <Divider
                as="h4"
                className="header"
                horizontal
                style={{ margin: '3em 0em', textTransform: 'uppercase' }}
              >
                <span>Feature #4</span>
              </Divider>
              <Header as="h3" style={{ fontSize: '2em', textAlign: 'center' }}>
                Glance at other&apos;s taste.
              </Header>
              <p style={{ fontSize: '1.33em', marginTop: '1.5em' }}>
              You are going on a <i>date</i>, but can&apos;t decide what to eat?
                <br />
              Do you want to know <b>what kind of food she likes?</b>
                <br />
              In fact, she is unlikely to know what she likes either :)
                <br />
              Add her as <i>friend.</i>
                <b>Visit her feed.</b> You will find a choice you will never regret.
              </p>
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
