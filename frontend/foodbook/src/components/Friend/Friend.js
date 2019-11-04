import React from 'react';
import propTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

const Friend = (props) => {
  const {
    name, picture, friend, review,
  } = props;

  return (
    <div className="Friend">
      <div className="ui special cards">
        <div className="card">
          <div className="content">
            <div className="ui items">
              <div className="item">
                <div className="ui tiny image">
                  <img src={picture} alt="profile for user" />
                </div>
                <div className="middle aligned content">
                  <div className="header">
                    {name}
                    <br />
                    <div className="ui statistics">
                      <div className="statistic mini">
                        <div className="value">
                          {friend}
                        </div>
                        <div className="friend label">
                          <span className="friendNumWrapper">{friend === '0' ? 'Friend' : 'Friends'}</span>
                        </div>
                      </div>
                      <div className="statistic mini">
                        <div className="value">
                          {review}
                        </div>
                        <div className="review label">
                          <span className="reviewNumWrapper">{review === '0' ? 'Review' : 'Reviews'}</span>
                        </div>
                      </div>
                    </div>
                    <Popup trigger={<i className="like icon link" />} content="Add Friend" basic />
                    <Popup trigger={<i className="arrow circle right icon" />} content="Go to Friend's Home" basic />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Friend.propTypes = {
  name: propTypes.string.isRequired,
  picture: propTypes.string.isRequired,
  friend: propTypes.string.isRequired,
  review: propTypes.string.isRequired,
};

export default Friend;
