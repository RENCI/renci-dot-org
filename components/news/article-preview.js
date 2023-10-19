import { useRouter } from 'next/router'
import { Box, Stack, Typography } from '@mui/material'
import { ArticleDate } from './article-date'
import { Tag } from './ui-tag'
import { Link } from '../link'
import { useNews } from './context'
import { useCallback, useMemo } from 'react'

//

const Separator = () => <Box component="span" sx={{
  filter: 'opacity(0.75)',
}}>&#8226;</Box>

const ArticleHeading = ({
  publishDate,
  newsOrBlog,
  collaborations,
  organizations,
  people,
  tags,
  projects,
  researchGroups
}) => {
  const router = useRouter()
  const { newFilters, setNewFilters } = useNews()

  // make a flat list of tags from the props, where each tag is an obj:
  // { name, slug, type }
  const postTags = useMemo(() => (
    Object.entries({
      collaborations,
      organizations,
      people,
      tags,
      projects,
      researchGroups
    })
      .filter(([, tag]) => tag.length > 0)
      .reduce((arr, [type, tags]) => {
        arr.push(...tags.map((t) => ({...t, type})))
        return arr;
      }, [])
  ), [
    collaborations,
    organizations,
    people,
    tags,
    projects,
    researchGroups
  ]);

  const handleAddTag = useCallback((tag) => {
    setNewFilters(prev => [...prev, tag])
  }, [setNewFilters]);

  const handleDeleteTag = useCallback((tag) => {
    setNewFilters(prev => prev.filter((compareTag) => (
      compareTag.slug !== tag.slug && compareTag.type !== tag.type
    )))
  }, [setNewFilters]);

  return (
    <Stack
      direction={{      xs: 'column',     sm: 'row' }}
      justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
      alignItems={{     xs: 'flex-start', sm: 'center' }}
      gap={ 1 }
      className="metadata-row"
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={ 1 }
        className="date-and-label"
      >
        <ArticleDate date={ publishDate } />
        
        <Separator />
        
        <Tag
          contents={newsOrBlog}
          uppercase
        />
      </Stack>


      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        gap={ 1 }
        className="tags"
      >
        {
          postTags.slice(0, 3).map(postTag => {
            const isFiltered = newFilters.some(({ slug, type }) => postTag.slug === slug && postTag.type === type);
            
            return <Tag
              key={`${postTag.type}-${postTag.slug}`}
              contents={postTag.name}
              type={postTag.type}
              onClick={
                isFiltered
                  ? undefined
                  : () => handleAddTag(postTag)
              }
              onDelete={
                !isFiltered
                  ? undefined
                  : () => handleDeleteTag(postTag)
              }
            />
          })
        }
      </Stack>
    </Stack>
  )
}

export const ArticlePreview = ({ article }) => {
  return (
    <Box component="pre" sx={{
      '.metadata-row': {
        py: 1,
        '.date-and-label': {},
        '.tags': {},
      },
      '.title': {
        whiteSpace: 'pre-wrap',
      },
      '.excerpt': {
        whiteSpace: 'pre-wrap',
        mx: 0, my: 1,
      },
    }}>
      <ArticleHeading { ...article } />

      <Typography variant="h3" className="title">
        <Link to={ `/news/${ article.slug }` }>{ article.title }</Link>
      </Typography>

      <Typography paragraph className="excerpt">
        {/* { article.excerpt } */}
        Ex cillum commodo dolore proident ut cupidatat dolor sit exercitation ad nisi adipisicing in dolore laboris aliquip dolore adipisicing. Lorem ipsum cupidatat eu tempor esse pariatur ea non reprehenderit deserunt exercitation eiusmod occaecat incididunt dolore
      </Typography>

    </Box>
  )
}
