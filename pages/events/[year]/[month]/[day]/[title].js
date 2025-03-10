import React from "react";
import { useRouter } from "next/router";
import { Page } from "@/components/layout";
import { Markdown } from "@/components/markdown";
import { Pre } from "@/components/pre";
import { Link } from "@/components/link";
import { Button, Typography, Box, Divider } from "@mui/material";
import { fetchEvents, transformEventData } from "@/lib/msgraph";
import { useQuery } from "../../../../../hooks/use-query";

export default function EventPage() {
  const router = useRouter();
  const { year, month, day, title } = router.query;

  if (!year || !month || !day || !title) return;

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

  const eventSlugFromURL = `${year}/${month}/${day}/${title}`;
  const event = events.find((event) => event.slug === eventSlugFromURL);

  if (!event) return <p>Event not found.</p>;

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
      <Pre>{JSON.stringify(events, null, 2)}</Pre>
    </Page>
  );
}

// Prevents Next.js from running getInitialProps on this client page
export const getStaticProps = () => {
  return { props: { dummyValue: 1 } };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
};
