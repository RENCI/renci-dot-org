import { Divider, Typography } from '@mui/material'
import { fetchSingleProject } from '@/lib/dashboard/projects'
import { Link, Page } from '../../components'
import { Section } from '../../components/layout'
import { PersonCard, PersonGrid } from "../../components/people/";
import { Markdown } from '../../components/markdown'

export default function Project({ project }) {
  //need to destructure project object
  return (
    <Page
      title={ `${ project.name }` }
      description={ null } // project descriptions are too long, don't include in hero
      heroImage={ project.featuredImage ? project.featuredImage : null }
      superheader={ project.researchGroup?.name }
      superheaderUrl={ `/groups/${project.researchGroup?.slug}` }
    >
      {
        project.description && <Section title="Description">
          <Markdown paragraph>{project.description}</Markdown>
        </Section>
      }
      {
        project.renciRole && (
          <>
            <Divider />
            <Section title="RENCI's Role">
              <Markdown paragraph>{project.renciRole}</Markdown>
            </Section>
          </>
        )
      }
      {
        project.members.length > 0 && (
          <>
            <Divider />
            <Section title="Team Members">
              <PersonGrid size="small">
                {
                  project.members.filter(person => person.active).map(person => (
                    <PersonCard key={ person.slug } person={ person } showTitle={true}/>
                  ))
                }
              </PersonGrid>
            </Section>
          </>
        )
      }
      {
        project.partners.length > 0 && 
        <>
          <Divider />
          <Section title="Partners">
            <ul style={{ margin: 0 }}>
              {
                project.partners
                  .sort((p, q) => p.name.toLowerCase() < q.name.toLowerCase() ? -1 : 1)
                  .map(partner => (
                    <li key={ `${ project.name }-${ partner.name }` }>
                      <Link to={ partner.orgURL }>{ partner.name }</Link>
                    </li>
                  ))
              }
            </ul>
          </Section>
        </>
      }
      {
        project.funding.length > 0 && 
          <>
            <Divider />
            <Section title="Funding">
              <ul style={{ margin: 0 }}>
                {
                  project.funding
                    .sort((p, q) => p.name.toLowerCase() < q.name.toLowerCase() ? -1 : 1)
                    .map(partner => (
                      <li key={ `${ project.name }-${ partner.name }` }>
                        <Link to={ partner.orgURL }>{ partner.name }</Link>
                      </li>
                    ))
                }
              </ul>
            </Section>
          </>
        }
    </Page>
  )
}

export async function getServerSideProps({ params, res }) {
  res.setHeader(
    'Cache-Control',
    'no-cache, no-store, must-revalidate'
  )
  
  const project = await fetchSingleProject(params.id)

  return { props: { project: JSON.parse(JSON.stringify(project)) } }
}
