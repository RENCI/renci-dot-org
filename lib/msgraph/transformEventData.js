import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { slugify, formatEventDescription } from './'

export function transformEventData(events) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return events.map(event => {
    const rawStart = event.start.dateTime 
    const rawEnd = event.end.dateTime
    const eventTimeZone = event.start.timeZone || userTimeZone 

    const startDate = formatInTimeZone(rawStart, eventTimeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    const endDate = formatInTimeZone(rawEnd, eventTimeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")

    const year = format(new Date(startDate), 'yyyy')
    const month = format(new Date(startDate), 'MM')
    const day = format(new Date(startDate), 'dd')
    const dayOfWeek = format(new Date(startDate), 'eeee')
    const eventTitleSlug = slugify(event.subject || 'untitled')
    const displayDate = format(new Date(startDate), 'MMMM d, yyyy')
    
    const startTime = formatInTimeZone(startDate, userTimeZone, 'h:mm a')
    const endTime = formatInTimeZone(endDate, userTimeZone, 'h:mm a')
    const displayTimeZone = formatInTimeZone(startDate, userTimeZone, 'zzz')
    
    return {
      id: event.id,
      title: event.subject || 'Untitled',
      start: new Date(startDate),
      end: new Date(endDate),
      category: event.categories.length > 0 ? event.categories[0] : 'Uncategorized',
      excerpt: event.bodyPreview || '',
      slug: `${year}/${month}/${day}/${eventTitleSlug}`,  // Full slug with date and title
      description: formatEventDescription(event.body.content) || '',  
      location: event.location.displayName || '',
      startTime,
      endTime,
      displayTimeZone,
      displayDate,
      dayOfWeek,
    }
  })
}