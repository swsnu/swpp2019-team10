import React from 'react';
import propTypes from 'prop-types';
import { Item, Statistic, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';

const Myinfo = (props) => {
  const { user } = props;

  const friend = user.number_of_friends;
  const review = user.number_of_reviews;

  const num = (
    <Statistic.Group size='small'>
      <Statistic>
        <Statistic.Value>{friend}</Statistic.Value>
        <Statistic.Label className="friendNumWrapper">{friend === 1 ? 'Friend' : 'Friends'}</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{review}</Statistic.Value>
        <Statistic.Label className="reviewNumWrapper">{review === 1 ? 'Review' : 'Reviews'}</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  );

  return (
    <Card style={{ width: '630px' }} centered>
      <Item.Group className="Myinfo">
        <Item>
          <Item.Image size="small" src="https://image.flaticon.com/icons/svg/1662/1662439.svg" style={{ marginLeft: '-20px' }} />
          <Item.Content verticalAlign="middle">
            <Item.Header as="a">{user.nickname}</Item.Header>
            <Item.Description>{num}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Card>

  );
};

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
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(Myinfo);
