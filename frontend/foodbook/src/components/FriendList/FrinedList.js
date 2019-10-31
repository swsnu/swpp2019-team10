import React from 'react';
import { Button, Container } from 'semantic-ui-react';

const FrinedList = () => (
  <div className="friend-preivew">
    <div className="ui special cards">
      <div className="card">
        <div className="content">
          <span className="header"> Friend </span>
          <Container text>
            <div> Kim </div>
            <div> Lee </div>
            <div> Park </div>
            <div> Choi </div>
          </Container>
        </div>

        <div className="extra">
          <Button> This is Mock </Button>
        </div>
      </div>
    </div>
  </div>
);

export default FrinedList;
