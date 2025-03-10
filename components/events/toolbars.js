import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from '@/components/link';
import { format, addMonths, subMonths, addDays, subDays } from "date-fns";

export const MonthToolbar = ({ date }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box flex={1} sx={{display: 'flex', justifyContent: 'flex-start'}}>
        <Link to={`/events/${format(subMonths(date, 1), "yyyy")}/${format(subMonths(date, 1), "MM")}`}>
          Previous Month
        </Link>
      </Box>

      <Box flex={1} sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography variant="h3">{format(date, 'MMMM yyyy')}</Typography>
      </Box>
      
      <Box flex={1} sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Link to={`/events/${format(addMonths(date, 1), "yyyy")}/${format(addMonths(date, 1), "MM")}`}>
          Next Month
        </Link>
      </Box>
    </Box>  
  );
};

export const DayToolbar = ({ date }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box flex={1} sx={{display: 'flex', justifyContent: 'flex-start'}}>
        <Link to={`/events/${format(subDays(date, 1), "yyyy")}/${format(subDays(date, 1), "MM")}/${format(subDays(date, 1), "dd")}`}>
          Previous Day
        </Link>
      </Box>
      
      <Box flex={1} sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography variant="h3">{format(date, 'MMMM dd, yyyy')}</Typography>
      </Box>

      <Box flex={1} sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Link to={`/events/${format(addDays(date, 1), "yyyy")}/${format(addDays(date, 1), "MM")}/${format(addDays(date, 1), "dd")}`}>
          Next Day
        </Link>  
      </Box>
    </Box>  
  );
};