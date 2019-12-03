import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Button, Modal, Header, List,
} from 'semantic-ui-react';
import './RecommendationTag.css';
import * as actionCreators from 'store/actions/recom/action_recom';

class RecommendationTag extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    const { onGetAll, match } = this.props;
    onGetAll(match.params.id);
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;
    const { recoms } = this.props;

    const parseScore = (score) => ((score >= 4) ? 'RED' : 'BLUE');

    let recommendList = recoms.length === 0 ? null : recoms.map((e) => (
      <List.Item key={e.name}>
        <List.Icon name="marker" />
        <List.Content>
          {e.name}
          <List.Description>
            <div className={parseScore(e.rating)}>
              {e.rating !== undefined && `${e.rating}(Avg.) `}
            </div>
            <br />
            <br />
          </List.Description>
        </List.Content>
      </List.Item>
    ));

    recommendList = (
      <List id="recommendList">
        {recommendList}
      </List>
    );

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        trigger={
          <Button id="recom-tst-button" color="green" inverted> Recommend By Your Taste! </Button>
        }
      >
        <Modal.Header>
          Recommendation By Your Taste!
        </Modal.Header>
        <Modal.Content scrolling>
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

RecommendationTag.propTypes = {
  recoms: propTypes.arrayOf(Object),
  onGetAll: propTypes.func.isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.number,
    }),
  }).isRequired,
};

RecommendationTag.defaultProps = {
  recoms: [],
};

const mapStateToProps = (state) => ({
  recoms: state.recom.recomtstList,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAll: (id) => {
    dispatch(actionCreators.GET_RECOMS_TST(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecommendationTag));
