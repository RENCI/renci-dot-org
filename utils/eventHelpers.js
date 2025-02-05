import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

export function transformEventData(events) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return events.map(event => {
    const rawStart = event.start.dateTime 
    const rawEnd = event.end.dateTime
    const eventTimeZone = event.start.timeZone || userTimeZone 

    const startDate = formatInTimeZone(rawStart, eventTimeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    const endDate = formatInTimeZone(rawEnd, eventTimeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")

    return {
      id: event.id,
      title: event.subject || 'Untitled',
      start: new Date(startDate),
      end: new Date(endDate),
    }
  })
}
