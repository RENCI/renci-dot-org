import Head from "next/head";
import Image from "next/image";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, Page } from "../../components";
import { PersonGrid, PersonCard } from "../../components/people";
import { useEffect, useState } from "react";
import { fetchDashboardPeople } from "@/lib/dashboard/people";

// this provides data for the letters menu
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const VerticalLettersMenu = ({ linkedLetters }) => {
  return (
    <Box
      component="nav"
      sx={{
        '--distance-from-top': '10rem',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "4px",
        position: "sticky",
        overflowY: "auto",
        overflowX: "hidden",
        top: "var(--distance-from-top)",
        maxHeight: 'calc(100vh - var(--distance-from-top) - 2rem)',
        whiteSpace: 'pre-wrap',
        alignSelf: "flex-start",
        paddingX: '6px',
        scrollbarWidth: "thin",

        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
          borderRadius: "2px",
        },
        "&:hover::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }

      }}
    >
      {letters.map((letter) =>
        linkedLetters.includes(letter) ? (
          <Link to={`#${letter}`} key={letter}>
            {letter}
          </Link>
        ) : (
          <Typography
            component="span"
            key={letter}
            style={{ color: "#abc" }}
          >
            {letter}
          </Typography>
        )
      )}
    </Box>
  )
}

const HorizontalLettersMenu = ({ linkedLetters }) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent={{ xs: 'center', md: 'flex-end' }}
      component="nav"
      gap={ 1 }
      sx={{
        flex: 1,
        flexWrap: 'wrap',
      }}
    >
      {letters.map((letter) =>
        linkedLetters.includes(letter) ? (
          <Link to={`#${letter}`} key={letter}>
            {letter}
          </Link>
        ) : (
          <Typography
            component="span"
            key={letter}
            style={{ color: "#abc" }}
          >
            {letter}
          </Typography>
        )
      )}
    </Stack>
  )
}

/*
 * people are coming into this component from
 * fetchStrapiPeople with this shape:
 * {
 *   ood: […],
 *   people: […],
 * }
 */
export default function People({ people, peopleFromDashboard }) {
  const tallViewport = useMediaQuery('(min-height: 950px)')

  let previousLetter, currentLetter = '?' // used for adding name attrs for vertical letters nav menu

  // this variable will track which letters in the vertical menu will be links
  // use a Link component for letter X if we have someone whose last name begins with X.
  const linkedLetters = letters.reduce((chars, char) => {
    const index = people.people.findIndex(
      (person) => person.lastName[0] === char
    );
    return index > -1 ? [...chars, char] : chars;
  }, []);

  return (
    <Page
      title="People"
      description="RENCI is comprised of people who contribute to research groups, operational units, and collaborations."
    >
      <Typography paragraph>
        RENCI is comprised of people who contribute to research groups,
        operational units, and collaborations. Laborum consequat voluptate culpa
        non non consectetur ut minim consectetur minim duis enim laboris elit
        consectetur ut. Reprehenderit aliqua eu qui quis ut veniam elit
        adipisicing minim veniam exercitation culpa sit sit est reprehenderit
        culpa. Exercitation laboris consectetur irure aliquip deserunt sint
        dolore mollit labore adipisicing eu. Consectetur aute tempor culpa
        fugiat qui anim ut aliqua tempor laboris dolor nulla.
      </Typography>

      <Typography variant="h2">Office of the Director</Typography>

      <Box my='2rem'>
        <PersonGrid size='large'>
          {people.ood.map((person) => (
            <PersonCard
              key={person.slug}
              person={person}
              showTitle={true}
            />
          ))}
        </PersonGrid>
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', lg: 'stretch' }}
        justifyContent="flex-start"
        gap={ 2 }
      >
        <Typography variant="h2">Everyone Else</Typography>
        { !tallViewport && <HorizontalLettersMenu linkedLetters={ linkedLetters } /> }
      </Stack>

      <Box sx={{ display: "flex", gap: "1rem", my: '2rem' }}>
        { tallViewport && <VerticalLettersMenu linkedLetters={ linkedLetters } /> }

        <PersonGrid size='medium'>
          {
            people.people
              .map(person => {
                // here, we add a name attribute, as necessary, to support the vertical side letters menu.
                // the first person whose last name starts with 'A' gets a name attr,
                // the first person whose last name starts with 'B' gets a name attr,
                // etc.
                previousLetter = currentLetter;
                currentLetter = person.lastName[0].toLowerCase();

                return (
                  <PersonCard
                    key={person.slug}
                    person={person}
                    showTitle={true}
                    anchorName={ currentLetter !== previousLetter ? currentLetter.toUpperCase() : null }
                  />
                )
              }
            )
          }
        </PersonGrid>
      </Box>
    </Page>
  );
}

export async function getServerSideProps({ res }) {
  res.setHeader(
    'Cache-Control',
    'no-cache, no-store, must-revalidate'
  )

  const people1 = await fetchDashboardPeople();

  return {
    props: { people: {ood: people1.ood, people: people1.people} },
  };
}
