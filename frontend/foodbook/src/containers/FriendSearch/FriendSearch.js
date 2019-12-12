import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button,
  Dropdown,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/user/action_user';

class FriendSearch extends Component {
  constructor() {
    super();
    this.state = { value: '' };
  }

  handleChange = (e, { value }) => this.setState({ value })

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
    const { searchUsers, onAddFriend } = this.props;
    const { value } = this.state;

    const newOptions = searchUsers.map((f) => ({
      key: f.id,
      text: f.nickname,
      value: f.id,
    }));

    const button = (
      <Button onClick={() => onAddFriend(value)} disabled={value === ''} style={{marginLeft: '10px'}}> Add </Button>
    );

    return (
      <div className="searchFriend">
        <Dropdown
          scrolling
          selection
          search
          options={newOptions}
          onSearchChange={(event) => { this.searchUserHandler(event.target.value); }}
          onChange={this.handleChange}
          placeholder="Add New Friends..."
          style={{ width: '180px', height: '13px', marginTop: '5px' }}
          icon="search"
          value={value}
        />
        {button}
      </div>
    );
  }
}

FriendSearch.propTypes = {
  searchUsers: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    nickname: propTypes.string,
  })),
  onSearchUsers: propTypes.func.isRequired,
  onAddFriend: propTypes.func.isRequired,
};

FriendSearch.defaultProps = {
  searchUsers: [],
};

const mapStateToProps = (state) => ({
  searchUsers: state.user.searchUsers,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchUsers: (prefix) => dispatch(actionCreators.SEARCH_USERS(prefix)),
  onAddFriend: (id) => dispatch(actionCreators.ADD_FRIEND(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendSearch);
