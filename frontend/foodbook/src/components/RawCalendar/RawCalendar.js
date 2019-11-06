import React, { Component } from 'react'; // useState lets functional component have state.
import Calendar from 'react-calendar';
import './RawCalendar.css';

import ReviewList from 'containers/ReviewList';

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
    const { handleChange } = this;

    return (
      <div className="RawCalendar">
        <Calendar id="calendar" style={{ marginLeft: '50%' }} onChange={handleChange} value={date} />
        <h3 style={{ marginLeft: '25%' }}>
          {`Your Food history of ${dateString}`}
        </h3>
        <ReviewList dateString={dateString} />
      </div>
    );
  }
}
export default RawCalendar;
