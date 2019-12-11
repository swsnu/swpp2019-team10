import React, { Component } from 'react'; // useState lets functional component have state.
import Calendar from 'react-calendar';
import './RawCalendar.css';
import PropTypes from 'prop-types';
import ReviewList from 'components/Layouts/Feed/Feed';
import parseDate from './parseDate';

export class RawCalendar extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      dateString: parseDate(`${new Date()}`),
    };
  }

  handleChange = (dateInfo) => {
    this.setState({
      date: dateInfo,
      dateString: parseDate(`${dateInfo}`),
    });
  };

  render() {
    const { dateString, date } = this.state;
    const { tileDisabled } = this.props;
    const { handleChange } = this;

    return (
      <div className="RawCalendar">
        <Calendar id="calendar" style={{ marginLeft: '50%' }} onChange={handleChange} value={date} tileDisabled={tileDisabled} />
        <h3>
          {`Your Food history of ${dateString}`}
        </h3>
        <ReviewList dateString={dateString} />
      </div>
    );
  }
}

RawCalendar.propTypes = {
  tileDisabled: PropTypes.func.isRequired,
};

export default RawCalendar;
