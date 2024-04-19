import { Fragment } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Typography, Stack } from '@mui/material'
import { Link, Page } from '../components'
import homeHero from '../images/racks.jpg'
import { ProjectSpotlight } from '../components/projectSpotlight'
import { fetchDashboardProjects } from "@/lib/dashboard/projects";
import { fetchHomeNews } from '../lib/strapi'
import { HomePageArticlePreview } from "../components/news/article-preview";

export default function Home({ selectedProjects, newsArray }) {

  return (
    <Page
      title="Home"
      description="Welcome to RENCI.org"
      heroImage={ homeHero.src }
    >
      <Typography paragraph>
        The Renaissance Computing Institute (RENCI) is a research institute at UNC-Chapel 
        Hill that focuses on data science for the greater good. We are a team of innovators, 
        problem-solvers, and forward-thinking individuals from a diverse range of backgrounds, 
        skill sets, and perspectives coming together to conduct groundbreaking research and 
        enact positive change at the local, state, national, and international levels. Explore 
        our various projects, research groups, collaborations, and operations teams to learn 
        more about our work and the people who make it happen. 
      </Typography>
      
      <ProjectSpotlight selectedProjects={selectedProjects}/>
      {
        newsArray && (
          <Fragment>
            <Typography variant='h2' sx={{paddingTop: '1rem'}}>Recent News</Typography>
            <Stack direction='column' gap={2} paddingY={2}>
              { newsArray.map((article, i) => (
                <HomePageArticlePreview
                  key={i}
                  article={article}
                />
              ))}
            </Stack>
          </Fragment>
        )
      }
      
    </Page>
  )
}

export async function getServerSideProps({ res }) {
  try {
    res.setHeader(
      'Cache-Control',
      'no-cache, no-store, must-revalidate'
    )
  
    const [newsArray, projects] = await Promise.all([
      fetchHomeNews(),
      fetchDashboardProjects(),
    ]);
    
    let projectsCopy = [...projects]
    let projectSelection = []
    for (let i = 0; i < 3; i += 1) {
      const randomIndex = Math.floor(Math.random() * projectsCopy.length)
      const randomProject = projectsCopy.splice(randomIndex, 1)[0]
      //add a property that is a snippet of the original description before pushing to the array
      projectSelection.push({
        ...randomProject,
      })
    }

    return {
      props: { 
        selectedProjects: JSON.parse(JSON.stringify(projectSelection)), 
        newsArray: JSON.parse(JSON.stringify(newsArray)) 
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { selectedProjects: [], newsArray: [] }
    };
  }
}
