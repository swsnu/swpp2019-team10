import React from 'react';
import { Popup, Rating } from 'semantic-ui-react';

const FrinedList = () => (
  <div className="friend-preivew">
    <div className="ui special cards">
      <div className="card">
        <div className="content">
          <span className="header"> Friend </span>
          <div className="ui items">
            <div className="item">
              <a className="ui tiny image">
                <img src="https://semantic-ui.com/images/avatar/large/jenny.jpg" />
              </a>
              <div className="middle aligned content">
                <div className="header"> Veronika <br />
                <Popup trigger={<i className="like icon link" />} content="Add Friend" basic />
                <Popup trigger={<i className="arrow circle right icon" />} content="Go to Friend's Home" basic />
                  
                </div>
              </div>
            </div>
            <div className="item">
              <a className="ui tiny image">
                <img src="https://semantic-ui.com/images/avatar/large/justen.jpg" />
              </a>
              <div className="middle aligned content">
                <div className="header"> Justen Kitsune <br />
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

export default FrinedList;
