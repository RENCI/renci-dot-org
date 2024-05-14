import React from 'react'
import Grid from '@mui/material/Grid'
import { ColorBlock } from './ColorBlock'

export const ColorSection = (props) => {
  const { colors } = props
  return (
    <Grid container >
      {
        Object.keys(colors).map(function(key) {
          return (
            <Grid item xs={12}  key={ colors[key].name }>
              <ColorBlock colorName={ colors[key].name } colorHex={ colors[key].hex } />
            </Grid>
          )
        })
      }
    </Grid>
  )
}