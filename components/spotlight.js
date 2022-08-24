import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Card, CardHeader, CardMedia, CardContent, Typography, CardActionArea, ButtonBase, Grid, useMediaQuery } from '@mui/material'
import { Link } from './link'
import { Pre } from './pre'
import { useTheme } from '@mui/material/styles'
import LinesEllipsis from 'react-lines-ellipsis'
import homeHero from '../images/racks.jpg'

const SpotlightCard = ({project}) => {
  const styles = {
    project: {
      flex: '1',
      textAlign: 'center',
      // maxHeight: '450px',
      // minWidth: '160px',
      position: 'relative',
    },
    cardMedia: {
      minHeight: '150px',
      maxHeight: '150px'
    },
    cardContent: {
      minHeight: '210px',
      display: 'flex',
      flexDirection: 'column',
      '& p': {
        fontSize: '85%',  
      }
    },
    textOverlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: "100%",
      width: "100%",
      color: 'white',
      backgroundColor: 'rgba(1,1,1,0.25)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 750ms ease-out',
      backdropFilter: 'blur(2px)',
      '& h6': {
        fontWeight: '500',
        padding: '0 1rem',
        letterSpacing: '0.5px',
        fontSize: '120%',
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
    <Card sx={styles.project}>
      <CardActionArea component={Link} to={ `/projects/${ project.id }` }>
        {/* find a way to make this one component and make sure the height stays the same whether there is an image or not */}    
          <CardMedia component={'img'} src={ project.featuredImage ? project.featuredImage.url : homeHero.src } sx={styles.cardMedia} />
          <Box sx={styles.textOverlay}>
            <Typography variant='h6'>{project.name}</Typography>
          </Box>
      </CardActionArea>
      <CardContent sx={styles.cardContent}>
        <Typography paragraph sx={{flex: '1'}}>{ project.snippet ? project.snippet : null }</Typography>
          <br/>
        <Link to={ `/projects/${ project.id }` } style={{textAlign: 'right'}}>Read More</Link>
      </CardContent>
    </Card>
  )
}

export  const Spotlight = ({ projects }) => {
  const mobile = useMediaQuery('(max-width: 680px)')

  const theme = useTheme()
  const styles = {
    wrapper: {
      width: '100%',
      justifyContent: 'space-around',
      margin: '2rem auto',
    },
  }
  const trimText = (description = "Click to read more", wordCount = 27) => {
    //split the description into an array of words
    const snippetArray = description.split(' ')

    //grab the first X number of words as defined by the wordCount above
    const trimmedSnippetArray = snippetArray.slice(0, wordCount)
    
    //if the number of words in the description is longer than the wordcount, return a string that has an ellipsis at the end. if not, return a string that just joins the words from the trimmed array
    return snippetArray.length >= wordCount ? `${trimmedSnippetArray.join(' ')} ...` : trimmedSnippetArray.join(' ')
  }

  const [selectedProjects, setSelectedProjects] = useState([])

  useEffect(() => {
    // select three random project indices
    let projectsCopy = [...projects]
    let projectSelection = []
    for (let i = 0; i < 3; i += 1) {
      const randomIndex = Math.floor(Math.random() * projectsCopy.length)
      const randomProject = projectsCopy.splice(randomIndex, 1)[0]
      //add a property that is a snippet of the original description before pushing to the array
      projectSelection.push({
        ...randomProject,
        snippet: trimText(randomProject.description)
      })
    }
    // map those indices to projects
    setSelectedProjects(projectSelection)
  }, [])

  return (
    <Fragment>
      <Typography variant='h3' style={{margin: '2rem 0'}}>Spotlight</Typography>
        <Grid container sx={styles.wrapper}>
          {
            selectedProjects.map(project => (
              <Grid item xs={12} sm={3} key={project.id}>
                <SpotlightCard project={project}/>
              </Grid>
            ))
          }
        </Grid>
    </Fragment>
  )
}
