import { CollaborationLogos } from "@/components/home/collaborations/collaboration-logos";
import { ContactForm } from "@/components/home/contact-form";
import { FlexSpaceCarousel } from "@/components/home/flex-space-carousel";
import { ResearchGroupSummaries } from "@/components/home/research-group-summaries";
import { Satellite } from "@/components/home/satellite";
import { SliceSection } from "@/components/home/slice-section";
import { SlideUpBox } from "@/components/home/slide-up-box";
import SliderPage from "@/components/home/slider-page";
import { SolidSection } from "@/components/home/solid-section";
import { fetchDashboardProjects } from "@/lib/dashboard/projects";
import { ArrowRight } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import homeHero from "../images/eds-bg.png";
import homeHero2 from "../images/home-hero-2.png";
import { fetchHomeNews } from "../lib/strapi";
import Link from "next/link";

export default function Home({ selectedProjects, newsArray }) {
  return (
    <>
      <SliceSection
        contentBgColor={"white"}
        bgImage={homeHero}
        sx={{ position: "relative" }}
        clearBackground
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
          <Link href="/about" passHref>
            <Button
              variant="outlined"
              endIcon={<ArrowRight />}
              sx={{ borderRadius: '8px' }}
            >
              Learn more
            </Button>
          </Link>
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
        bgImage={homeHero2}
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
          <FlexSpaceCarousel 
            slides={[
              {
                title: "NC researchers come together to harness...",
                tag: "News",
                content: "In an increasingly interconnected world, the integration of clinical and environmental health data holds immense potential for advancing research, improving patient outcomes, and shaping the future of healthcare. However, to truly make an impact on individuals and communities, institutional and scientific silos that hinder collaboration and resource",
                link: "",
              },
              {
                title: "Coastal Hazard and Risk Modeling - Evacuation Modeling",
                tag: "Blog",
                content: "To save lives, it is critical to know the best way to protect people in the path of a hurricane. While emergency managers use models to inform evacuation routes and timing, existing models are based primarily on “clearance time,” or ensuring that evacuees are on the roads for the shortest amount of time. The models do not take into account what populations are at most at risk, potential for injury or loss of life, or other social factors.",
                link: "/projects",
              },
              {
                title: "ImPACT",
                tag: "Projects",
                content: "Scientific progress today requires multi-institutional and cross-disciplinary sharing and analysis of data. Many disciplines, such as social and health-related sciences, face a web of policies and technological constraints on data due to privacy concerns over, for example, Personal Health Information (PHI) or Personally Identifiable Information (PII). Issues of privacy, safety, competition, and ownership have led to regulations controlling data location, availability, movement, and access. Compliance poses obstacles to traditional data-processing practices and slows research; yet, increasingly, pressing scientific and societal problems demand collaborative efforts involving data from multiple stakeholders.",
                link: "/projects",
              },
              {
                title: "Data Matters short-course series returns in August 2023",
                tag: "News",
                content: "Now in its tenth year, Data Matters, a week-long series of one and two-day courses aimed at students and professionals in business, research, and government, will take place August 7 – 11, 2023 virtually via Zoom. This short course series is sponsored by the Odum Institute for Research in Social Science at UNC-Chapel Hill, the National Consortium for Data Science, and RENCI.",
                link: "/projects",
              },
            ]}
          />
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
              technical expertise to advance discovery within their field.
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
            Founded in 2004, RENCI has demonstrated experience and driven
            innovation across a variety of projects and domains.
          </Typography>
          <Link href="/about" passHref>
            <Button variant="outlined" endIcon={<ArrowRight />} sx={{ borderRadius: '8px' }}>
              Read our mission statement
            </Button>
          </Link>
        </Box>
      </SolidSection>

      <SliceSection
        contentSide="left"
        contentBgColor={"rgb(32 49 82)"}
        sx={{ color: "white" }}
        otherSide={<CollaborationLogos />}
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
            Collaborating with industry-leading organizations
          </Typography>
          <Typography sx={{ textWrap: "balanced" }} my={4}>
            RENCI’s expertise in leading and coordinating large and complex team
            science projects is recognized at the national scale, and our
            growing outreach and engagement expertise has landed us funding on
            multiple new federal projects. Though we have well-established and
            recognized expertise in many domain-specific areas, we know that our
            potential for success and impact on society is far greater when we
            combine our expertise and resources with other teams, and we strive
            to continuously and intentionally embody the spirit of
            collaboration.
          </Typography>
          <Link href="/news" passHref>
            <Button
              variant="contained"
              endIcon={<ArrowRight />}
              sx={{
                borderRadius: "8px",
                color: 'white',
                backgroundColor: 'rgb(255, 68, 202)',
                '&:hover': {
                  backgroundColor: 'rgb(206, 57, 164)',
                },
              }}
            >
              Learn more
            </Button>
          </Link>
        </Box>
      </SliceSection>

      <SliderPage
        title={"Featured Projects"}
        subtitle={"See all projects"}
        items={
          selectedProjects.map(
            ({ id, webName, webDescription, slug, featuredImage }) =>
              ({
                key: id,
                title: webName,
                description: webDescription,
                link: `/projects/${slug}`,
                image: featuredImage?.[0]?.url ?? undefined,
              })
          )
        }
        bgColor={"white"}
      />

      <SliderPage
        title={"Recent articles"}
        subtitle={"See all articles"}
        items={
          newsArray.map(
            ({ id, title, slug, publishDate, excerpt }) => 
              ({
                key: id,
                title,
                description: excerpt,
                link: `/news/${publishDate.split('-')[0]}/${publishDate.split('-')[1].replace('0', '')}/${publishDate.split('-')[2].replace('0', '')}/${slug}`
              })
          )
        }
        bgColor={"linear-gradient(to bottom, rgb(89 141 151), rgb(95 173 161))"}
        color={"white"}
      />

      <SolidSection
        bgColor={"rgb(32 49 82)"}
        sx={{ color: 'white' }}
        title={
          <Box sx={{ maxWidth: "60%" }}>
            <Typography
              variant="h1"
              my={2}
              sx={{ textWrap: "balanced", fontWeight: "bold" }}
            >
              Contact us
            </Typography>
            <Typography sx={{ textWrap: "balanced" }}>
              Interested in learning more or working with RENCI? Please fill out this form.
            </Typography>
          </Box>
        }
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", width: '70%' }}>
          <ContactForm />
        </Box>        
      </SolidSection>
    </>
  );
}

export async function getStaticProps() {
  try {
    const [newsArray, projects] = await Promise.all([
      fetchHomeNews(),
      fetchDashboardProjects(),
    ]);

    let projectsCopy = [...projects];
    let projectSelection = [];
    for (let i = 0; i < 10; i += 1) {
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
