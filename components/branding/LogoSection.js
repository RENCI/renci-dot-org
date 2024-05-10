import React from 'react'
import Grid from '@mui/material/Grid'
import { LogoBlock } from './LogoBlock'

const styles = {
    logoGrid: {
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
    },
    logoBlock: {
        flexGrow: 1,
        width: '100%',
    },
}

export const LogoSection = ({logos}) => {
  return (
    <Grid container sx={ styles.logoGrid }>
      {
        logos.map( (logo) => {
          return <Grid item xs={12} md={ 6 } lg={4} sx={ styles.logoBlock } key={ logo.image }>
            <LogoBlock logo={ logo.image } bgColor={ logo.bgColor }/>
          </Grid>
        })
      }
    </Grid>
  )
}