import React, { Component } from 'react';
import {
  Route, Redirect, Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import propTypes from 'prop-types';

import * as actionCreators from 'store/actions/user/action_user';

import Main from 'components/Main';
import AddReview from 'containers/AddReview';
import ReviewDetail from 'containers/ReviewDetail';
import Introduce from 'components/Introduce';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

class App extends Component {
  constructor(props) {
    super(props);
    props.onLoad();
  }

  componentDidMount() {
    const { history, loggedIn, onLoad } = this.props;
    const redirectUrl = loggedIn ? '/main' : '/introduce';
    onLoad();
    history.push(redirectUrl);
  }

  render() {
    const { history, loggedIn } = this.props;
    const redirectUrl = loggedIn ? '/main' : '/introduce';

    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <Switch>
            <Route path="/introduce" exact component={Introduce} />
            <Route path="/main" exact component={Main} />
            <Route path="/main/upload" exact component={AddReview} />
            <Route path="/main/:id" exact render={(propsIn) => <ReviewDetail store={propsIn.store} history={propsIn.history} match={propsIn.match} />} />
            <Redirect to={redirectUrl} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  history: propTypes.objectOf(Object).isRequired,
  loggedIn: propTypes.bool.isRequired,
  onLoad: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.user.logged_in,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: () => dispatch(actionCreators.GET_USER_INFO()),
});

export default connect(mapStateToProps, mapDispatchToProps)((App));
