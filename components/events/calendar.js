import React from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { Box, Button, Typography } from '@mui/material'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const categoryColors = {
  'Purple category': '#A020F0', 
  'Green category': '#32CD32', 
  'Yellow category': '#FFBF00',
  'Uncategorized': '#3A3B3C'
}

const CustomToolbar = ({ date, onNavigate }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: 'center', mb: 2, gap: "1rem" }}>
      <Box>
        <Button variant="outlined" onClick={() => onNavigate("PREV")}>Previous</Button>
        <Button variant="outlined" onClick={() => onNavigate("TODAY")}>Today</Button>
        <Button variant="outlined" onClick={() => onNavigate("NEXT")}>Next</Button>
      </Box>
      <Typography variant="h4">{format(date, "MMMM yyyy")}</Typography>
    </Box>
  )
}

export const Calendar = ({ events, date, onSelectEvent, onNavigate }) => {
  const eventStyleGetter = (event) => {
    const backgroundColor = categoryColors[event.category] || '#D3D3D3'
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    }
  }

  return (
    <Box>
      <CustomToolbar date={date} onNavigate={onNavigate} />
      <BigCalendar
        localizer={localizer}
        events={events}
        date={date}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, marginBottom: '3rem' }}
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventStyleGetter}
        toolbar={false}
        selectable={false}
        onNavigate={onNavigate}
      />
    </Box>
  )
}
