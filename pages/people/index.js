import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Box, Card, CardHeader, CardContent, Grid, Typography } from '@mui/material'
import { fetchPeopleForPeopleView } from '../../lib/contentful'
import { Link, Page } from '../../components'
import { Pre } from '../../components/pre'

// this provides data for the vertical menu
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

/*
 * people are coming into this component from
 * fetchPeopleForPeopleView with this shape:
 * {
 *   ood: […],
 *   rest: […],
 * }
 */
export default function People({ people }) {
  return (
    <Page
      title="People"
      description="RENCI is comprised of people who contribute to research groups, operational units, and collaborations."
    >
      <Typography paragraph>
        Laborum consequat voluptate culpa non non consectetur ut minim consectetur minim duis enim laboris elit consectetur ut.
        Reprehenderit aliqua eu qui quis ut veniam elit adipisicing minim veniam exercitation culpa sit sit est reprehenderit culpa.
        Exercitation laboris consectetur irure aliquip deserunt sint dolore mollit labore adipisicing eu.
        Consectetur aute tempor culpa fugiat qui anim ut aliqua tempor laboris dolor nulla.
      </Typography>

      <Typography variant="h2">Office of the Director</Typography>

      <Box sx={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      }}>
        {
          people.ood.map(person => (
            <Card key={ person.slug } sx={{ height: '100%' }} elevation={ 0 }>
              <CardContent>
                <Pre>
                  { JSON.stringify(person, null, 2) }
                </Pre>
                <Link to={ `/people/${ person.slug }` }>
                  { person.firstName } { person.lastName }
                </Link>
                <Typography>{ person.title }</Typography>
              </CardContent>
            </Card>
          ))
        }
      </Box>

      <Typography variant="h2">Everyone Else</Typography>

      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Box component="nav" sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '4px',
          position: 'sticky',
          top: '10rem',
          marginTop: '2rem',
          alignSelf: 'flex-start',
        }}>
          {
            letters.map(letter => (
              <Link to={ `#${ letter }` } key={ letter }>{ letter }</Link>
            ))
          }
        </Box>
        <Box sx={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}>
          {
            people.rest.map(person => (
              <Card key={ person.slug } sx={{ height: '100%' }} elevation={ 0 } name={ person.lastName[0] }>
                <CardContent>
                  <Pre>
                    { JSON.stringify(person, null, 2) }
                  </Pre>
                  <Link to={ `/people/${ person.slug }` }>
                    { person.firstName } { person.lastName }
                  </Link>
                  <Typography>{ person.title }</Typography>
                </CardContent>
              </Card>
            ))
          }
        </Box>
      </Box>

    </Page>
  )
}

export async function getStaticProps(context) {
  const people = await fetchPeopleForPeopleView()
  return {
    props: { people },
  }
}