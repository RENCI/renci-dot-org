import React, { useEffect, useState } from 'react'
import { Box, Dialog } from '@mui/material'
import { useRouter } from 'next/router'
import { fetchEvents } from '@/utils/msgraphapi'
import { transformEventData } from '@/utils/eventHelpers'
import { Calendar, EventDialog } from '@/components/events'
import { Page } from '@/components/layout'

export default function Events() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        const fetchedEvents = await fetchEvents()
        setEvents(transformEventData(fetchedEvents))
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    })()
  }, [fetchEvents, setEvents, transformEventData])

  const handleSelectEvent = (event) => setSelectedEvent(event)

  const handleCloseDialog = () => setSelectedEvent(null)

  const handleSeeMore = () => {
    selectedEvent?.slug && router.push(`/events/${selectedEvent.slug}`)
  }

  return (
    <Page
      title="Events"
    >
      <Box sx={{ padding: 2 }}>
        <Calendar
          events={events}
          onSelectEvent={handleSelectEvent}
        />
        <Dialog
          open={!!selectedEvent} 
          onClose={handleCloseDialog}
        >
          <EventDialog
            selectedEvent={selectedEvent}
            handleSeeMore={handleSeeMore}
            handleCloseDialog={handleCloseDialog}
          />
        </Dialog>
      </Box>
    </Page>
  )
}
