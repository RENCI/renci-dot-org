import React, { useState, useEffect } from "react";
import { Box, Dialog, Typography, Divider } from "@mui/material";
import { fetchEvents, transformEventData } from "@/lib/msgraph";
import { Calendar, EventDialog, MonthToolbar } from "@/components/events";
import { Page } from "@/components/layout";
import { format } from "date-fns";

export default function Events() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchEvents(
          format(date, "yyyy"),
          format(date, "MM")
        );
        setEvents(transformEventData(fetchedEvents));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchAndSetEvents();
  }, [date]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Page hideTitle title="Events">
      <Typography variant="h1">Events</Typography>
      <Divider sx={{ my: "1.5rem" }} />

      <Box sx={{ padding: 2 }}>
        <MonthToolbar date={date} />

        <Calendar
          date={date}
          events={events}
          onSelectEvent={setSelectedEvent}
        />

        <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
          <EventDialog
            selectedEvent={selectedEvent}
            handleCloseDialog={() => setSelectedEvent(null)}
          />
        </Dialog>
      </Box>
    </Page>
  );
}

export const getStaticProps = () => {
  return { props: { dummyValue: 1 } };
};
