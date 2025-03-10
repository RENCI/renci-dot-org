import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Dialog } from "@mui/material";
import { fetchEvents, transformEventData } from "@/lib/msgraph";
import { Calendar, EventDialog, DayToolbar } from "@/components/events";
import { Page } from "@/components/layout";
import { format } from "date-fns";
import { useQuery } from "../../../../../hooks/use-query";

export default function DayViewPage() {
  const router = useRouter();
  const { year, month, day } = router.query;
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Ensure date is valid
  if (!year || !month || !day) return <p>Loading...</p>;

  const date = new Date(year, month - 1, day);

  // Query and cache events
  const { data: events, isLoading, error } = useQuery({
    queryKey: `events-${year}-${month}-${day}`,
    queryFn: async () => {
      const fetchedEvents = await fetchEvents(year, month, day);
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
    <Page hideTitle title={`Events for ${format(date, "MMMM dd, yyyy")}`}>
      <Box sx={{ padding: 2 }}>
        <DayToolbar date={date} />

        {events.length === 0 ? (
          <p>No events on this day.</p>
        ) : (
          <Calendar
            date={date}
            events={events}
            onSelectEvent={setSelectedEvent}
            views={{ agenda: true }} // lock agenda view
            defaultView="agenda" // force agenda mode
            scrollToTime={
              new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0)
            } // scroll to 8 AM of selected date
          />
        )}

        <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
          <EventDialog selectedEvent={selectedEvent} handleCloseDialog={() => setSelectedEvent(null)} />
        </Dialog>
      </Box>
    </Page>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      dummyValue: 1,
    },
  };
};
