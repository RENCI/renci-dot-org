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

export default function Home({ selectedProjects, newsArray }) {
  const { config } = useConfig();

  return (
    <>
      <SliceSection contentBgColor={"white"}>
        <Satellite />
        {/* <Box sx={{ maxWidth: "60%" }}>
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
        </Box> */}
      </SliceSection>

      <SliceSection
        contentSide="right"
        contentBgColor={"rgb(30 55 91)"}
        sx={{ color: "white" }}
      >
        <Box sx={{ maxWidth: "60%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            variant="h1"
            my={2}
            sx={{textWrap: "balanced"}}
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
          <Button variant="contained" endIcon={<ArrowRight />} sx={{ alignSelf: 'flex-end'}}>
            Learn more
          </Button>
        </Box>
      </SliceSection>
      
      <SliceSection
        contentSide="left"
        contentBgColor={"rgb(49 114 138)"}
        sx={{ color: "white" }}
      >
        <Box sx={{ maxWidth: "60%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            variant="h1"
            my={2}
            sx={{textWrap: "balanced"}}
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
          <Button variant="contained" endIcon={<ArrowRight />} sx={{ alignSelf: 'flex-end', background: 'rgb(255, 68, 202)', borderRadius: '8px' }}>
            Learn more
          </Button>
        </Box>
      </SliceSection>

      {/* <Box
        sx={{
          width: "100%",
          minHeight: "100dvh",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container width={config.width}>
          <Typography variant="h1" width="50%" my={2}>What we do</Typography>
          <Typography variant="body1" width="60%" my={4}>
          RENCI (Renaissance Computing Institute) develops and deploys advanced technologies to enable
          research discoveries and practical innovations. RENCI partners with researchers, government,
          and industry to engage and solve the problems that affect North Carolina, our nation, and 
          the world. An institute of the University of North Carolina at Chapel Hill, RENCI was launched
          in 2004 as a collaboration involving UNC Chapel Hill, Duke University, and North Carolina State University.
          </Typography>
          <Button variant="outlined" endIcon={<ArrowRight />}>About us</Button>
        </Container>
      </Box> */}
    </>

    // <Page
    //   title="Home"
    //   description="Welcome to RENCI.org"
    //   heroImage={ homeHero.src }
    // >
    //   <Typography paragraph>
    //     The Renaissance Computing Institute (RENCI) is a research institute at UNC-Chapel
    //     Hill that focuses on data science for the greater good. We are a team of innovators,
    //     problem-solvers, and forward-thinking individuals from a diverse range of backgrounds,
    //     skill sets, and perspectives coming together to conduct groundbreaking research and
    //     enact positive change at the local, state, national, and international levels. Explore
    //     our various projects, research groups, collaborations, and operations teams to learn
    //     more about our work and the people who make it happen.
    //   </Typography>

    //   <ProjectSpotlight selectedProjects={selectedProjects}/>
    //   {
    //     newsArray && (
    //       <Fragment>
    //         <Typography variant='h2' sx={{paddingTop: '1rem'}}>Recent News</Typography>
    //         <Stack direction='column' gap={2} paddingY={2}>
    //           { newsArray.map((article, i) => (
    //             <HomePageArticlePreview
    //               key={i}
    //               article={article}
    //             />
    //           ))}
    //         </Stack>
    //       </Fragment>
    //     )
    //   }

    // </Page>
  );
}

function SliceSection({ children, contentSide = "left", contentBgColor, sx }) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        justifyContent: contentSide === "left" ? "flex-start" : "flex-end",
        alignItems: "stretch",
        overflow: "hidden",
        ...sx,
      }}
    >
      <Box sx={{ zIndex: -1 }}>
        <Image
          src={homeHero}
          alt="An abstract background image"
          quality="100"
          layout="fill"
          objectFit="cover"
        />
      </Box>

      <Box
        sx={{
          filter:
            contentSide === "left"
              ? "drop-shadow(10px 0px 5px rgba(0,0,0,0.15))"
              : "drop-shadow(-10px 0px 5px rgba(0,0,0,0.15))",
          flex: 1,
          maxWidth: "60%",
        }}
      >
        <Box
          sx={{
            backgroundColor: contentBgColor,
            zIndex: 2,
            height: "100%",
            clipPath:
              contentSide === "left"
                ? "polygon(0 0, 100% 0, 80% 100%, 0% 100%)"
                : "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
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
