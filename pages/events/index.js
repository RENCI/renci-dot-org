import React, { useState, useEffect } from 'react'
import { Box, Dialog, Typography, Divider } from '@mui/material'
import { useRouter } from "next/router"
import { fetchEvents } from '@/utils/msgraphapi'
import { transformEventData } from '@/utils/eventHelpers'
import { Calendar, EventDialog } from '@/components/events'
import { Page } from '@/components/layout'
import { format, addMonths, subMonths } from 'date-fns'

export default function Events() {
  const [date, setDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      try {
        setLoading(true)
        const fetchedEvents = await fetchEvents(format(date, 'yyyy'), format(date, 'MM'))
        setEvents(transformEventData(fetchedEvents))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }

    fetchAndSetEvents()
  }, [date])

  const handleNavigate = (action) => {
    let newDate
    if (action === "NEXT") {
      newDate = addMonths(date, 1)
    } else if (action === "PREV") {
      newDate = subMonths(date, 1)
    } else {
      newDate = new Date() // for 'today' button
    }

    setDate(newDate)
    router.push(`/events/${format(newDate, "yyyy")}/${format(newDate, "MM")}`)
  }

  const handleSelectEvent = (event) => setSelectedEvent(event)

  const handleCloseDialog = () => setSelectedEvent(null)

  const handleSeeMore = () => {
    selectedEvent?.slug && router.push(`/events/${selectedEvent.slug}`)
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Page hideTitle title="Events">
      <Typography variant="h1">Events</Typography>
      <Divider sx={{my: '1.5rem'}}/>

      <Box sx={{ padding: 2 }}>
        <Calendar 
          date={date} 
          events={events} 
          onSelectEvent={handleSelectEvent} 
          onNavigate={handleNavigate} 
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

// there is no data needed for this page, but this is a workaround to prevent getInitialProps from
// running on this client page
export const getStaticProps = () => {
  return { props: { dummyValue: 1 } }
}