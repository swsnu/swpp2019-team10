import React from 'react';
import propTypes from 'prop-types';

const Friend = (props) => {
  const {
    name,
  } = props;

  return (
    <div className="Friend">
      <div className="ui special cards">
        <div className="card">
          <div className="content">
            <div className="ui items">
              <div className="item">
                <div className="middle aligned content">
                  <div className="header">
                    {name}
                    <br />
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
};

export default Friend;
