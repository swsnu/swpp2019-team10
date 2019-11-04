import React from 'react';
import Friend from 'components/Friend';

const FriendList = () => (
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
          <Friend name="Semantic UI" picture="https://semantic-ui.com/images/logo.png" friend="123" review="0" />
          <Friend name="React" picture="https://cdn.auth0.com/blog/react-js/react.png" friend="999" review="123" />
        </div>
      </div>
    </div>
  </div>
);

export default FriendList;
