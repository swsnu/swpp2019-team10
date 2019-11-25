import React from 'react';
import {
  Route, Redirect, Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import propTypes from 'prop-types';

import Main from 'components/Main';
import FormReview from 'containers/FormReview';
import ReviewDetail from 'containers/ReviewDetail';
import Introduce from 'components/Introduce';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

function App(props) {
  const { history } = props;

  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Introduce} />
          <Route path="/main" exact component={Main} />
          <Route path="/main/upload" exact component={FormReview} />
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
