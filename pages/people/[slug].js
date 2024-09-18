import { Fragment } from "react";
import { Divider, Typography } from "@mui/material";
import { fetchFromDashboard } from "@/utils/dashboard";
import {
  fetchDashboardPeople,
  fetchSinglePerson,
} from "@/lib/dashboard/people";

import { Link, Page, Section, TextImageSection } from "../../components";

export default function Person({ person }) {
  return (
    <Page title={person.displayName} hideTitle>
      <TextImageSection
        imageUrl={person.photo}
        imageWidth={400}
        imageHeight={400}
        imageAspectRatio={"1 / 1"}
        imageAlt={`Photo of ${person.displayName}`}
        rounded={true}
      >
        <Typography variant="h1">{person.displayName}</Typography>
        {person.title && (
          <Typography paragraph>
            {person.title} |{" "}
            {person.division && (
              <span style={{ fontWeight: 500 }}>
                <Link to={`/${person.division.type}/${person.division.slug}`}>
                  {person.division.name} Group
                </Link>
              </span>
            )}
          </Typography>
        )}
        {person?.email && (
          <Typography paragraph sx={{ fontWeight: 500 }}>
            <Link to={`mailto:${person.email}`}>{person.email}</Link>
          </Typography>
        )}
        {person.phones[0] && (
          <Typography paragraph>{person.phones[0].number}</Typography>
        )}
      </TextImageSection>

      {(person.projects || person.collaborations) && (
        <Fragment>
          <Divider />
          <Section title="Contributions">
            {person.projects[0] && (
              <Fragment>
                <Typography variant="h3">Projects</Typography>
                <ul style={{ marginTop: 0, marginBottom: "1rem" }}>
                  {person.projects.map((project) => (
                    <li key={`${project.name}`}>
                      <Link to={`/projects/${project.slug}`}>
                        {project.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Fragment>
            )}
            {person.collaborations[0] && (
              <Fragment>
                <Typography variant="h3">Collaborations</Typography>
                <ul style={{ marginTop: 0, marginBottom: "1rem" }}>
                  {person.collaborations.map((project) => (
                    <li key={`${project.name}`}>
                      <Link to={`/collaborations/${project.slug}`}>
                        {project.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Fragment>
            )}
          </Section>
        </Fragment>
      )}
      {person?.biography && (
        <Fragment>
          <Divider />
          <Section title="Biography">
            <Typography paragraph>{person.biography}</Typography>
          </Section>
        </Fragment>
      )}
    </Page>
  );
}

export async function getStaticPaths() {
  const dashboardPeople = await fetchDashboardPeople();

  const paths = dashboardPeople.people?.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const person = await fetchSinglePerson(params.slug);

  return {
    props: { person: JSON.parse(JSON.stringify(person)) },
    revalidate: 3600,
  };
}
