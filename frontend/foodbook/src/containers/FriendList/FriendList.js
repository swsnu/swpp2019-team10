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
    this.state = { value: '' };
  }

  handleChange = (e, { value }) => {
    const { history } = this.props;
    this.setState({ value });
    if (value === -1) {
      history.push('/');
    } else {
      history.push(`/friend/${value}`);
      window.location.reload(false);
    }
  }

  render() {
    const { friend } = this.props;
    const { value } = this.state;

    const friendWithMe = friend.concat({ id: -1, nickname: 'me' });

    const newOptions = friendWithMe.reverse().map((f) => ({
      key: f.id,
      text: f.nickname,
      value: f.id,
    }));

    return (
      <div className="friendList">
        <Dropdown
          inline
          options={newOptions}
          onChange={this.handleChange}
          style={{ marginLeft: '3px' }}
          value={value}
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
  history: propTypes.objectOf(Object).isRequired,
};

FriendList.defaultProps = {
  friend: [],
};

const mapStateToProps = (state) => ({
  friend: state.user.friends,
});

const mapDispatchToProps = (dispatch) => ({
  onGetFriends: () => dispatch(actionCreators.GET_FRIENDS()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
