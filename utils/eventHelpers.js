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

    const year = format(new Date(startDate), 'yyyy')
    const month = format(new Date(startDate), 'MM')
    const day = format(new Date(startDate), 'dd')
    const eventTitleSlug = slugify(event.subject || 'untitled')
    
    return {
      id: event.id,
      title: event.subject || 'Untitled',
      start: new Date(startDate),
      end: new Date(endDate),
      category: event.categories.length > 0 ? event.categories[0] : 'Uncategorized',
      excerpt: event.bodyPreview || '',
      slug: `${year}/${month}/${day}/${eventTitleSlug}`,  // Full slug with date and title
    }
  })
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')         // Replace spaces with -
    .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
    .replace(/\-\-+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')           // Trim - from start of text
    .replace(/-+$/, '')          // Trim - from end of text
}
