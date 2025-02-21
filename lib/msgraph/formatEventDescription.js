import TurndownService from 'turndown'

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
