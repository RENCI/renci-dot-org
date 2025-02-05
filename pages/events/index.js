import React from 'react'
import { Box } from '@mui/material'
import { Calendar } from '@/components/events'
import { Page } from '@/components/layout'

export default function Events() {
  return (
    <Page
      title="Events"
    >
      <Box sx={{ padding: 2 }}>
        <Calendar />
      </Box>
    </Page>
  )
}
