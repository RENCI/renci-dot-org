import { Fragment } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Typography } from '@mui/material'
import { Link, Page } from '../../components'
import { Pre } from '../../components/pre'
import { fetchResearchGroups } from '@/lib/dashboard/research-groups'

export default function ResearchGroups({ researchGroups }) {
  return (
    <Page
      title="Research Groups"
      description="RENCI's research groups..."
    >
      <Typography paragraph>
        Research is the heart of the work we do at RENCI.
        Centered around data science, each domain-specific group offers
        scientific and technical expertise to advance discovery within
        their field.
      </Typography>

      <Typography paragraph>
        Learn more about each research group at RENCI below. 
      </Typography>

      <ul>
        {
          researchGroups.map(group => (
            <li key={ `link-to-${ group.name }` }>
              <Link to={ `/groups/${ group.slug }` }>
                { group.name }
              </Link>
            </li>
          ))
        }
      </ul>

    </Page>
  )
}

export async function getServerSideProps({ res }) {
  res.setHeader(
    'Cache-Control',
    'no-cache, no-store, must-revalidate'
  )

  const researchGroups = await fetchResearchGroups()
  return {
    props: { researchGroups: JSON.parse(JSON.stringify(researchGroups)) },
  }
}