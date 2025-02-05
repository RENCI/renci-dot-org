import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { fetchEvents } from '@/utils/msgraphapi'
import { transformEventData } from '@/utils/eventHelpers'
import { Calendar } from '@/components/events'
import { Page } from '@/components/layout'

export default function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents()
        const formattedEvents = transformEventData(fetchedEvents)
        setEvents(formattedEvents)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }
  
    loadEvents()
  }, [])

  return (
    <Page
      title="Events"
    >
      <Box sx={{ padding: 2 }}>
        <Calendar events={events}/>
      </Box>
    </Page>
  )
}
