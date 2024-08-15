import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import { Typography, Stack, Box, Container, Button } from "@mui/material";
import { Link, Page } from "../components";
import homeHero from "../images/home-hero.jpg";
import homeHero2 from "../images/home-hero-2.jpg";
import { ProjectSpotlight } from "../components/projectSpotlight";
import { fetchDashboardProjects } from "@/lib/dashboard/projects";
import { fetchHomeNews } from "../lib/strapi";
import { GenericArticlePreview } from "../components/news/article-preview";
import { useConfig } from "context";
import { ArrowRight } from "@mui/icons-material";
import { Satellite } from "@/components/home/satellite";
import { SliceSection } from "@/components/home/slice-section";
import { SlideUpBox } from "@/components/home/slide-up-box";
import { SolidSection } from "@/components/home/solid-section";
import { ResearchGroupSummaries } from "@/components/home/research-group-summaries";

export default function Home({ selectedProjects, newsArray }) {
  const { config } = useConfig();

  return (
    <>
      <SliceSection
        contentBgColor={"white"}
        bgImage={homeHero}
        sx={{ position: "relative" }}
      >
        <Box sx={{ maxWidth: "60%" }}>
          <Typography
            variant="h1"
            my={2}
            sx={{
              color: "rgb(30 55 91)",
              fontWeight: "bold",
              textWrap: "balanced",
            }}
          >
            Pioneering the future of computing research
          </Typography>
          <Typography sx={{ textWrap: "balanced" }} my={4}>
            The Renaissance Computing Institute (RENCI) is a research institute
            at UNC-Chapel Hill that focuses on data science for the greater
            good. We are a team of innovators, problem-solvers, and
            forward-thinking individuals from a diverse range of backgrounds,
            skill sets, and perspectives coming together to conduct
            groundbreaking research and enact positive change at the local,
            state, national, and international levels. Explore our various
            projects, research groups, collaborations, and operations teams to
            learn more about our work and the people who make it happen.
          </Typography>
          <Button variant="outlined" endIcon={<ArrowRight />}>
            Learn more
          </Button>
        </Box>
        <SlideUpBox
          title={"Learn more about APSViz"}
          height={"300px"}
          width={"400px"}
        >
          <p>
            A core project within the Department of Homeland Security’s Coastal
            Resilience Center at UNC-Chapel Hill, APSViz disseminates real-time
            coastal hazards information and enhances research productivity by
            making it much easier to understand computer simulations and
            predictions of coastal hazards.
          </p>
        </SlideUpBox>
      </SliceSection>

      <SliceSection
        contentSide="right"
        contentBgColor={"rgb(30 55 91)"}
        sx={{ color: "white" }}
      >
        <Box
          sx={{
            maxWidth: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h1"
            my={2}
            sx={{ textWrap: "balanced", fontWeight: "bold" }}
          >
            NC researchers come together to harness...
          </Typography>
          <Typography sx={{ textWrap: "balanced" }} my={4}>
            In an increasingly interconnected world, the integration of clinical
            and environmental health data holds immense potential for advancing
            research, improving patient outcomes, and shaping the future of
            healthcare. However, to truly make an impact on individuals and
            communities, institutional and scientific silos that hinder
            collaboration and resource
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowRight />}
            sx={{
              alignSelf: "flex-end",
              background: "rgb(255, 68, 202)",
              borderRadius: "8px",
            }}
          >
            Learn more
          </Button>
        </Box>
      </SliceSection>

      <SolidSection
        bgColor={"rgb(56 103 128)"}
        sx={{ color: "white" }}
        title={
          <Box sx={{ maxWidth: "60%" }}>
            <Typography
              variant="h1"
              my={2}
              sx={{ textWrap: "balanced", fontWeight: "bold" }}
            >
              Leading innovation in diverse research fields
            </Typography>
            <Typography sx={{ textWrap: "balanced" }}>
              RENCI supports several research groups; centered around data
              science, each domain-specific group offers scientific and
              technical expertise to advance discovery within their field
            </Typography>
          </Box>
        }
      >
        <Box sx={{ maxWidth: "80%" }}>
          <ResearchGroupSummaries
            groups={[
              {
                name: "Clinical Informatics",
                summary:
                  "Enhancing health sciences research and clinical practice through advanced data management and analysis, improving patient diagnoses and treatment outcomes.",
                link: "/groups/clinical-informatics",
              },
              {
                name: "Data Science and Analytics",
                summary:
                  "Transforming sectors like science and industry with big data tools and technologies for improved data access, sharing, analysis, and long-term archiving.",
                link: "/groups/data-science-and-analytics",
              },
              {
                name: "Earth Data Science",
                summary:
                  "Utilizing data management, high-performance computing, and visualization to model coastal impacts and support environmental data sharing and sustainability.",
                link: "/groups/earth-data-science",
              },
              {
                name: "Network Research and Infrastructure",
                summary:
                  "Advancing high-performance computing and networking to facilitate seamless data access, sharing, and storage for global scientific collaboration",
                link: "/groups/nrig",
              },
              {
                name: "Software Architecture",
                summary:
                  "Creating scalable cloud computing data science platforms featuring full-text search, knowledge graphs and machine learning models.",
                link: "/groups/software-architecture",
              },
            ]}
          />
        </Box>
      </SolidSection>

      <SolidSection bgColor={"white"} title={<Satellite />}>
        <Box sx={{ maxWidth: "60%" }}>
          <Typography
            variant="h1"
            my={2}
            sx={{ textWrap: "balanced", fontWeight: "bold" }}
          >
            20 years of excellence
          </Typography>
          <Typography sx={{ textWrap: "balanced", my: "2rem" }}>
            Founded in 2004, RENCI has demonstrated experience and
            driven innovation across a variety of projects and domains.
          </Typography>
          <Button variant="outlined" endIcon={<ArrowRight />}>
            Read our mission statement
          </Button>
        </Box>
      </SolidSection>

      <SliceSection
        contentSide="left"
        contentBgColor={"rgb(49 114 138)"}
        sx={{ color: "white" }}
      >
        <Box
          sx={{
            maxWidth: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h1" my={2} sx={{ textWrap: "balanced" }}>
            NC researchers come together to harness...
          </Typography>
          <Typography sx={{ textWrap: "balanced" }} my={4}>
            In an increasingly interconnected world, the integration of clinical
            and environmental health data holds immense potential for advancing
            research, improving patient outcomes, and shaping the future of
            healthcare. However, to truly make an impact on individuals and
            communities, institutional and scientific silos that hinder
            collaboration and resource
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowRight />}
            sx={{
              alignSelf: "flex-end",
              background: "rgb(255, 68, 202)",
              borderRadius: "8px",
            }}
          >
            Learn more
          </Button>
        </Box>
      </SliceSection>
    </>
  );
}

export async function getStaticProps() {
  try {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    const [newsArray, projects] = await Promise.all([
      fetchHomeNews(),
      fetchDashboardProjects(),
    ]);

    let projectsCopy = [...projects];
    let projectSelection = [];
    for (let i = 0; i < 3; i += 1) {
      const randomIndex = Math.floor(Math.random() * projectsCopy.length);
      const randomProject = projectsCopy.splice(randomIndex, 1)[0];
      //add a property that is a snippet of the original description before pushing to the array
      projectSelection.push({
        ...randomProject,
      });
    }

    return {
      props: {
        selectedProjects: JSON.parse(JSON.stringify(projectSelection)),
        newsArray: JSON.parse(JSON.stringify(newsArray)),
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { selectedProjects: [], newsArray: [] },
      revalidate: 3600,
    };
  }
}
