import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from '@/components/link'
import { format, addMonths, subMonths } from "date-fns"

export const MonthToolbar = ({ date }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to={`/events/${format(subMonths(date, 1), "yyyy")}/${format(subMonths(date, 1), "MM")}`}>
        Previous Month
      </Link>
      
      <Typography variant="h3">{format(date, 'MMMM yyyy')}</Typography>
      
      <Link to={`/events/${format(addMonths(date, 1), "yyyy")}/${format(addMonths(date, 1), "MM")}`}>
        Next Month
      </Link>
    </Box>  
  )
}

