import { Fragment } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Typography } from '@mui/material'
// import { fetchStrapiTeams } from '../../lib/strapi'
import { Link, Page } from '../../components'
import { Pre } from '../../components/pre'
import { fetchDashboardTeams } from '@/lib/dashboard/teams'

export default function Teams({ teams }) {
  return (
    <Page
      title="Operational Teams"
      description="RENCI's operational teams..."
    >
      <Typography paragraph>
        Given RENCI&apos;s agile an fast-paced environment, the operations
        teams are essential to keeping things running smoothly and efficiently.
        Each of these teams plays a vital role in developing RENCI&apos;s
        processes, projects, and overall functionality. From our premier
        project management group organizing many complex and high-profile
        projects to our finance team diligently managing budgets and submitting
        proposals, RENCI has a robust and respected team of stagg members that
        streamline the foundational requirements of creating andsharing quality
        data science research.
      </Typography>

      <Typography paragraph>
        Learn more about RENCI&apos;s Operations teams below.
      </Typography>

      <ul>
        {
          teams.map(team => (
            <li key={ `link-to-${ team.name }` }>
              <Link to={ `/teams/${ team.slug }` }>
                { team.name }
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
  
  // const teams = await fetchStrapiTeams()
  const teams = await fetchDashboardTeams()

  return {
    props: { teams: JSON.parse(JSON.stringify(teams)) },
  }
}