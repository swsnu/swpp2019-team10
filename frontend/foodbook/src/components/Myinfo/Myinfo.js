import React from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';

const Myinfo = (props) => {
  const { user } = props;

  const friend = user.number_of_friends;
  const review = user.number_of_reviews;

  const num = (
    <div className="ui statistics">
      <div className="statistic mini">
        <span>{friend}</span>
        <span className="friendNumWrapper">{friend === 0 ? 'Friend' : 'Friends'}</span>
      </div>
      <div className="statistic mini">
        <span>{review}</span>
        <span className="reviewNumWrapper">{review === 0 ? 'Review' : 'Reviews'}</span>
      </div>
    </div>
  );

  return (
    <div className="Myinfo">
      <div className="ui special cards">
        <div className="card">
          <div className="content">
            <div className="ui items">
              <div className="item">
                <div className="middle aligned content">
                  <div className="header">
                    {user.nickname}
                    <br />
                  </div>
                  {num}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
