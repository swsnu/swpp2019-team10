import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button, Modal, Image, Header, List,
} from 'semantic-ui-react';
import './RecommendationLocation.css';

class RecommendationLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;
    const { data } = this.props;

    const reviews = data.reco_list;

    const parseReason = (reason) => {
      if (reason) {
        if (reason.includes('HATE')) {
          if (reason.includes('MY')) return 'BLUE';
          return 'PURPLE';
        } if (reason.includes('FAVORITE')) {
          if (reason.includes('MY')) return 'RED';
          return 'PINK';
        }
      }
      return undefined;
    };

    const parseScore = (score) => {
      if (score >= 4) return 'RED';
      if (score < 3) return 'BLUE';
      return undefined;
    };

    let recommendList = reviews.map((e) => (
      <List.Item key={e.rank}>
        <List.Icon name="marker" />
        <List.Content>
          <List.Header as="a" href={e.link} target="_blank" rel="noopener noreferrer">
            {e.restaurant}
          </List.Header>
          <List.Description>
            <div className={parseReason(e.reason)}>{e.explain }</div>
            <span className={parseScore(e.avgRating)}>{e.avgRating !== undefined && `${e.avgRating}(Avg.) `}</span>
            <b><span className={parseScore(e.myRating)}>{e.myRating !== undefined && `${e.myRating}(Yours) `}</span></b>
            <span className={parseScore(e.friendsRating)}>{e.friendsRating !== undefined && `${e.friendsRating}(Friends)`}</span>
            <br />
            <br />
          </List.Description>
        </List.Content>
      </List.Item>
    ));

    recommendList = (
      <List>
        {recommendList}
      </List>
    );

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        trigger={
          <Button color="green" inverted> Recommend By Location! </Button>
        }
      >
        <Modal.Header>
          {`Recommendation for ${data.name}!`}
        </Modal.Header>
        <Modal.Content image scrolling>
          <Image size="large" src={data.map} wrapped />
          <Modal.Description>
            <Header> List Based on Your Experience </Header>
            {recommendList}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="check" content="All Done" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}

RecommendationLocation.propTypes = {
  data: propTypes.objectOf(Object).isRequired,
};

export default RecommendationLocation;
