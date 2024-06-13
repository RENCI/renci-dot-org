import React from 'react'
import Grid from '@mui/material/Grid'
import { LogoBlock } from './LogoBlock'

export const LogoSection = ({logos}) => {
  return (
    <Grid container sx={{ mb: 3 }} spacing={3}>
      {
        logos.map( (logo) => {
          return <Grid item xs={12} md={ 6 } lg={4} key={ logo.image }>
            <LogoBlock logo={ logo.image } bgColor={ logo.bgColor }/>
          </Grid>
        })
      }
    </Grid>
  )
}