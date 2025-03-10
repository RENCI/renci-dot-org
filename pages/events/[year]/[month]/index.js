import React, { useState } from "react";
import { Box, Dialog } from "@mui/material";
import { useRouter } from "next/router";
import { fetchEvents, transformEventData } from "@/lib/msgraph";
import { Calendar, EventDialog, MonthToolbar } from "@/components/events";
import { Page } from "@/components/layout";
import { format } from "date-fns";
import { useQuery } from "../../../../hooks/use-query";

export default function MonthViewPage() {
  const router = useRouter();
  const { year, month } = router.query;

  const [selectedEvent, setSelectedEvent] = useState(null);

    if (!year || !month) return;

    const date = new Date(year, month - 1);

    // fetch events using useQuery with cache
    const { data: events, isLoading, error } = useQuery({
      queryKey: `events-${year}-${month}`,
      queryFn: async () => {
        const fetchedEvents = await fetchEvents(year, month);
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
    <Page
      hideTitle
      title={`Events for ${format(date, "MMMM yyyy")}`}
    >
      <br />
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
