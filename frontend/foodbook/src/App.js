import React from 'react';
import {
  Route, Redirect, Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import propTypes from 'prop-types';

import Login from 'containers/Login'; // because we exported Login.js at the index.js, importing just directory is OK.
// also used the absolute path /src
import Main from 'components/Main';
import AddReview from 'containers/AddReview';
import ReviewDetail from 'containers/ReviewDetail';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

function App(props) {
  const { history } = props;

  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/main" exact component={Main} />
          <Route path="/main/upload" exact component={AddReview} />
          <Route path="/main/:id" exact render={(propsIn) => <ReviewDetail store={propsIn.store} history={propsIn.history} match={propsIn.match} />} />
          <Redirect exact from="/" to="/login" />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

App.propTypes = {
  history: propTypes.objectOf(Object).isRequired,
};

export default App;
