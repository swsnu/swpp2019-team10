import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/user/action_user';
import Friend from '../../components/Friend';

class FriendList extends Component {
  constructor(props) {
    super(props);
    const { onGetFriends } = props;
    onGetFriends();
  }

  render() {
    const { friend } = this.props;

    const friendList = friend.map((f) => <Friend key={f.id} name={f.nickname} friend="0" review="0" />);

    return (
      <div className="friend-preview">
        <div className="ui special cards">
          <div className="card">
            <div className="content">
              <div className="header" style={{ textAlign: 'center' }}> Friend </div>
              <br />
              <div className="ui search">
                <div className="ui icon input fluid">
                  <input className="prompt" type="text" placeholder="Search Friends..." />
                  <i className="search icon" />
                </div>
                <div className="results" />
              </div>
              <br />
              {friendList}
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
