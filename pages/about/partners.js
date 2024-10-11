import { Typography } from "@mui/material";
import { fetchOrganizations } from "@/lib/dashboard/organizations";
import { Page } from "@/components/layout";
import { Link } from "@/components/link";

export default function Partners({ organizations }) {
  return (
    <Page title="Partners">
      {
        organizations
          .sort((a, b) => a.displayName < b.displayName ? -1 : 1)
          .filter(org => org.projectPartners.length !== 0 || org.collaborationPartners.length !== 0)
          .map(org => {
            const partnerProjects = [
              ...org.projectPartners,
              ...org.collaborationPartners,
            ];
            return (
              <details key={ org.id } style={{ cursor: 'pointer' }}>
                <summary>
                  <strong>{ org.displayName }</strong>
                  &nbsp;({ partnerProjects.length })
                </summary>
                <ul style={{ marginLeft: '1rem' }}>{
                  partnerProjects.map(partnerProject => (
                    <li key={ partnerProject.id }>
                      <Link to={ partnerProject.path }>{ partnerProject.name }</Link>
                    </li>
                  ))
                }</ul>
              </details>
            )
          })
      }
    </Page>
  );
}

export const getStaticProps = async () => {
  const organizations = await fetchOrganizations()

  return { props: {
    organizations: JSON.parse(JSON.stringify(organizations)),
  } };
};
