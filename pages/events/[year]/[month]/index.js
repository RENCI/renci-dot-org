import React, { useEffect, useState } from "react";
import { Box, Dialog } from "@mui/material";
import { useRouter } from "next/router";
import { fetchEvents } from "@/utils/msgraphapi";
import { transformEventData } from "@/utils/eventHelpers";
import { Calendar, EventDialog, MonthToolbar } from '@/components/events'
import { Page } from "@/components/layout";
import { format } from "date-fns";

export default function MonthViewPage() {
  const router = useRouter();
  const { year, month } = router.query;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialDate = year && month ? new Date(year, month - 1) : new Date();
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    if (!year || !month) return;

    if (year && month) {
      setDate(new Date(year, month - 1));
    }

    const fetchAndSetEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchEvents(year, month);
        setEvents(transformEventData(fetchedEvents));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchAndSetEvents();
  }, [year, month]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Page
      hideTitle
      title={`Events for ${format(date, "MMMM")} ${format(date, "yyyy")}`}
    >
      <br />
      <Box sx={{ padding: 2 }}>

        <MonthToolbar date={date}/>

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
