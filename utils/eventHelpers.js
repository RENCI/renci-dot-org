import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import TurndownService from 'turndown'

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
      description: formatEventDescription(event.body.content) || '',  
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

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
 })

 turndownService.addRule('anchorLinks', {
  filter: 'a',
  replacement: (content, node) => {
    const href = node.getAttribute('href')
    const title = node.getAttribute('title') || ''
    return `[${content}](${href} "${title}")`
  },
 })
 
 export function formatEventDescription(description) {
  // remove HTML comments
  let cleanedDescription = description.replace(/<!--[\s\S]*?-->/g, '')
 
  // remove inline styles and font-family definitions
  cleanedDescription = cleanedDescription.replace(/style="[^"]*"/g, '')
  cleanedDescription = cleanedDescription.replace(/@font-face {[^}]*}/g, '')
 
  // check if description contains remaining HTML tags
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(cleanedDescription)
 
  if (isHTML) {
    // If HTML, convert it to markdown using Turndown
    const markdown = turndownService.turndown(cleanedDescription)
    return markdown
  } else {
    // If plain text, return as-is assuming it might already be markdown-friendly
    return cleanedDescription.trim()
  }
 }
