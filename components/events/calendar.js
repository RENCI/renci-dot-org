import React from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const categoryColors = {
  'Purple category': '#A020F0', 
  'Green category': '#32CD32', 
  'Yellow category': '#FFBF00',
  'Uncategorized': '#3A3B3C', // Default color for uncategorized events
};

export const Calendar = ({ events, onSelectEvent }) => {
  // Function to style events by category
  const eventStyleGetter = (event) => {
    const backgroundColor = categoryColors[event.category] || '#D3D3D3'; // Default to gray
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500, marginBottom: '3rem' }}
      onSelectEvent={onSelectEvent}
      eventPropGetter={eventStyleGetter} // Apply colors based on categories
    />
  );
};
