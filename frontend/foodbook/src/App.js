import React from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import propTypes from 'prop-types';

import Main from 'components/Main';
import MainTest from 'components/MainTest';
import FormReview from 'containers/FormReview';
import ReviewDetail from 'containers/ReviewDetail';
import Introduce from 'components/Introduce';
import PrivateRoute from 'Utils/PrivateRouter';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const App = (props) => {
  const { history } = props;

  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Switch>
          <Route path="/introduce" exact component={Introduce} />
          <PrivateRoute path="/main" exact component={Main} history={history} />
          {/* <Route path="/main" exact component={Main} /> */}
          <PrivateRoute path="/maintest" exact component={MainTest} history={history} />
          <Route path="/main/upload" exact component={FormReview} />
          <Route path="/main/:id" exact render={(propsIn) => <ReviewDetail store={propsIn.store} history={propsIn.history} match={propsIn.match} />} />
          <Redirect to="/main" />
        </Switch>
      </div>
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: propTypes.objectOf(Object).isRequired,
};

export default App;
