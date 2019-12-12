import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Item, Statistic } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/user/action_user';

class Myinfo extends Component {
  constructor(props) {
    super(props);
    const { friendId, onGetFriend } = props;
    if (friendId !== -1) {
      onGetFriend(friendId);
    }
  }

  render() {
    const { user, friend, friendId } = this.props;

    const friendNum = friendId === -1 ? user.number_of_friends : friend.number_of_friends;
    const reviewNum = friendId === -1 ? user.number_of_reviews : friend.number_of_reviews;

    const num = (
      <Statistic.Group size="small">
        <Statistic>
          <Statistic.Value>{friendNum}</Statistic.Value>
          <Statistic.Label className="friendNumWrapper">{friendNum === 1 ? 'Friend' : 'Friends'}</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{reviewNum}</Statistic.Value>
          <Statistic.Label className="reviewNumWrapper">{reviewNum === 1 ? 'Review' : 'Reviews'}</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    );

    return (
      <Item.Group className="Myinfo">
        <Item>
          <Item.Image size="small" src="https://image.flaticon.com/icons/svg/1662/1662439.svg" style={{ marginLeft: '-20px' }} />
          <Item.Content verticalAlign="middle">
            <Item.Header as="a">{friendId === -1 ? user.nickname : friend.nickname}</Item.Header>
            <Item.Description>{num}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

Myinfo.propTypes = {
  user: propTypes.shape({
    username: propTypes.string,
    phone_number: propTypes.string,
    age: propTypes.number,
    gender: propTypes.string,
    number_of_reviews: propTypes.number,
    number_of_friends: propTypes.number,
    nickname: propTypes.string,
  }).isRequired,
  friend: propTypes.shape({
    username: propTypes.string,
    phone_number: propTypes.string,
    age: propTypes.number,
    gender: propTypes.string,
    number_of_reviews: propTypes.number,
    number_of_friends: propTypes.number,
    nickname: propTypes.string,
  }),
  friendId: propTypes.number,
  onGetFriend: propTypes.func.isRequired,
};

Myinfo.defaultProps = {
  friend: undefined,
  friendId: -1,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  friend: state.user.friend,
});

const mapDispatchToProps = (dispatch) => ({
  onGetFriend: (id) => dispatch(actionCreators.GET_FRIEND_INFO(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Myinfo);
