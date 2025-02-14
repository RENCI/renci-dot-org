import React, { useEffect, useState } from "react";
import { Box, Dialog } from "@mui/material";
import { useRouter } from "next/router";
import { fetchEvents } from "@/utils/msgraphapi";
import { transformEventData } from "@/utils/eventHelpers";
import { Calendar, EventDialog } from "@/components/events";
import { Page } from "@/components/layout";
import { format, addMonths, subMonths } from "date-fns";

export default function MonthViewPage() {
  const router = useRouter();
  const { year, month } = router.query;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const initialDate = year && month ? new Date(year, month - 1) : new Date();
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    if (year && month) {
      setDate(new Date(year, month - 1));
    }
  }, [year, month]);

  useEffect(() => {
    if (!year || !month) return;

    const fetchAndSetEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents(year, month);
        setEvents(transformEventData(fetchedEvents));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchAndSetEvents();
  }, [year, month]);

  const handleNavigate = (action) => {
    let newDate;
    if (action === "NEXT") {
      newDate = addMonths(date, 1);
    } else if (action === "PREV") {
      newDate = subMonths(date, 1);
    } else {
      newDate = new Date();
    }

    const newPath = `/events/${format(newDate, "yyyy")}/${format(newDate, "MM")}`;

    router.push(newPath, undefined, { shallow: false });
  };

  const handleSelectEvent = (event) => setSelectedEvent(event);
  const handleCloseDialog = () => setSelectedEvent(null);
  const handleSeeMore = () => {
    selectedEvent?.slug && router.push(`/events/${selectedEvent.slug}`);
  };

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <Page
      hideTitle
      title={`Events for ${format(date, "MMMM")} ${format(date, "yyyy")}`}
    >
      <br />
      <Box sx={{ padding: 2 }}>
        <Calendar
          date={date}
          events={events}
          onSelectEvent={handleSelectEvent}
          onNavigate={handleNavigate}
        />
        <Dialog open={!!selectedEvent} onClose={handleCloseDialog}>
          <EventDialog
            selectedEvent={selectedEvent}
            handleSeeMore={handleSeeMore}
            handleCloseDialog={handleCloseDialog}
          />
        </Dialog>
      </Box>
    </Page>
  );
}

// there is no data needed for this page, but this is a workaround to prevent getInitialProps from
// running on this client page
export const getStaticProps = () => {
  return { props: { dummyValue: 1 } };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
