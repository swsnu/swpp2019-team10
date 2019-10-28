import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


const Login = () => (
  // some behavior or rendering should be added in sprint 4.
  <div className="login">
    <Card centered>
      <Card.Content>
        <Card.Header textAlign="center"> FoodBook </Card.Header>
        <Card.Meta textAlign="center"> Sprint 3 </Card.Meta>
        <Card.Description>
          <center><Button content="Login" onClick={() => {}} /></center>
          {/* this is mock */}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <Icon name="user" />
          Team 10
      </Card.Content>
    </Card>
  </div>
);

export default Login;
