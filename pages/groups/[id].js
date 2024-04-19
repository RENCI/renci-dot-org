import { Typography, Divider } from '@mui/material'
import { fetchStrapiGroup } from '../../lib/strapi'
import { fetchSingleResearchGroup } from '@/lib/dashboard/research-groups'
import { Link, Page } from '../../components'
import { Section } from '../../components/layout'
import { PersonCard, PersonGrid } from "../../components/people/";

export default function ResearchGroup({ researchGroup }) {
  return (
    <Page
      title={ `${ researchGroup.name }` }
      description={ researchGroup.description }
      heroImage={ researchGroup.featuredImage ? researchGroup.featuredImage.url : null }
    >
      {
        !researchGroup.featuredImage && (
          <>
            <Typography paragraph>{researchGroup.description}</Typography>
            <br/>
            <Divider />
          </>
        )
      }
      
      {researchGroup.projects.some(project => project.active) &&
        <>
          <Section title="Current Projects">
            <ul style={{ margin: 0 }}>
              {
                researchGroup.projects
                  .sort((p, q) => p.name.toLowerCase() < q.name.toLowerCase() ? -1 : 1)
                  .filter(project => project.active)
                  .map(project => (
                    <li key={ `${ researchGroup.name }-${ project.name }` }>
                      <Link to={ `/projects/${ project.slug }` }>{ project.name }</Link>
                    </li>
                  ))
              }
            </ul>
          </Section>
          <Divider />
        </>
      }

      <Section title="Team Members">
       <PersonGrid size="small">
          {
            researchGroup.members.filter(person => person.active).map(person => (
              <PersonCard key={ person.slug } person={ person } showTitle={true}/>
            ))
          }
        </PersonGrid>
      </Section>

      {researchGroup.partners.length > 0 && 
        <>
          <Divider />
          <Section title="Partners">
            <ul style={{ margin: 0 }}>
              {
                researchGroup.partners
                  .sort((p, q) => p.name.toLowerCase() < q.name.toLowerCase() ? -1 : 1)
                  .map(partner => (
                    <li key={ `${ researchGroup.name }-${ partner.name }` }>
                      <Link to={ partner.orgURL }>{ partner.name }</Link>
                    </li>
                  ))
              }
            </ul>
          </Section>
        </>
      }

      {researchGroup.projects.some(project => !project.active) && 
        <>
          <Divider />
          <Section title="Past Projects">
            <ul style={{ margin: 0 }}>
              {
                researchGroup.projects
                  .sort((p, q) => p.name.toLowerCase() < q.name.toLowerCase() ? -1 : 1)
                  .filter(project => !project.active)
                  .map(project => (
                    <li key={ `${ researchGroup.name }-${ project.name }` }>
                      <Link to={ `/projects/${ project.slug }` }>{ project.name }</Link>
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
  
  const researchGroup = await fetchSingleResearchGroup(params.id)

  return { props: { researchGroup: JSON.parse(JSON.stringify(researchGroup)) } }
}
