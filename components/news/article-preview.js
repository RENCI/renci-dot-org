import { Box, Skeleton, Stack, Typography } from "@mui/material"
import { Link } from "../link"
import { Tag } from "./tag"
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

export const ArticlePreview = ({
  article,
  isTagSelected,
  deleteTag,
  addTag,
  freeSearch,
  skeleton = false,
}) => {
  const date = new Date(article.publishDate)
  const [day, month, year] = [
    date.getUTCDate(),
    date.getUTCMonth() + 1,
    date.getUTCFullYear(),
  ]
  const dateString = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const articleLink = `news/${year}/${month}/${day}/${article.slug}`;

  const tags = [
    article.projects.map((x) => ({ ...x, type: 'projects' })),
    article.people.map((x) => ({ ...x, type: 'people' })),
    article.collaborations.map((x) => ({ ...x, type: 'collaborations' })),
    article.researchGroups.map((x) => ({ ...x, type: 'researchGroups' })),
    article.organizations.map((x) => ({ ...x, type: 'organizations' })),
    article.tags.map((x) => ({ ...x, type: 'postTags' }))
  ].flat();

  const titleFreeSearchMatches = match(article.title, freeSearch.join(' '), { 
    findAllOccurrences: true,
    insideWords: true,
  });
  const titleHighlightSections = parse(article.title, titleFreeSearchMatches);
  
  if (skeleton) return <Box>
    <Skeleton />
  </Box>

  return <Stack gap={1}>
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        alignItems: { xs: 'initial', sm: 'initial', md: 'baseline' },
        gap: { xs: 1, sm: 1, md: 2 },
        mb: { xs: 1, sm: 1, md: 0 },
      }}>
        <Stack direction='row' alignItems='center' gap={1}>
          <Typography variant="subtitle2" whiteSpace='nowrap'>{dateString}</Typography>
          <Box sx={{ width: '0.3em', height: '0.3em', backgroundColor: '#b6b6b6', borderRadius: '50%', flex: '0 0 auto' }} />
          <Typography variant="subtitle2" textTransform='uppercase'>{
            article.newsOrBlog === 'blog' ? 'Blog' : 'Feature'
          }</Typography>
        </Stack>

        <Stack direction='row' flex="1"  gap={1} sx={{ overflowX: 'auto', direction: { xs: 'ltr', sm: 'ltr', md: 'rtl'} }}>
          {tags.map(({ name, slug, type }, i) => {
            const id = type === 'postTags' ? name : slug;
            const isSelected = isTagSelected(id, type);
            return <Tag
              key={i}
              type={type}
              contents={name}
              inverted={isSelected}
              onClick={!isSelected ? () => { addTag(id, type) } : undefined}
              onDelete={isSelected ? () => { deleteTag(id, type) } : undefined}
              sx={{ minWidth: 'fit-content' }}
            />
          })}
        </Stack>
      </Box>
      <Typography variant="h3" sx={{ '& a': { textDecoration: 'none' }}}>
        <Link to={articleLink}>{
          titleHighlightSections.map((part, i) => (
            <span key={i} style={{
              fontWeight: part.highlight ? 'bold' : 'initial'
            }}>{part.text}</span>
          ))
        }</Link>
      </Typography>
    </Box>

    <Typography paragraph className="excerpt" sx={{
      '--maxHeight': 'calc(4rem * 1.5)',
      '&:before': {
        content: "''",
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(transparent 0px, white calc(var(--maxHeight) - 4px ))'
      },
      '& > .hover-link': {
        position: 'absolute',
        bottom: 0,
        right: 0,
      },
      position: 'relative',
      maxHeight: 'var(--maxHeight)',
      overflow: 'hidden',
    }}>
      {article.excerpt}
      <Link to={articleLink} className='hover-link'>Read more →</Link>
    </Typography>
  </Stack>
}

export const HomePageArticlePreview = ({article }) => {
  const date = new Date(article.publishDate)
  const [day, month, year] = [
    date.getUTCDate(),
    date.getUTCMonth() + 1,
    date.getUTCFullYear(),
  ]
  const dateString = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const articleLink = `/news/${year}/${month}/${day}/${article.slug}`;

  return <Stack gap={1}>
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        alignItems: { xs: 'initial', sm: 'initial', md: 'baseline' },
        gap: { xs: 1, sm: 1, md: 2 },
        mb: { xs: 1, sm: 1, md: 0 },
      }}>
        <Stack direction='row' alignItems='center' gap={1}>
          <Typography variant="subtitle2" whiteSpace='nowrap'>{dateString}</Typography>
          <Box sx={{ width: '0.3em', height: '0.3em', backgroundColor: '#b6b6b6', borderRadius: '50%', flex: '0 0 auto' }} />
          <Typography variant="subtitle2" textTransform='uppercase'>{
            article.newsOrBlog === 'blog' ? 'Blog' : 'Feature'
          }</Typography>
        </Stack>
      </Box>
      <Typography variant="h3" sx={{ 
        '& a': { 
          textDecoration: 'none', 
          fontWeight: '400'
        },
        paddingBottom: '0',
        paddingTop: '0.5rem'
      }}>
        <Link to={articleLink}>{article.title}</Link>
      </Typography>
    </Box>
    

    <Typography paragraph className="excerpt" sx={{
      '--maxHeight': 'calc(3rem * 1.5)',
      '&:before': {
        content: "''",
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(transparent 0px, white calc(var(--maxHeight) - 4px ))'
      },
      '& > .hover-link': {
        position: 'absolute',
        bottom: 0,
        right: 0,
      },
      position: 'relative',
      maxHeight: 'var(--maxHeight)',
      overflow: 'hidden',
    }}>
      {article.excerpt}
      <Link to={articleLink} className='hover-link'>Read more →</Link>
    </Typography>
  </Stack>
}