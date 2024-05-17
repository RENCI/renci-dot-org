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
  a: ({ href, ...props }) => (
    <Link
      to={ href }
      { ...props }
    />
  ),
  p: ({ children, ...props })=>(
    <Typography paragraph {...props} sx={{ '&:last-of-type': { mb: 0 }}}>{children}</Typography>
  ),
  h1: ({ children, ...props }) => (
    <Typography variant="h3" {...props}>{children}</Typography>
  ),
  h2: ({ children, ...props }) => (
    <Typography variant="h4" {...props}>{children}</Typography>
  ),
  h3: ({ children, ...props }) => (
    <Typography variant="h5" {...props}>{children}</Typography>
  ),
  ul: ({ children, ...props }) => (
    <ul style={{marginTop: 0, lineHeight: '1.8'}} {...props}>{children}</ul>
  ),
  table: ({ children, ...props }) => (
    <TableContainer component={Paper} sx={{ mt: 2, mb: 4 }}>
      <Table {...props}>{children}</Table>
    </TableContainer>
  ),
  thead: ({ children, ...props }) => (
    <TableHead {...props}>{children}</TableHead>
  ),
  tbody: ({ children, ...props }) => (
    <TableBody {...props}>{children}</TableBody>
  ),
  tr: ({ children, ...props }) => (
    <TableRow {...props}>{children}</TableRow>
  ),
  th: ({ children, ...props }) => (
    <TableCell {...props}>{children}</TableCell>
  ),
  td: ({ children, ...props }) => (
    <TableCell {...props}>{children}</TableCell>
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
