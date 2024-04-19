import { useState } from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { Page } from "../../components";
// import { fetchAllStrapiProjects } from "../../lib/strapi";
import { ProjectCard } from "../../components/projectSpotlight";
import { SearchBar } from "@/components/projects/search-bar";
import { fetchDashboardProjects } from "@/lib/dashboard/projects";

const filterData = (query, data) => {
  if (!query) {
    return data;
  } else {
    return data.filter((d) => d.webName.toLowerCase().includes(query));
  }
};

export default function Projects({ projects, size = "medium" }) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const projectsFiltered = filterData(searchQuery, projects);

  let minWidth;
  switch (size) {
    case "small":
      minWidth = 350;
      break;
    case "medium":
    default:
      minWidth = 350;
      break;
    case "large":
      minWidth = 300;
  }

  return (
    <Page title="Projects" description="RENCI's projects...">
      <Typography paragraph>
        Sunt in officia anim aute occaecat sed dolor sit nulla pariatur dolor
        duis velit veniam. Lorem ipsum cupidatat fugiat adipisicing dolore elit
        duis reprehenderit anim incididunt in incididunt deserunt sunt culpa
        fugiat eu minim veniam. Veniam laborum mollit commodo labore excepteur
        ut sunt dolore dolor in minim enim officia sit occaecat in cillum
        ullamco. Lorem ipsum ad tempor ea elit anim aliqua nulla exercitation
        veniam id non elit in in deserunt magna.
      </Typography>

      <Typography paragraph>
        Learn more about each project at RENCI below.
      </Typography>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        options={projectsFiltered}
      />

      <Box
        sx={{
          flex: 1,
          marginTop: "3rem",
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
          [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        {projectsFiltered.map((project) => {
          return (
            <ProjectCard project={project} key={`project-${project.slug}`} />
          );
        })}
      </Box>
      <br />
    </Page>
  );
}

export async function getServerSideProps({ res }) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

  const projectsFromDashboard = await fetchDashboardProjects();

  return {
    props: { projects: JSON.parse(JSON.stringify(projectsFromDashboard)) },
  };
}
