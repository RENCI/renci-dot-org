import { Typography } from "@mui/material";
import { fetchStrapiTeam } from "../../lib/strapi";
import { fetchDashboardTeams, fetchSingleTeam } from "@/lib/dashboard/teams";
import { Markdown, Page } from "../../components";
import { PersonCard, PersonGrid } from "../../components/people/";
import { Section } from "../../components/layout";

export default function Team({ team }) {
  return (
    <Page
      title={`${team.name}`}
      description={team.description}
      heroImage={team.featuredImage ? team.featuredImage.url : null}
    >
      {!team.featuredImage && team.description && (
        <>
          <Markdown>{team.description}</Markdown>
          <br />
        </>
      )}
      <Section title="Team Members">
        <PersonGrid size="small">
          {team.members.map((person) => (
            <PersonCard key={person.slug} person={person} showTitle={true} />
          ))}
        </PersonGrid>
      </Section>
    </Page>
  );
}

export async function getStaticPaths() {
  const dashboardTeams = await fetchDashboardTeams();

  const paths = dashboardTeams?.map(({ slug }) => ({ params: { id: slug } }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const team = await fetchSingleTeam(params.id);

  return {
    props: { team: JSON.parse(JSON.stringify(team)) },
    revalidate: 3600,
  };
}
