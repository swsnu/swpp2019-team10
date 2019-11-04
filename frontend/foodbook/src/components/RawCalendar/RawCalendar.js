import React, { useState } from 'react'; // useState lets functional component have state.
import Calendar from 'react-calendar';
import './RawCalendar.css';

import ReviewList from 'containers/ReviewList';

const RawCalendar = () => {
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

  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(parseDate(`${new Date()}`));

  const reviewListForDay = '';

  const handleChange = (dateInfo) => {
    setDateString(parseDate(`${dateInfo}`));
    setDate(dateInfo);
  };

  return (
    <div className="RawCalendar">
      <Calendar style={{ marginLeft: '50%' }} onChange={handleChange} value={date} />
      <h3 style={{ marginLeft: '25%' }}>
        {`Your Food history of ${dateString}`}
      </h3>
      { reviewListForDay !== '' && <ReviewList date={dateString} /> }
    </div>
  );
};

export default RawCalendar;
