import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/user/action_user';

class FriendList extends Component {
  constructor(props) {
    super(props);
    const { onGetFriends } = props;
    onGetFriends();
  }

  render() {
    const { friend } = this.props;

    const friendWithMe = friend.concat({ id: -1, nickname: 'me' });

    const newOptions = friendWithMe.reverse().map((f) => ({
      key: f.id,
      text: f.nickname,
      value: f.nickname,
    }));

    return (
      <div className="friendList">
        <Dropdown
          inline
          options={newOptions}
          defaultValue={newOptions[0].value}
          style={{ marginLeft: '3px' }}
        />
      </div>
    );
  }
}

FriendList.propTypes = {
  friend: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    nickname: propTypes.string,
  })),
  onGetFriends: propTypes.func.isRequired,
};

FriendList.defaultProps = {
  friend: [],
};

const mapStateToProps = (state) => ({
  friend: state.user.friend,
});

const mapDispatchToProps = (dispatch) => ({
  onGetFriends: () => dispatch(actionCreators.GET_FRIENDS()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
