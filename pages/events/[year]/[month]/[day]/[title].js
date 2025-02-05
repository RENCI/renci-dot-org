import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { fetchEvents } from '@/utils/msgraphapi'
import { transformEventData } from '@/utils/eventHelpers'
import { Page } from "@/components/layout"
import { Markdown } from "@/components/markdown"
import { Pre } from "@/components/pre"

export default function EventPage() {
  const [event, setEvent] = useState(null)
  const [rawEvents, setRawEvents] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { year, month, day, title } = router.query

  useEffect(() => {
    const fetchEvent = async () => {
      if (!year || !month || !day || !title) return

      try {
        // from msgraphapi
        const eventsFromQuery = await fetchEvents()

        // rawEvents is only for debugging and exploratory purposes
        // remove rawEvents and setRawEvents when this page is finalized
        setRawEvents(eventsFromQuery)

        // from react router
        const eventSlugFromURL = `${year}/${month}/${day}/${title}`

        // transform msgraphapi events to be more readable
        const formattedEventsFromQuery = transformEventData(eventsFromQuery)

        // match slug from react router with slug from transformed event data
        const foundEvent = formattedEventsFromQuery.find((event) => {
          return eventSlugFromURL === event.slug
        })

        if (!foundEvent) {
          throw new Error('Event not found')
        }

        setEvent(foundEvent)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [year, month, day, title])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Page 
      title={event.title}
    >      
      <Markdown>
        {event.description}
      </Markdown>

      <Pre>{JSON.stringify(event, null, 2) }</Pre>
      <Pre>{JSON.stringify(rawEvents, null, 2) }</Pre>
    </Page>
  )
}
