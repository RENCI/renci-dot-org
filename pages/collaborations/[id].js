import { Fragment } from 'react'
import { fetchStrapiCollaboration } from '../../lib/strapi'
import { fetchSingleCollaboration } from '@/lib/dashboard/collaborations'
import {
  Link, Page, PersonCard, PersonGrid, Section, Markdown
} from '../../components'
import { Divider } from '@mui/material'

export default function Collaboration({ collaboration }) {
  return (
    <Page
      title={ `${ collaboration.name }` }
      description={ collaboration.description }
      heroImage={ collaboration.featuredImage ? collaboration.featuredImage.url : null }
    >
      {
        !collaboration.featuredImage && collaboration.description && (
          <>
            <Section title="Description">
              <Markdown>
                {collaboration.description}
              </Markdown>
            </Section>
            <Divider />
          </>
        )
      }
      {
        collaboration.role && (
          <>
            <Section title="RENCI's Role">
              <Markdown>
                {collaboration.role}
              </Markdown>
            </Section>
            <Divider />
          </>
        )
      }

      {
        collaboration.projects?.length !== 0 && (
          <>
            <Section title="Projects">
              <ul style={{ margin: 0 }}>
                {
                  collaboration.projects
                    .sort((p, q) => p.name.toLowerCase() < q.name.toLowerCase() ? -1 : 1)
                    .map(project => (
                      <li key={ `${ collaboration.name }-${ project.name }` }>
                        <Link to={ `/projects/${ project.slug }` }>{ project.name }</Link>
                      </li>
                    ))
                }
              </ul>
            </Section>
            <Divider />
          </>
        )
      }

      <Section title="Contributors">
        <h3>People</h3>
        <PersonGrid size="small">
          {
            collaboration.members.map(person => (
              <PersonCard key={ person.slug } person={ person } showTitle={false}/>
            ))
          }
        </PersonGrid>

        {
          collaboration.partners.length > 0 && (
            <Fragment>
              <h3>Partners</h3>
              <ul>
                {
                  collaboration.partners
                    .sort((p, q) => p.name.toLowerCase() < q.name.toLowerCase() ? -1 : 1)
                    .map(org => (
                      <li key={ `${ collaboration.id }-${ org.slug }-partner` }><Link to={ org.orgURL }>{ org.name }</Link></li>
                    ))
                }
              </ul>
            </Fragment>
          )
        }

        {
          collaboration.funding.length > 0 && (
            <Fragment>
              <h3>Funders</h3>
              <ul>
                {
                  collaboration.funding
                    .sort((p, q) => p.name.toLowerCase() < q.name.toLowerCase() ? -1 : 1)
                    .map(org => (
                      <li key={ `${ collaboration.id }-${ org.slug }-funder` }><Link to={ org.orgURL }>{ org.name }</Link></li>
                    ))
                }
              </ul>
            </Fragment>
          )
        }

      </Section>

    </Page>
  )
}

export async function getServerSideProps({ params, res }) {
  res.setHeader(
    'Cache-Control',
    'no-cache, no-store, must-revalidate'
  )
  
  const collaboration = await fetchSingleCollaboration(params.id)

  return { props: { collaboration: JSON.parse(JSON.stringify(collaboration)) } }
}
