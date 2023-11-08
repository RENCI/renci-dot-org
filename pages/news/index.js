import { Page } from "@/components/layout";
import { ArticleList, ArticleListSkeleton } from "@/components/news/article-list";
import { AutocompleteFilter } from "@/components/news/autocomplete";
import { NewsOrFeatureToggle } from "@/components/news/news-or-feature-toggle";
import { fetchTags } from "@/lib/strapi/newsGraphQL";
import { Box, Divider, Paper, Skeleton, Stack, Typography, styled } from "@mui/material";
import Link from "next/link";
import { CloseRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import qs from "qs";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function News() {
  const router = useRouter();
  // have to use the `comma: true` setting to parse if using qs.stringify with the `array: "comma"` config
  const parsedQuery = useMemo(() => qs.parse(router.query, { comma: true }), [router.query]);

  const [allTags, setAllTags] = useState(null);
  useEffect(() => {
    (async () => {
      const tags = await fetchTags();
      setAllTags(tags);
    })();
  }, []);

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
      if (allTags === null) return [];
      
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
    [allTags]
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
    if (allTags === null) return;
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
  }, [allTags, getFullTagsFromIds, parsedQuery])

  // same data as above, but as an array of objs with `type` key
  // this format is used by the autocomplete component
  const flatSelectedTags = useMemo(() => (
    Object.entries(selectedTags).reduce((arr, [type, tags]) => {
      if (type === 'freeSearch') return [...arr, ...tags];
      return [...arr, ...tags.map((tag) => ({ ...tag, type }))]
    }, [])
  ), [selectedTags]);

  const setSelectedTags = useCallback((value) => {
    // take the flattened selected tags list and push it to the query param state
    // (obj with type keys and slug string arrays)
    
    // this has to be compatible with the react state setter API to work, so
    // we need to check if the user provided a callback function:

    const next = typeof value === "function" ? value(flatSelectedTags) : value;

    // now we have what the next state should be, take the flattened array version and
    // transform it into the query param state. I'm going to explicitly define this
    // object to hopefully avoid errors:

    const queryParamObj = {
      ...(parsedQuery.newsOrFeature && ({ newsOrFeature: parsedQuery.newsOrFeature })),
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

    router.push(
      {
        pathname: '/news',
        query: qs.stringify(queryParamObj, { arrayFormat: 'comma', encodeValuesOnly: true }),
      },
      undefined,
      { shallow: true, scroll: false }
    );
  }, [parsedQuery, flatSelectedTags, router]);

  // don't call this state's setter directly! update the query params
  const [newsOrFeature, _setNewsOrFeature] = useState(null);
  useEffect(() => {
    _setNewsOrFeature(parsedQuery.newsOrFeature ?? null);
  }, [parsedQuery]);
  const setNewsOrFeature = useCallback((value) => {
    const next = typeof value === "function" ? value(newsOrFeature) : value;
    const queryParamObj = { 
      ...parsedQuery,
      newsOrFeature: next,
    };
    if (next === null) delete queryParamObj["newsOrFeature"];
    router.push(
      {
        pathname: '/news',
        query: qs.stringify(queryParamObj, { arrayFormat: 'comma', encodeValuesOnly: true }),
      },
      undefined,
      { shallow: true, scroll: false }
    );
  }, [parsedQuery, newsOrFeature, router])

  // don't call this state's setter directly! update the query params
  const [page, _setPage] = useState(1);
  useEffect(() => {
    _setPage(parsedQuery.page ?? 1);
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

  // Loading skeleton for tag fetch
  if (allTags === null)
    return (
      <Page title="News" description="View and sort through RENCI news articles and blog posts.">
        <Typography>
          Use the search box below to filter the list of articles by tag or category. If there isn’t 
          a pre-existing item, you can type your query and press enter to search through the article 
          titles. Use the “filters” sidebar to verify and refine your search. If you would like to 
          view articles about RENCI from other publications, visit the <Link href="/news/appearances">news appearances page</Link>.
        </Typography>

        <Stack spacing={3} my={6} alignItems='flex-start' direction='row'>
          {/* Filter sidebar */}
          <Skeleton variant="rectangular" height="124px" sx={{ borderRadius: '8px', flex: "0 0 300px", minWidth: 0, position: 'sticky', top: 'calc(120px + 24px)' }} />

          {/* Search bar and article list */}
          <Box flex={1} minWidth={0}>
            {/* Search Bar */}
            <Skeleton variant="rectangular" height="2.5rem" sx={{ borderRadius: '8px' }} />

            <ArticleListSkeleton />
          </Box>
        </Stack>
      </Page>
    );

  return (
    <Page title="News" description="View and sort through RENCI news articles and blog posts.">
      <Typography>
        Use the search box below to filter the list of articles by tag or category. If there isn’t 
        a pre-existing item, you can type your query and press enter to search through the article 
        titles. Use the “filters” sidebar to verify and refine your search. If you would like to 
        view articles about RENCI from other publications, visit the <Link href="/news/appearances">news appearances page</Link>.
      </Typography>
      <AutocompleteFilter
        tags={allTags}
        value={flatSelectedTags}
        setValue={setSelectedTags}
      >
        <Stack spacing={3} my={6} alignItems='flex-start' direction='row'>
          {/* Filter sidebar */}
          <Paper sx={{ 
            p: 1, 
            borderRadius: '8px', 
            flex: '0 0 300px', 
            minWidth: 0, 
            position: 'sticky', 
            top: 'calc(120px + 24px)'
          }} elevation={3}>
            <Stack direction='row' p={1} alignItems='baseline' justifyContent='space-between'>
              <Typography variant="h3"  maxWidth='fit-content'>Filters</Typography>
              <AutocompleteFilter.ClearAllButton />
            </Stack>
            <Divider sx={{ mx: '-8px' }} />
            <Box mt={1} mb='4px'>
              <TypeHeading px={1} pb='4px'>Category</TypeHeading>
              <NewsOrFeatureToggle 
                setNewsOrFeature={setNewsOrFeature}
                newsOrFeature={newsOrFeature}
              />
            </Box>
            <AutocompleteFilter.FilterList />
          </Paper>

          {/* Search bar and article list */}
          <Box flex={1} minWidth={0}>
            <Paper sx={{ borderRadius: '8px', border: '1px solid #dddddd' }} elevation={2}>
              <AutocompleteFilter.Input />
            </Paper>
            <AutocompleteFilter.TagSelector />
            <ArticleList 
              selectedTags={selectedTags}
              newsOrFeature={newsOrFeature}
            />
          </Box>
        </Stack>
      </AutocompleteFilter>
    </Page>
  );
}

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