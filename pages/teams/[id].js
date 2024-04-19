import { Typography } from '@mui/material'
import { fetchStrapiTeam } from '../../lib/strapi'
import { fetchSingleTeam } from '@/lib/dashboard/teams'
import { Markdown, Page } from '../../components'
import { PersonCard, PersonGrid } from "../../components/people/";
import { Section } from '../../components/layout'

export default function Team({ team }) {
  return (
    <Page
      title={ `${ team.name }` }
      description={ team.description }
      heroImage={ team.featuredImage ? team.featuredImage.url : null }
    >
      {
        !team.featuredImage && team.description && <>
          <Markdown>{team.description}</Markdown>
          <br/>
        </>
      }
      <Section title="Team Members">
       <PersonGrid size="small">
          {
            team.members.map(person => (
              <PersonCard key={ person.slug } person={ person } showTitle={true}/>
            ))
          }
        </PersonGrid>
      </Section>

    </Page>
  )
}

export async function getServerSideProps({ params, res }) {
  res.setHeader(
    'Cache-Control',
    'no-cache, no-store, must-revalidate'
  )
  
  const team = await fetchSingleTeam(params.id)

  return { props: { team: JSON.parse(JSON.stringify(team)) } }
}
