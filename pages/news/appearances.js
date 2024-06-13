import { Page } from "@/components/layout";
import { fetchAllNewsAppearances } from "@/lib/strapi/newsAppearancesGraphQL";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  timelineContentClasses,
} from "@mui/lab";
import { Box, Collapse, Typography } from "@mui/material";
import {
  timelineOppositeContentClasses,
  timelineItemClasses,
  timelineDotClasses,
} from "@mui/lab";
import { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";

/**
 *  YYYY-MM-DD to MM/YY
 */
const dateFormatter = (str) => {
  const date = new Date(str);
  return `${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
};

const NewsAppearanceItem = ({ event }) => {
  const hasMultipleArticles = event.articles.length > 1;
  const [isOpen, setIsOpen] = useState(false);

  const ButtonOrLink = ({ event, hasMultipleArticles }) => {
    if (hasMultipleArticles)
      return (
        <Typography
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <ArrowDropDown
            fontSize="small"
            sx={{ transform: `rotate(${isOpen ? "0" : "-90"}deg)` }}
          />
          <a onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
            {event.title}
          </a>
        </Typography>
      );

    return (
      <Typography
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <span style={{ width: "20px" }}></span>
        <a
          href={event.articles[0].url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {event.title}
        </a>
      </Typography>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ButtonOrLink event={event} hasMultipleArticles={hasMultipleArticles} />
      {hasMultipleArticles && (
        <Collapse in={isOpen}>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "40px" }}>
            {event.articles.map((article, i) => (
              <li key={i}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </Collapse>
      )}
    </Box>
  );
};

export default function NewsAppearances({ appearances }) {
  return (
    <Page
      title="News Appearances"
      description="RENCI is comprised of people who contribute to research groups, operational units, and collaborations."
    >
      <Typography paragraph>
        See what the media are saying about RENCI. Please keep in mind that not
        all publications keep their stories archived for the long-term. As a
        result, some of the urls below may not work after a period of time.
      </Typography>

      <Timeline
        position="right"
        sx={{
          paddingX: 0,
          marginY: "2rem",
          [`& .${timelineOppositeContentClasses.root}`]: {
            paddingLeft: "0px",
            flex: "auto 0 0",
            minWidth: "85px",
            filter: "opacity(0.7)",
          },
          [`& .${timelineContentClasses.root}`]: {
            paddingLeft: "4px",
          },
          [`& .${timelineItemClasses.root}`]: {
            minHeight: "40px",
          },
          [`& .${timelineDotClasses.root}`]: {
            margin: 0,
          },
          [`& .${timelineItemClasses.root}:first-of-type .${timelineDotClasses.root}`]:
            {
              margin: "11.5px 0px 0px 0px",
            },
        }}
      >
        {appearances.map(({ id, attributes: event }, i) => (
          <TimelineItem key={id}>
            <TimelineOppositeContent>
              {dateFormatter(event.date)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              {i === 0 ? null : (
                <TimelineConnector
                  sx={{ height: "5px", flexGrow: "0", height: "11.5px" }}
                />
              )}
              <TimelineDot />
              {i === appearances.length - 1 ? null : <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <NewsAppearanceItem event={event} />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Page>
  );
}

export async function getStaticProps() {
  const appearances = await fetchAllNewsAppearances();
  return {
    props: { appearances: JSON.parse(JSON.stringify(appearances)) },
    revalidate: 3600,
  };
}
