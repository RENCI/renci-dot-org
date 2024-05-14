import { Page } from "@/components/layout";
import { ArticleList, ArticleListSkeleton } from "@/components/news/article-list";
import { AutocompleteFilter } from "@/components/news/autocomplete";
import { Error } from "@/components/news/error";
import { NewsOrFeatureToggle } from "@/components/news/news-or-feature-toggle";
import { useTags } from "@/lib/strapi/newsSWR";
import { deleteIndexFromArray } from "@/utils/array";
import { Tune } from "@mui/icons-material";
import { Badge, Box, Divider, Drawer, IconButton, Paper, Skeleton, Stack, Typography, styled } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import qs from "qs";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function News() {
  const router = useRouter();
  // have to use the `comma: true` setting to parse if using qs.stringify with the `array: "comma"` config
  const parsedQuery = useMemo(() => qs.parse(router.query, { comma: true }), [router.query]);

  const {
    data: allTags,
    error: allTagsError,
    isLoading: allTagsLoading,
  } = useTags();

  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  /**
   * Takes a single string or array of tag id strings `tags` (mapping to `slug` or `name` in the case of `postTags`),
   * and a `type` string, representing one of the types of tags:
   *   - collaborations
   *   - people
   *   - projects
   *   - organizations
   *   - researchGroups
   *   - postTags
   *
   * The function needs the type as well since the slug isn't guaranteed to be unique against types.
   *
   * This function is primarily used to reconstruct the state from the query params (i.e., retrieve
   * the display string, num of posts, etc)
   */
  const getFullTagsFromIds = useCallback(
    (type, tags) => {
      if (allTagsLoading) return [];
      
      // add this guard since if there's no query string the value will be undefined
      if (tags === undefined) return [];

      // these errors are unlikely to show up in production, they're here to assist during development
      if (!["collaborations", "people", "projects", "organizations", "researchGroups", "postTags"].includes(type))
        throw new Error("Invalid tag lookup type selected");
      if (Array.isArray(tags) && !tags.every((tag) => typeof tag === "string"))
        throw new Error("`tags` is an array and some elements of the array aren't strings" );
      if (!(Array.isArray(tags) || typeof tags === "string"))
        throw new Error(`\`tags\` is type ${typeof tags}`);

      // due to how qs parses arrays with the `arrayFormat: "comma"`, option, if there is only one tag in the url,
      // it will be parsed as just a string (not array and array with 1 element). Next line makes sure it's always an array;
      const normalizedTags = typeof tags === "string" ? [tags] : tags;

      // create a set of all the ids the user wants to get
      const tagIdSet = new Set(normalizedTags);

      // postTags has a different unique identifier than the rest of the types
      const identifier = type === "postTags" ? "name" : "slug";

      // for all the tags in the type, filter to retain only the ones where the identifier key is in the set
      // this by extension exludes strings that don't match with any tag (user inputs gibberish in query params)
      return allTags[type].filter((tagWithFullData) =>
        tagIdSet.has(tagWithFullData[identifier])
      );
    },
    [allTags, allTagsLoading]
  );

  // don't call this state's setter directly! update the query params
  const [selectedTags, _setSelectedTags] = useState({
    collaborations: [],
    people: [],
    projects: [],
    organizations: [],
    researchGroups: [],
    postTags: [],
    freeSearch: [],
  });
  useEffect(() => {
    if (allTagsLoading) return;
    _setSelectedTags({
      collaborations: getFullTagsFromIds("collaborations", parsedQuery.collaborations),
      people: getFullTagsFromIds("people", parsedQuery.people),
      projects: getFullTagsFromIds("projects", parsedQuery.projects),
      organizations: getFullTagsFromIds("organizations", parsedQuery.organizations),
      researchGroups: getFullTagsFromIds("researchGroups", parsedQuery.researchGroups),
      postTags: getFullTagsFromIds("postTags", parsedQuery.postTags),
      // This is horrific, but it makes sure this value is always a string[]
      freeSearch:
        parsedQuery.freeSearch === undefined
          ? []
          : typeof parsedQuery.freeSearch === "string"
          ? [parsedQuery.freeSearch]
          : Array.isArray(parsedQuery.freeSearch) && parsedQuery.freeSearch.every((s) => typeof s === 'string')
          ? parsedQuery.freeSearch
          : [],
    })
  }, [allTags, allTagsLoading, getFullTagsFromIds, parsedQuery]);

  /**
   * helper function for checking if a tag is in selectedTags
   */
  const isTagSelected = useCallback((id, type) => {
    if (id === undefined || type === undefined) return false;
    return selectedTags[type]?.find((tag) => (
      tag[type === 'freeSearch' || type === 'postTags' ? 'name' : 'slug'] === id
      )) !== undefined;
  }, [selectedTags]);

  // same data as above, but as an array of objs with `type` key
  // this format is used by the autocomplete component
  const flatSelectedTags = useMemo(() => (
    Object.entries(selectedTags).reduce((arr, [type, tags]) => {
      if (type === 'freeSearch') return [...arr, ...tags];
      return [...arr, ...tags.map((tag) => ({ ...tag, type }))]
    }, [])
  ), [selectedTags]);

  const setFlatSelectedTags = useCallback((value) => {
    // take the flattened selected tags list and push it to the query param state
    // (obj with type keys and slug string arrays)
    
    // this has to be compatible with the react state setter API to work, so
    // we need to check if the user provided a callback function:

    const next = typeof value === "function" ? value(flatSelectedTags) : value;

    // now we have what the next state should be, take the flattened array version and
    // transform it into the query param state. I'm going to explicitly define this
    // object to hopefully avoid errors:

    const queryParamObj = {
      ...(parsedQuery.blogOrFeature && ({ blogOrFeature: parsedQuery.blogOrFeature })),
      ...(parsedQuery.page && ({ page: parsedQuery.page })),
      ...(next.some((t) => t.type === 'researchGroups') && {
        researchGroups: next.filter((t) => t.type === 'researchGroups').map((t) => t.slug)
      }),
      ...(next.some((t) => t.type === 'collaborations') && {
        collaborations: next.filter((t) => t.type === 'collaborations').map((t) => t.slug)
      }),
      ...(next.some((t) => t.type === 'projects') && {
        projects: next.filter((t) => t.type === 'projects').map((t) => t.slug)
      }),
      ...(next.some((t) => t.type === 'organizations') && {
        organizations: next.filter((t) => t.type === 'organizations').map((t) => t.slug)
      }),
      ...(next.some((t) => t.type === 'people') && {
        people: next.filter((t) => t.type === 'people').map((t) => t.slug)
      }),
      ...(next.some((t) => t.type === 'postTags') && {
        postTags: next.filter((t) => t.type === 'postTags').map((t) => t.name) // name instead of slug
      }),
      ...(next.some((t) => typeof t === 'string') && { // freeSearch items are just strings rather than objs
        freeSearch: next.filter((t) => typeof t === 'string')
      })
    };
    delete queryParamObj["page"];

    router.push(
      {
        pathname: '/news',
        query: qs.stringify(queryParamObj, { arrayFormat: 'comma', encodeValuesOnly: true }),
      },
      undefined,
      { shallow: true, scroll: false }
    );
  }, [parsedQuery, flatSelectedTags, router]);

  /**
   * @param {string} id - the `slug` or `name` (for postTags) field for the tag to be deleted
   * @param {"collaborations" | "people" | "projects" | "organizations" | "researchGroups" | "postTags" | "freeSearch"} type  
   */
  const deleteTag = useCallback((id, type) => {
    const tagIndexToDelete = flatSelectedTags.findIndex((tag) => {
      if (typeof tag === "string" && type === "freeSearch" && id === tag) return true;
      if (type === "postTags" && tag.name === id) return true;
      return tag.slug === id;
    });
    if (tagIndexToDelete === -1) return null;

    setFlatSelectedTags(deleteIndexFromArray(flatSelectedTags, tagIndexToDelete));
  }, [flatSelectedTags, setFlatSelectedTags]);

  /**
   * adds to the filtered tags. If the tag is already present, this is a no-op
   */
  const addTag = useCallback((id, type) => {
    if(allTagsLoading || isTagSelected(id, type)) return;
    if(type === "freeSearch") {
      if(typeof id === string) setFlatSelectedTags((prev) => { prev.push(id); return prev; })
      return;
    }

    if(!(type in allTags)) return;

    // get the full tag object based on the id/type. If it's not a real tag, return
    const fullTag = allTags[type].find((tag) => tag[type === "postTags" ? "name" : "slug"] === id);
    if(fullTag === undefined) return;

    setFlatSelectedTags((prev) => {
      prev.push({
        ...fullTag,
        type,
      });
      return prev;
    })
  }, [allTags, allTagsLoading, isTagSelected, setFlatSelectedTags]);

  // don't call this state's setter directly! update the query params
  const [blogOrFeature, _setBlogOrFeature] = useState(null);
  useEffect(() => {
    _setBlogOrFeature(parsedQuery.blogOrFeature ?? null);
  }, [parsedQuery]);
  const setBlogOrFeature = useCallback((value) => {
    const next = typeof value === "function" ? value(blogOrFeature) : value;
    const queryParamObj = { 
      ...parsedQuery,
      blogOrFeature: next,
    };
    if (next === null) delete queryParamObj["blogOrFeature"];
    delete queryParamObj["page"];
    router.push(
      {
        pathname: '/news',
        query: qs.stringify(queryParamObj, { arrayFormat: 'comma', encodeValuesOnly: true }),
      },
      undefined,
      { shallow: true, scroll: false }
    );
  }, [parsedQuery, blogOrFeature, router])

  // don't call this state's setter directly! update the query params
  const [page, _setPage] = useState(1);
  useEffect(() => {
    let pageNum = Number(parsedQuery.page)
    if (Number.isNaN(pageNum)) pageNum = 1;
    _setPage(pageNum);
  }, [parsedQuery]);
  const setPage = useCallback((value) => {
    const next = typeof value === "function" ? value(page) : value;
    const queryParamObj = { 
      ...parsedQuery,
      page: next,
    };
    router.push(
      {
        pathname: '/news',
        query: qs.stringify(queryParamObj, { arrayFormat: 'comma', encodeValuesOnly: true }),
      },
      undefined,
      { shallow: true, scroll: false }
    );
  }, [parsedQuery, page, router])

  return (
    <Page title="News" description="View and sort through RENCI news articles and blog posts.">
      <Typography>
        Use the search box below to filter the list of articles by tag or category. If there isn’t 
        a pre-existing item, you can type your query and press enter to search through the article 
        titles. Use the “filters” sidebar to verify and refine your search. If you would like to 
        view articles about RENCI from other publications, visit the <Link href="/news/appearances">news appearances page</Link>.
      </Typography>

      {allTagsError ? <Error sx={{ my: 2 }} /> : allTagsLoading ? <TagLoadingSkeleton /> : (
        <AutocompleteFilter
          tags={allTags}
          value={flatSelectedTags}
          setValue={setFlatSelectedTags}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 3, my: 6 }}>
            {/* Filter sidebar */}
            <Paper sx={{ 
              display: { md: 'block', sm: 'none', xs: 'none' },
              p: 1, 
              borderRadius: '8px', 
              flex: '0 0 300px', 
              minWidth: 0, 
              position: 'sticky', 
              top: 'calc(120px + 24px)'
            }} elevation={3}>
              <FilterSelectorContents
                flatSelectedTags={flatSelectedTags}
                blogOrFeature={blogOrFeature}
                setBlogOrFeature={setBlogOrFeature}
              />
            </Paper>

            {/* Search bar and article list */}
            <Box flex={1} minWidth={0}>
              <Stack direction='row' alignItems='flex-start' gap={1}>
                <Paper sx={{ flex: '1', borderRadius: '8px', border: '1px solid #dddddd' }} elevation={2}>
                  <AutocompleteFilter.Input />
                </Paper>
                <IconButton
                  onClick={() => { setMobileModalOpen(prev => !prev) }}
                  aria-label="filters"
                  variant="contained"
                  sx={{ display: { md: 'none', sm: 'flex' } }}
                >
                  <Badge
                    badgeContent={flatSelectedTags.length}
                    invisible={flatSelectedTags.length === 0}
                    color="primary"
                    sx={{ '& .MuiBadge-badge': { border: '2px solid white' } }}
                  >
                    <Tune />
                  </Badge>
                </IconButton>
              </Stack>
              <AutocompleteFilter.TagSelector />
              <ArticleList 
                selectedTags={selectedTags}
                isTagSelected={isTagSelected}
                deleteTag={deleteTag}
                addTag={addTag}
                blogOrFeature={blogOrFeature}
                page={page}
                setPage={setPage}
              />
            </Box>
          </Box>

          {/* Mobile filter modal */}
          <Drawer
            anchor="left"
            open={mobileModalOpen}
            onClose={() => { setMobileModalOpen(false) }}
            sx={{ '& .MuiDrawer-paper': { width: '80%' } }}
          >
            <Box p={1}>
              <FilterSelectorContents
                flatSelectedTags={flatSelectedTags}
                blogOrFeature={blogOrFeature}
                setBlogOrFeature={setBlogOrFeature}
              />
            </Box>
          </Drawer>
        </AutocompleteFilter>
      )}
    </Page>
  );
}

const FilterSelectorContents = ({
  flatSelectedTags,
  setBlogOrFeature,
  blogOrFeature,
}) => (
  <>
    <Stack direction='row' p={1} alignItems='baseline' justifyContent='space-between'>
      <Typography variant="h3"  maxWidth='fit-content'>Filters</Typography>
      {flatSelectedTags.length > 0 && <AutocompleteFilter.ClearAllButton />}
    </Stack>

    <Divider sx={{ mx: '-8px' }} />
    
    <Box mt={1} mb='4px'>
      <TypeHeading px={1} pb='4px'>Category</TypeHeading>
      <NewsOrFeatureToggle 
        setBlogOrFeature={setBlogOrFeature}
        blogOrFeature={blogOrFeature}
      />
    </Box>

    <AutocompleteFilter.FilterList />
  </>
)

const TagLoadingSkeleton = () => (
  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 3, my: 6 }}>
  {/* Filter sidebar */}
    <Skeleton variant="rectangular" height="124px" sx={{
      borderRadius: '8px',
      flex: "0 0 300px",
      minWidth: 0,
      position: 'sticky',
      top: 'calc(120px + 24px)',
      display: { md: 'block', sm: 'none', xs: 'none' },
    }} />

    {/* Search bar and article list */}
    <Box flex={1} minWidth={0}>
      {/* Search Bar */}
      <Skeleton variant="rectangular" height="2.5rem" sx={{ borderRadius: '8px' }} />

      <ArticleListSkeleton />
    </Box>
  </Box>
)

const TypeHeading = styled(Typography)`
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
`;

// there is no data needed for this page, but this is a workaround to prevent getInitialProps from
// running on this client page
export const getStaticProps = () => {
  return { props: { dummyValue: 1 }}
}