import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Dialog } from "@mui/material";
import { fetchEvents, transformEventData } from "@/lib/msgraph";
import { Calendar, EventDialog, DayToolbar } from "@/components/events";
import { Page } from "@/components/layout";
import format from "date-fns/format";

export default function DayViewPage() {
  const router = useRouter();
  const { year, month, day } = router.query;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (!year || !month || !day) return;

    const selectedDate = new Date(year, month - 1, day);
    setDate(selectedDate);

    const fetchAndSetEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchEvents(year, month, day);
        setEvents(transformEventData(fetchedEvents));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchAndSetEvents();
  }, [year, month, day]);

  if (!date || loading) {
    return <p>Loading...</p>
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
              new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                8,
                0,
                0
              )
            } // scroll to 8 AM of selected date
          />
        )}
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
