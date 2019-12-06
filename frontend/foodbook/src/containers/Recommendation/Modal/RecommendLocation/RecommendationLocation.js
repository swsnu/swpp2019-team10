import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Button, Modal, Header, List,
} from 'semantic-ui-react';
import './RecommendationLocation.css';
import * as actionCreators from 'store/actions/recom/action_recom';
import RestaurantReview from 'containers/RestaurantReview';

class RecommendationLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  recomHandler = () => {
    const { onGetAll, match } = this.props;
    const { lat, lng } = this.state;
    onGetAll({
      id: match.params.id,
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
            lat: 0,
            lng: 0,
          });
        },
      );
    }
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;
    const { recoms, data } = this.props;

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
          <Button id="recom-loc-button" color="green" onClick={() => this.recomHandler()} inverted> Recommend By Location! </Button>
        }
      >
        <Modal.Header>
          {`Recommendation for ${data}!`}
        </Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description>
            <Header> List Based on Your Experience </Header>
            {recommendList}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button id="recom-loc-close-button" icon="check" content="All Done" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}

RecommendationLocation.propTypes = {
  recoms: propTypes.arrayOf(Object),
  onGetAll: propTypes.func.isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
  data: propTypes.string,
};

RecommendationLocation.defaultProps = {
  recoms: [],
  data: 'menu',
};

const mapStateToProps = (state) => ({
  recoms: state.recom.recomlocList,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAll: (data) => {
    dispatch(actionCreators.GET_RECOMS_LOC(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecommendationLocation));
