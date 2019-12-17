import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import 'semantic-ui-css/semantic.min.css';

import RawCalendar from 'components/RawCalendar/RawCalendar';
import parseDate from 'components/RawCalendar/parseDate';


class RealCalendar extends Component {
  isDisable = ({ date }) => {
    const { review } = this.props;
    return review.filter((r) => (r.date === parseDate(`${date}`))).length === 0;
  }

  render() {
    const { friendId } = this.props;

    return (
      <div className="RealCalendar">
        <RawCalendar friendId={friendId} tileDisabled={this.isDisable} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  review: state.review.reviewList,
});

RealCalendar.propTypes = {
  review: propTypes.arrayOf(Object).isRequired,
  friendId: propTypes.number,
};

RealCalendar.defaultProps = {
  friendId: -1,
};

export default connect(mapStateToProps, null)(withRouter(RealCalendar));
