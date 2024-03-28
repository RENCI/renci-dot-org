import { Fragment } from 'react'
import { Divider, Typography } from '@mui/material'
import { fetchFromDashboard } from '@/utils/dashboard';
import { Link, Page, Section, TextImageSection } from '../../components'

export default function Person({ person }) {
  return (
    <Page title={ `${ person.firstName } ${ person.lastName }` } hideTitle>
      <TextImageSection 
        imageUrl={ `https://dashboard.renci.org/api/webinfo/people/${person.personId}/photo` }
        imageWidth={400}
        imageHeight={400}
        imageAspectRatio={"1 / 1"}
        imageAlt={ `Photo of ${ person.firstName } ${ person.lastName }` }
        rounded={true}
        >
          <Typography variant="h1" >
            { person.displayName }
          </Typography>
          <Typography paragraph>{ person.title }</Typography>
          {
            person.teams && (
              <Fragment>
                {
                  person.teams.map(group => (
                    <Typography paragraph sx={{ fontWeight: 500 }} key={group.id}>
                      <Link to={ `/teams/${ group.id }` }> 
                        { group.text } Operational Team
                      </Link> 
                    </Typography>
                  ))
                }
              </Fragment>
            )
          }
          {
            person.researchGroups && (
              <Fragment>
                {
                  person.researchGroups.map(group => (
                    <Typography paragraph sx={{ fontWeight: 500 }} key={group.name}>
                    <Link to={ `/groups/${ group.slug }` }>
                      { group.name } Research Group
                    </Link> 
                  </Typography>
                      ))
                }
              </Fragment>
            )
          }
          {
            person.email && (
              <Typography paragraph>
                <Link to={ `mailto:${ person.email }` }>
                  { person.email }
                </Link>
              </Typography>
            )
          }
          {
            person.phones.length > 0 && (
              <Typography paragraph>{ person.phones[0].number }</Typography>
            )
          }
      </TextImageSection>

      {
        person.contributions && (
          <Fragment>
            <Divider />
            <Section title="Contributions">
              {
                person.contributions.projects && (
                  <Fragment>
                    <Typography variant="h3">Projects</Typography>
                    <ul style={{marginTop: 0, marginBottom: '1rem'}}>
                      {
                        person.contributions.projects.map(project => (
                          <li key={ `${ project.name }` }>
                            <Link to={ `/projects/${ project.slug }` }>{ project.name }</Link>
                          </li>
                        ))
                      }
                    </ul>
                  </Fragment>
                )
              }
              {
                person.contributions.collaborations && (
                  <Fragment>
                    <Typography variant="h3">Collaborations</Typography>
                    <ul style={{marginTop: 0, marginBottom: '1rem'}}>
                      {
                        person.contributions.collaborations.map(project => (
                          <li key={ `${ project.name }` }>
                            <Link to={ `/collaborations/${ project.slug }` }>{ project.name }</Link>
                          </li>
                        ))
                      }
                    </ul>
                  </Fragment>
                )
              }
            </Section>
          </Fragment>
        )
      }
      {
        person?.biography && (
          <Fragment>
            <Divider />
            <Section title="Biography">
              <Typography paragraph>
                { person.biography }
              </Typography>
            </Section>
          </Fragment>
        )
      }

    </Page>
  )
}

export async function getServerSideProps({ params, res }) {
  res.setHeader(
    'Cache-Control',
    'no-cache, no-store, must-revalidate'
  )
  
  const person = await fetchFromDashboard(`people/${params.slug}`)
  console.log(JSON.parse(JSON.stringify(person)))

  return { props: { person: JSON.parse(JSON.stringify(person)) } }
}
