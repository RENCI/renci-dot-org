import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchEvents, transformEventData } from "@/lib/msgraph";
import { Page } from "@/components/layout";
import { Markdown } from "@/components/markdown";
import { Pre } from "@/components/pre";
import { Link } from "@/components/link";
import { Button, Typography, Box, Divider } from "@mui/material";

export default function EventPage() {
  const [event, setEvent] = useState(null);
  const [rawEvents, setRawEvents] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { year, month, day, title } = router.query;

  useEffect(() => {
    if (!year || !month || !day || !title) return;

    const fetchEvent = async () => {
      setLoading(true);
      setError(null);

      try {
        const eventsFromQuery = await fetchEvents(year, month, day);
        setRawEvents(eventsFromQuery);

        const eventSlugFromURL = `${year}/${month}/${day}/${title}`;
        const formattedEventsFromQuery = transformEventData(eventsFromQuery);

        const foundEvent = formattedEventsFromQuery.find(
          (event) => event.slug === eventSlugFromURL
        );

        if (!foundEvent) {
          throw new Error("Event not found");
        }

        setEvent(foundEvent);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [year, month, day, title]);

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Page hideTitle title={event.title}>
      <br />
      <Link to="/events">All Events</Link>
      <br />
      <br />

      <Typography variant="h1">{event.title}</Typography>
      <Divider sx={{ my: "1.5rem" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {event.dayOfWeek}, {event.displayDate}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {event.startTime} - {event.endTime} {event.displayTimeZone}
        </Typography>
      </Box>

      <Markdown>{event.description}</Markdown>

      {event.location && (
        <Button variant="contained" href={event.location}>
          Register Here
        </Button>
      )}
      <br />
      <br />

      <Pre>{JSON.stringify(event, null, 2)}</Pre>
      <Pre>{JSON.stringify(rawEvents, null, 2)}</Pre>
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
