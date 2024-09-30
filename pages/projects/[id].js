import { Divider, Typography } from "@mui/material";
import {
  fetchDashboardProjects,
  fetchSingleProject,
} from "@/lib/dashboard/projects";
import {
  ProjectActivityChip,
} from '@/components/projects';
import { Link } from "@/components/link";
import { LinkTray } from "@/components/link-tray";
import { Markdown } from "@/components/markdown";
import { Page } from "@/components/layout";
import { PersonCard, PersonGrid } from "@/components/people";
import { Section } from "@/components/layout";

export default function Project({ project }) {
  //need to destructure project object
  return (
    <Page
      title={<span>{project.name} <ProjectActivityChip active={ true } /></span>}
      description={null} // project descriptions are too long, don't include in hero
      heroImage={project.featuredImage ? project.featuredImage : null}
      superheader={project.researchGroup?.name}
      superheaderUrl={`/groups/${project.researchGroup?.slug}`}
    >
      <LinkTray urls={project.urls} />
      

      {project.description && (
        <Section title="Description">
          <Markdown paragraph>{project.description}</Markdown>
        </Section>
      )}
      {project.renciRole && (
        <>
          <Divider />
          <Section title="RENCI's Role">
            <Markdown paragraph>{project.renciRole}</Markdown>
          </Section>
        </>
      )}
      {project.members.length > 0 && (
        <>
          <Divider />
          <Section title="Team Members">
            <PersonGrid size="small">
              {project.members
                .filter((person) => person.active)
                .map((person) => (
                  <PersonCard
                    key={person.slug}
                    person={person}
                    showTitle={true}
                  />
                ))}
            </PersonGrid>
          </Section>
        </>
      )}
      {project.partners.length > 0 && (
        <>
          <Divider />
          <Section title="Partners">
            <ul style={{ margin: 0 }}>
              {project.partners
                .sort((p, q) =>
                  p.name.toLowerCase() < q.name.toLowerCase() ? -1 : 1,
                )
                .map((partner) => (
                  <li key={`${project.name}-${partner.name}`}>
                    <Link to={partner.orgURL}>{partner.name}</Link>
                  </li>
                ))}
            </ul>
          </Section>
        </>
      )}
      {project.funding.length > 0 && (
        <>
          <Divider />
          <Section title="Funding">
            <ul style={{ margin: 0 }}>
              {project.funding
                .sort((p, q) =>
                  p.name.toLowerCase() < q.name.toLowerCase() ? -1 : 1,
                )
                .map((partner) => (
                  <li key={`${project.name}-${partner.name}`}>
                    <Link to={partner.orgURL}>{partner.name}</Link>
                  </li>
                ))}
            </ul>
          </Section>
        </>
      )}
    </Page>
  );
}

export async function getStaticPaths() {
  const dashboardProjects = await fetchDashboardProjects();

  const paths = dashboardProjects?.map(({ slug }) => ({
    params: { id: slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const project = await fetchSingleProject(params.id);

  return {
    props: { project: JSON.parse(JSON.stringify(project)) },
    revalidate: 3600,
  };
}
