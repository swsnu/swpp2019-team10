import React from 'react';
import {
  Route, Redirect, Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import propTypes from 'prop-types';

import Login from 'containers/Login'; // because we exported Login.js at the index.js, importing just directory is OK.
// also used the absolute path /src
import Main from 'components/Main';
import AddReview from 'containers/AddReview';

function App(props) {
  const { history } = props;

  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/main" exact component={Main} />
          <Route path="/main/upload" exact component={AddReview} />
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
