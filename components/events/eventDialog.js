import React, { Fragment } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';

export const EventDialog = ({ selectedEvent, handleCloseDialog }) => {

  return (
    <Fragment>
      {selectedEvent && (
        <>
          <DialogTitle id="event-dialog-title">{selectedEvent.title}</DialogTitle>
          <DialogContent dividers>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <Typography variant="subtitle2">
                {selectedEvent.dayOfWeek}, {selectedEvent.displayDate} | {selectedEvent.startTime} - {selectedEvent.endTime} {selectedEvent.displayTimeZone}
              </Typography>
            </Box>
            <Typography variant="body1">
              {`${selectedEvent.excerpt} ...` || 'No description available.'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button href={`/events/${selectedEvent.slug}`} color="primary" variant="contained">
              See More
            </Button>
            <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Fragment>
  )
}