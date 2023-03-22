import { Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import { Link } from './link'

// this object defines a map:
//    DOM elements --> React components.
// this allows us to streamline styles for content coming
// from Strapi with that of content built here by Nextjs.

const componentMap = {
  // for links, we'll use our smart link component.
  a: ({ node, href, ...props }) => (
    <Link
      to={ href }
      { ...props }
    />
  ),
  p: ({ node, children, ...props })=>(
    <Typography paragraph {...props}>{children}</Typography>
  ),
  h1: ({ node, children, ...props }) => (
    <Typography variant="h3" {...props}>{children}</Typography>
  ),
  h2: ({ node, children, ...props }) => (
    <Typography variant="h4" {...props}>{children}</Typography>
  ),
  h3: ({ node, children, ...props }) => (
    <Typography variant="h5" {...props}>{children}</Typography>
  ),
  ul: ({ node, children, ...props }) => (
    <ul style={{marginTop: 0, lineHeight: '1.8'}} {...props}>{children}</ul>
  ),
}

export const Markdown = ({ children }) => {
  return (
    <ReactMarkdown components={ componentMap }>
      { children }
    </ReactMarkdown>
  )
}

// this component map removes markdown styling to 
// replace it with spans while keeping the content
const markdownlessMap = {
  a: ({ node, href, children}) => (
    <span>{children}</span>
  ),
  p: ({ node, children})=>(
    <span>{children}</span>
  ),
  h1: ({ node, children}) => (
    <span>{children}</span>
  ),
  h2: ({ node, children}) => (
    <span>{children}</span>
  ),
  h3: ({ node, children}) => (
    <span>{children}</span>
  ),
  ul: ({ node, children}) => (
    <span>{children}</span>
  ),
  li: ({ node, children}) => (
    <span>{children}</span>
  )
}


export const MarkdownLess = ({children}) => {
  return (
    <ReactMarkdown components={ markdownlessMap }>
      { children }
    </ReactMarkdown>
  )
}
