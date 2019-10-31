import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';

import Login from 'containers/Login'; // because we exported Login.js at the index.js, importing just directory is OK.
// also used the absolute path /src
import Main from 'components/Main';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/main" exact component={Main} />
          <Redirect exact from="/" to="/login" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
