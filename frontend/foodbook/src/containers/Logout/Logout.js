import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react';
import propTypes from 'prop-types';

import * as actionCreators from 'store/actions/user/action_user';

export const Logout = (props) => {
  const { onLogout } = props;
  return (
    <div className="logout">
      <Button onClick={onLogout} primary> Logout </Button>
    </div>
  );
};

Logout.propTypes = {
  onLogout: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actionCreators.LOGOUT()),
});

export default connect(null, mapDispatchToProps)(withRouter(Logout));
