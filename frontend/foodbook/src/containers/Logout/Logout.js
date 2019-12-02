import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import * as actionCreators from 'store/actions/user/action_user';

export class Logout extends Component {
  logoutHandler = () => {
    const { onLogout } = this.props;
    onLogout();
  };

  render() {
    const { logoutHandler } = this;

    return (
      <div className="logout">
        <Button onClick={logoutHandler}> Logout </Button>
      </div>
    );
  }
}

Logout.propTypes = {
  onLogout: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actionCreators.LOGOUT()),
});

export default connect(null, mapDispatchToProps)(withRouter(Logout));
