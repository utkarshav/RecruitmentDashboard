import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isToday } from 'date-fns';

const PositionInterviewCalendar = () => {
  const [date, setDate] = useState(new Date());
  const interviewData = {
    '2023-11-01': 5,
    '2023-11-05': 8,
    // Add more dates as needed
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const interviewsToday = interviewData[formattedDate];

      return (
        <div>
          {isToday(date) && <div style={{ color: 'red' }}> {interviewsToday || 0}</div>}
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ lineHeight: '1.6em', height: '300px' }}>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        calendarType="US"
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default PositionInterviewCalendar;
