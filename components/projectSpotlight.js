import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Stack, Box, Card, CardHeader, CardMedia, CardContent, Typography, CardActionArea, ButtonBase, useMediaQuery } from '@mui/material'
import { Link } from './link'
import { Pre } from './pre'
import { useTheme } from '@mui/material/styles'
import { MarkdownLess } from './markdown'
import serverRacks from '../images/racks.jpg'

export const ProjectCard = ({project}) => {
  const styles = {
    project: {
      textAlign: 'center',
      position: 'relative',
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
    },
    cardMedia: {
      minHeight: '200px',
      maxHeight: '200px'
    },
    description: {
      flex: '1',
      alignItems: 'space-between',
      flexDirection: 'column',
      marginTop: '1rem',
      '& p': {
        fontSize: '85%',  
      },
    },
    noSnippet: {
      flex: '1',
      flexDirection: 'column',
      verticalAlign: 'middle', 
      marginTop: '2.5rem',
    },
    textOverlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: "100%",
      width: "100%",
      color: 'white',
      backgroundColor: 'rgba(1,1,1,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 500ms ease-out',
      backdropFilter: 'blur(2px)',
      '& h6': {
        fontWeight: '500',
        padding: '0 1rem',
        letterSpacing: '0.5px',
        fontSize: '115%',
        transition: 'color 200ms',
      },
      '&:hover': {
        color: 'black',
        backgroundColor: 'rgba(255,255,255,0.65)',
        backdropFilter: 'none',
      }
    }
  }
  
  return (
    <Card sx={styles.project} key={project.slug}>
      <CardActionArea component={Link} to={ `/projects/${ project.slug }` }>
          <CardMedia component={'img'} src={ project.featuredImage.length > 0 ? project.featuredImage[0].url : serverRacks.src } sx={styles.cardMedia} />
          <Box sx={styles.textOverlay}>
            <Typography variant='h6'>{project.shortTitle ? project.shortTitle : project.webName}</Typography>
          </Box>
      </CardActionArea>
      <CardContent sx={project.webDescription ? styles.description : styles.noSnippet}>
        <MarkdownLess paragraph >{ project.snippet }</MarkdownLess>
      </CardContent>
      <CardContent>
        <Link to={ `/projects/${ project.slug }` } style={{textAlign: 'right'}}>Read More</Link>
      </CardContent>
    </Card>
  )
}

export const ProjectSpotlight = ({ selectedProjects }) => {
  const mobile = useMediaQuery('(max-width: 680px)')

  const theme = useTheme()
  const styles = {
    wrapper: {
      width: '100%',
      justifyContent: 'space-around',
      margin: '2rem auto',
    },
  }

  return (
    <Fragment>
      <Typography variant='h2'>Project Spotlight</Typography>
      <Stack
        direction={{ sm: 'column', md: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={styles.wrapper}
      >
        {
          selectedProjects.map(project => (
            <ProjectCard project={project} key={`spotlight-${project.slug}`}/>
          ))
        }
      </Stack>
    </Fragment>
  )
}
