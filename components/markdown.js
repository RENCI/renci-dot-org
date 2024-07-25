import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import { Link } from './link'
import { Fragment } from 'react'
import remarkGfm from 'remark-gfm'

// this object defines a map:
//    DOM elements --> React components.
// this allows us to streamline styles for content coming
// from Strapi with that of content built here by Nextjs.

const componentMap = {
  // for links, we'll use our smart link component.
  a: ({ href, children }) => (
    <Link to={ href }>{children}</Link>
  ),
  p: ({ children })=>(
    <Typography paragraph sx={{ '&:last-of-type': { mb: 0 }}}>{children}</Typography>
  ),
  h1: ({ children }) => (
    <Typography variant="h3">{children}</Typography>
  ),
  h2: ({ children }) => (
    <Typography variant="h4">{children}</Typography>
  ),
  h3: ({ children }) => (
    <Typography variant="h5">{children}</Typography>
  ),
  ul: ({ children }) => (
    <ul style={{marginTop: 0, lineHeight: '1.8'}}>{children}</ul>
  ),
  table: ({ children }) => (
    <TableContainer component={Paper} sx={{ mt: 2, mb: 4 }}>
      <Table>{children}</Table>
    </TableContainer>
  ),
  thead: ({ children }) => (
    <TableHead>{children}</TableHead>
  ),
  tbody: ({ children }) => (
    <TableBody>{children}</TableBody>
  ),
  tr: ({ children }) => (
    <TableRow>{children}</TableRow>
  ),
  th: ({ children }) => (
    <TableCell>{children}</TableCell>
  ),
  td: ({ children }) => (
    <TableCell>{children}</TableCell>
  ),
}

export const Markdown = ({ children }) => {
  return (
    <ReactMarkdown components={ componentMap } remarkPlugins={[remarkGfm]}>
      { children }
    </ReactMarkdown>
  )
}

// this component map removes markdown styling to 
// replace it with spans while keeping the content
const markdownlessMap = {
  a: ({ node, children}) => (
    <Fragment>{children}</Fragment>
  ),
  p: ({ node, children})=>(
    <Fragment>{children}</Fragment>
  ),
  h1: ({ node, children}) => (
    <Fragment>{children}</Fragment>
  ),
  h2: ({ node, children}) => (
    <Fragment>{children}</Fragment>
  ),
  h3: ({ node, children}) => (
    <Fragment>{children}</Fragment>
  ),
  ul: ({ node, children}) => (
    <Fragment>{children}</Fragment>
  ),
  li: ({ node, children}) => (
    <Fragment>{children}</Fragment>
  )
}


export const MarkdownLess = ({children}) => {
  return (
    <ReactMarkdown components={ markdownlessMap }>
      { children }
    </ReactMarkdown>
  )
}
