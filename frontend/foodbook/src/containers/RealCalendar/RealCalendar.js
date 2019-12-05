import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import 'semantic-ui-css/semantic.min.css';

import RawCalendar from 'components/RawCalendar/RawCalendar';

const parseDate = (dateInfo) => {
  const dateParser = /^([A-Za-z]+) ([A-Za-z]+) (\d+) (\d+)/;

  const month = dateInfo.match(dateParser)[2];
  const date = dateInfo.match(dateParser)[3];
  const year = dateInfo.match(dateParser)[4];

  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  return `${year}-${months[month]}-${date}`;
};

class RealCalendar extends Component {
  isDisable = ({ date }) => {
    const { review } = this.props;
    return review.filter((r) => (r.date === parseDate(`${date}`))).length === 0;
  }

  render() {
    return (
      <div className="RealCalendar">
        <RawCalendar tileDisabled={this.isDisable} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  review: state.review.reviewList,
});

RealCalendar.propTypes = {
  review: propTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(withRouter(RealCalendar));
