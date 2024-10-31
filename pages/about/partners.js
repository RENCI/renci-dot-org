import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { fetchOrganizations } from "@/lib/dashboard/organizations";
import { Page } from "@/components/layout";
import { SearchBar } from "@/components/search-bar";
import { Link } from "@/components/link";

const filterData = (query, data) => {
  if (!query) {
    return data;
  } else {
    const lowerQuery = query.toLowerCase();
    return data.filter((d) => 
      d.name.toLowerCase().includes(query)
      || d.displayName.toLowerCase().includes(query)
      || d.projectPartners.some(p => p.name.toLowerCase().includes(query)
    )
    );
  }
};

export default function Partners({ organizations }) {
  const [searchQuery, setSearchQuery] = useState("");
  const organizationsFiltered = filterData(searchQuery, organizations);

  return (
    <Page title="Partners">
      <SearchBar
        title="Partner Search"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        options={organizationsFiltered}
      />
      <Box sx={{ margin: "2rem 0" }}>
        {
          organizationsFiltered
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
      </Box>
    </Page>
  );
}

export const getStaticProps = async () => {
  const organizations = await fetchOrganizations()

  return { props: {
    organizations: JSON.parse(JSON.stringify(organizations)),
  } };
};
