import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Button, Modal, Header, List, Grid,
} from 'semantic-ui-react';
import { Bar } from '@nivo/bar';
import './RecommendationTag.css';
import * as actionCreators from 'store/actions/recom/action_recom';
import RestaurantReview from 'containers/RestaurantReview';

class RecommendationTag extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  recomHandler = () => {
    const { onGetAll, id } = this.props;
    const { lat, lng } = this.state;
    onGetAll({
      id,
      lat,
      log: lng,
    });
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },

        /* Error callback, default location to 0,0 */
        () => {
          this.setState({
            lat: 37.450084,
            lng: 126.952459,
          });
        },
      );
    }
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;
    const { recoms, data, user } = this.props;
    const aaa = [];
    const keys = Object.keys(user.taste);
    keys.forEach((key) => {
      aaa.push({
        taste: key,
        value: user.taste[key].toFixed(2),
      });
    });
    let ready = false;
    if ('lat' in this.state && 'lng' in this.state) {
      ready = true;
    }

    if (!ready) {
      return (
        <div className="form-recoms-loading">
          <p>Loading...</p>
        </div>
      );
    }

    const parseScore = (score) => ((score < 3) ? 'RED' : 'BLUE');

    let recommendList = recoms.length === 0 ? null : recoms.map((e) => (
      <List.Item key={e.name}>
        <List.Icon name="marker" />
        <List.Content>
          {e.name}
          <List.Description>
            <span className={parseScore(e.rating)}>
              {e.rating !== undefined && `${e.rating}(Avg.) `}
            </span>
            <b />
            <span className={parseScore(e.my_rating)}>
              {e.my_rating !== undefined && e.my_rating >= 1
              && `${e.my_rating}(Yours.) `}
            </span>
            <b />
            <span className={parseScore(e.other_rating)}>
              {e.other_rating !== undefined && e.other_rating >= 1
              && `${e.other_rating}(Others.) `}
            </span>
            <br />
            <br />
            <RestaurantReview data={e} />
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
          <Button id="recom-tst-button" color="green" onClick={() => this.recomHandler()} inverted> Recommend By Your Taste! </Button>
        }
      >
        <Modal.Header>
          {`Recommendation for ${data}!`}
        </Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <Header> List Based on Your Experience </Header>
            <Grid columns={2} stackable>
              <Grid.Row verticalAlign="top">
                <Grid.Column>
                  <Bar
                    data={aaa}
                    indexBy="taste"
                    width={400}
                    height={300}
                    minValue={-4}
                    maxValue={4}
                  />
                </Grid.Column>
                <Grid.Column>
                  {recommendList}
                </Grid.Column>
              </Grid.Row>
            </Grid>
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
  data: propTypes.string,
  id: propTypes.number.isRequired,
  user: propTypes.arrayOf(Object),
};

RecommendationTag.defaultProps = {
  recoms: [],
  data: 'menu',
  user: [],
};

const mapStateToProps = (state) => ({
  recoms: state.recom.recomtstList,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAll: (data) => {
    dispatch(actionCreators.GET_RECOMS_TST(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecommendationTag));
