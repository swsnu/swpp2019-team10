import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/user/action_user';

class FriendList extends Component {
  constructor(props) {
    super(props);
    const { onGetFriends } = props;
    onGetFriends();
  }

  searchUserHandler = (prefix) => {
    const { onSearchUsers } = this.props;
    const pre = prefix.trim();
    if (pre.length > 0) {
      onSearchUsers(pre);
    } else {
      onSearchUsers('1');
    }
  }

  render() {
    const {
      friend, searchUsers, onAddFriend, onDeleteFriend,
    } = this.props;

    const friendList = friend.map((f) => (
      <div className="friend-detail" key={f.id}>
        <Button onClick={() => onDeleteFriend(f.id)}>{f.nickname}</Button>
      </div>
    ));

    const addList = searchUsers.map((u) => (
      <div className="add-user-detail" key={u.id}>
        <Button onClick={() => onAddFriend(u.id)}>{u.nickname}</Button>
      </div>
    ));

    return (
      <div className="friend-preview">
        <div className="ui special cards">
          <div className="card">
            <div className="content">
              <div className="header" style={{ textAlign: 'center' }}> Friend </div>
              <br />
              <div className="ui search">
                <div className="ui icon input fluid">
                  <input className="prompt" type="text" placeholder="Search Friends..." onChange={(event) => this.searchUserHandler(event.target.value)} />
                  <i className="search icon" />
                </div>
                <div className="results" />
              </div>
              <br />
              {friend.length > 0 ? 'My friends:' : null}
              {friendList}
              <br />
              {searchUsers.length > 0 ? 'Add friends:' : null}
              {addList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FriendList.propTypes = {
  friend: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    nickname: propTypes.string,
  })),
  searchUsers: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    nickname: propTypes.string,
  })),
  onGetFriends: propTypes.func.isRequired,
  onSearchUsers: propTypes.func.isRequired,
  onAddFriend: propTypes.func.isRequired,
  onDeleteFriend: propTypes.func.isRequired,
};

FriendList.defaultProps = {
  friend: [],
  searchUsers: [],
};

const mapStateToProps = (state) => ({
  friend: state.user.friend,
  searchUsers: state.user.searchUsers,
});

const mapDispatchToProps = (dispatch) => ({
  onGetFriends: () => dispatch(actionCreators.GET_FRIENDS()),
  onSearchUsers: (prefix) => dispatch(actionCreators.SEARCH_USERS(prefix)),
  onAddFriend: (id) => dispatch(actionCreators.ADD_FRIEND(id)),
  onDeleteFriend: (id) => dispatch(actionCreators.DELETE_FRIEND(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
