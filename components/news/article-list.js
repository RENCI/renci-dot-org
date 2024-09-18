import { useNewsArticles } from "@/lib/strapi/newsSWR";
import { Box, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { ArticlePreview } from "./article-preview";
import { useMemo } from "react";
import { Error } from "./error";

export const ArticleList = ({
  selectedTags,
  isTagSelected,
  deleteTag,
  addTag,
  blogOrFeature,
  page,
  setPage,
}) => {
  const { data, isLoading, error } = useNewsArticles({
    filters: {
      collaborations: selectedTags.collaborations.map(({ slug }) => slug),
      organizations: selectedTags.organizations.map(({ slug }) => slug),
      people: selectedTags.people.map(({ slug }) => slug),
      projects: selectedTags.projects.map(({ slug }) => slug),
      researchGroups: selectedTags.researchGroups.map(({ slug }) => slug),
      postTags: selectedTags.postTags.map(({ name }) => name),
      freeSearch: selectedTags.freeSearch,
      newsOrBlog:
        blogOrFeature === "blog"
          ? "blog"
          : blogOrFeature === "feature"
            ? "news"
            : undefined,
    },
    page,
  });

  const freeSearch = useMemo(() => selectedTags.freeSearch, [selectedTags]);

  if (error) {
    return (
      <Error
        message="We're sorry, something went wrong. Ensure your device has internet access. Refresh or go back a page."
        sx={{ my: 4 }}
      />
    );
  }

  if (isLoading || !data)
    return (
      <Stack>
        <ArticleListSkeleton />
      </Stack>
    );

  const { results: articles, pagination } = data;

  if (Array.isArray(articles) && articles.length === 0)
    return <NoArticlesText />;

  return (
    <Stack>
      <Stack direction="column" gap={4} paddingY={4}>
        {articles.map((article, i) => (
          <ArticlePreview
            key={i}
            article={article}
            isTagSelected={isTagSelected}
            deleteTag={deleteTag}
            addTag={addTag}
            freeSearch={freeSearch}
          />
        ))}
      </Stack>

      <Pagination
        count={pagination?.pageCount}
        page={page}
        onChange={(_, p) => (page === p ? null : setPage(p))}
        sx={{ alignSelf: "center" }}
      />
    </Stack>
  );
};

const NoArticlesText = () => (
  <Stack
    sx={{ minHeight: "300px" }}
    alignItems="center"
    justifyContent="center"
    gap={1}
  >
    <Typography variant="h3" fontWeight="bold">
      No results
    </Typography>
    <Typography variant="subtitle1" maxWidth="35ch" textAlign="center">
      We couldn&apos;t find any articles matching your filters. Please remove
      some and try again.
    </Typography>
  </Stack>
);

export const ArticleListSkeleton = () => (
  <Stack direction="column" gap={4} paddingY={4}>
    {new Array(25).fill(0).map((_, i) => (
      <Box key={i}>
        <Stack gap={1}>
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "8px", maxWidth: "60%" }}
            height="2rem"
          />
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "8px" }}
            height="6rem"
          />
        </Stack>
      </Box>
    ))}
  </Stack>
);
