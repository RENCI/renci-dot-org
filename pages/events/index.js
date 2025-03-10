import React, { useState } from "react";
import { Box, Dialog, Typography, Divider } from "@mui/material";
import { fetchEvents, transformEventData } from "@/lib/msgraph";
import { Calendar, EventDialog, MonthToolbar } from "@/components/events";
import { Page } from "@/components/layout";
import { format } from "date-fns";
import { useQuery } from "../../hooks/use-query";

export default function Events() {
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data: events, isLoading, error } = useQuery({
    queryKey: `events-${format(date, "yyyy-MM")}`,
    queryFn: async () => {
      const fetchedEvents = await fetchEvents(format(date, "yyyy"), format(date, "MM"));
      return transformEventData(fetchedEvents);
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
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
