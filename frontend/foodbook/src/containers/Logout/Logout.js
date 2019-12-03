import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import axios from 'axios';

export const Logout = (props) => {
  const logoutHandler = () => {
    const { history } = props;

    axios.get('/api/signout/')
      .then(() => {
        history.push('/');
      });
  };

    return (
      <div className="logout">
        <Button onClick={logoutHandler}> Logout </Button>
      </div>
    );
}

Logout.propTypes = {
  history: propTypes.objectOf(Object).isRequired,
};

export default Logout;

