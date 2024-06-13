import React from 'react'
import { Card, CardContent, Stack } from '@mui/material/'
import { InfoBlock } from './InfoBlock'
import { hexToRgb } from '@/utils/hextoRgb'

export const ColorBlock = ({colorName, colorHex}) => {
  const { r, g, b } = hexToRgb(colorHex)
  const colorRgb = `rgb(${[r, g, b].join(', ')})`
  
  return (
    <Card elevation={3} sx={{ display: 'flex', flexDirection: 'row' }}>
      <CardContent sx={{ flex: 1, backgroundColor: colorHex }}/>
      <CardContent sx={{ flex: 5, m: 0.75 }}>
        <Stack 
          direction={{ sm: 'column', md: 'row' }} 
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <InfoBlock copyable title="Name" body={ colorName } style={{ flexBasis: '33%' }} />
          <InfoBlock copyable title="Hex" body={ colorHex } style={{ flexBasis: '33%' }} />
          <InfoBlock copyable title="RGB" body={ colorRgb } style={{ flexBasis: '33%' }} />
        </Stack>
      </CardContent>
    </Card>
  )
}