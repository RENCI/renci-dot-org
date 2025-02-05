import React, { Fragment } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

export const EventDialog = ({ selectedEvent, handleSeeMore, handleCloseDialog }) => {

  return (
    <Fragment>
      {selectedEvent && (
        <>
          <DialogTitle id="event-dialog-title">{selectedEvent.title}</DialogTitle>
          <DialogContent dividers>
            <Typography variant="subtitle1">
              <strong>Date:</strong> {new Date(selectedEvent.start).toLocaleString()}
            </Typography>

            <Typography variant="body1">
              {`${selectedEvent.excerpt} ...` || 'No description available.'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSeeMore} color="primary" variant="contained">
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