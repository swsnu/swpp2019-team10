import React, { useState } from 'react'; // useState lets functional component have state.
import propTypes from 'prop-types'
import Calendar from 'react-calendar';
import './RawCalendar.css';

import ReviewList from 'containers/ReviewList';

const RawCalendar = () => {
    const handleChange = (date) => {
      setDateString(parseDate(date + ""));
      setDate(date);
    }

    const parseDate = (dateInfo) => {
    let dateParser = /^([A-Za-z]+) ([A-Za-z]+) (\d+) (\d+)/;
    
    let month = dateInfo.match(dateParser)[2];
    let date = dateInfo.match(dateParser)[3];
    let year = dateInfo.match(dateParser)[4];
    
    let months = { 'Jan' : '01', 'Feb' : '02', 'Mar' : '03', 'Apr' : '04',
    'May' : '05', 'Jun' : '06', 'Jul' : '07', 'Aug' : '08',
      'Sep' : '09', 'Oct' : '10', 'Nov' : '11', 'Dec' : '12' };
      
      return year+"-"+months[month]+"-"+date;
    }
    
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState(parseDate(new Date() + ""));
    
    let reviewListForDay = "";

    return (
    <div className="RawCalendar">
      <Calendar style={{ marginLeft: '50%' }} onChange={handleChange} value={date}/>
      <h3 style={{marginLeft: '25%'}}> Your Food history of {dateString} </h3>
      { reviewListForDay !=="" && <ReviewList date={dateString} /> }
    </div> 
  );
};

export default RawCalendar;
