import React, { Component } from 'react'; // useState lets functional component have state.
import Calendar from 'react-calendar';
import './RawCalendar.css';
import propTypes from 'prop-types';
import ReviewList from 'components/Layouts/Feed/Feed';
import parseDate from './parseDate';

export class RawCalendar extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      dateString: parseDate(`${new Date()}`),
    };
    this.handleDisable.bind(this);
  }

  componentDidMount() {
    this.handleDisable();
  }

  handleDisable = () => {
    document.getElementsByClassName('react-calendar__navigation__label')[0].disabled = true;
  }

  handleChange = (dateInfo) => {
    this.setState({
      date: dateInfo,
      dateString: parseDate(`${dateInfo}`),
    });
  };

  render() {
    const { dateString, date } = this.state;
    const { tileDisabled, friendId } = this.props;
    const { handleChange } = this;

    return (
      <div className="RawCalendar">
        <Calendar id="calendar" style={{ marginLeft: '50%' }} onChange={handleChange} value={date} tileDisabled={tileDisabled} />
        <h3>
          {`Food history of ${dateString}`}
        </h3>
        <ReviewList friendId={parseInt(friendId, 10)} dateString={dateString} />
      </div>
    );
  }
}

RawCalendar.propTypes = {
  tileDisabled: propTypes.func.isRequired,
  friendId: propTypes.number,
};

RawCalendar.defaultProps = {
  friendId: -1,
};

export default RawCalendar;
