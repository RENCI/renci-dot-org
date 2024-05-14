import { getStrapiURL } from '@/utils/api';
import useSWR from 'swr';

export const useTags = () => {
  const fetcher = (url) => fetch(url, { 
    headers: {
      'Accept': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      return res.json();
    })
    .then((data) => { 
      if (data.error) throw new Error(`Strapi Error: ${data.error?.message ?? "Unknown error while fetching post tags"}`);
      return data;
    });

  // dedupingInterval essentially sets cache expiration time to 1 hour
  return useSWR(getStrapiURL("/api/all-post-tags"), fetcher, { dedupingInterval: 1000 * 60 * 60 });
}

/**
 * SWR-enabled hook for fetch news article data
 *   @param {{
 *   filters: {
 *       researchGroups: string[],
 *       collaborations: string[],
 *       projects: string[],
 *       organizations: string[],
 *       people: string[],
 *       postTags: string[],
 *       freeSearch: string[],
 *       newsOrBlog: "news" | "blog" | undefined,
 *     },
 *     page?: number,
 *     excerptLength?: number,
 *   }}
 */
export const useNewsArticles = ({
  filters: {
    researchGroups,
    collaborations,
    projects,
    organizations,
    people,
    postTags,
    freeSearch,
    newsOrBlog,
  },
  page = 1,
  excerptLength = 450,
}) => {
  if ([researchGroups, collaborations, projects, organizations, people, freeSearch, postTags].some((t) => !Array.isArray(t))) {
    throw new Error("One of the filters is not an array")
  }

  const reqBody = {
    filters: {
      researchGroups,
      collaborations,
      projects,
      organizations,
      people,
      tags: postTags,
      freeSearch,
      ...(Boolean(newsOrBlog) && ({ newsOrBlog })),
    },
    pagination: {
      pageSize: 25,
      page,
    },
    excerptLength,
  }

  const articlesUrl = getStrapiURL("/api/post-list");
  
  const cacheKey = JSON.stringify({articlesUrl, reqBody});

  const fetcher = (cacheKey) => {
    const { articlesUrl, reqBody } = JSON.parse(cacheKey);
    
    return fetch(articlesUrl, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((data) => { 
        if (data.error) throw new Error(`Strapi Error: ${data.error?.message ?? "Unknown error while fetching articles"}`);
        return data;
      })
  }

  // dedupingInterval essentially sets cache expiration time to 1 hour
  return useSWR(cacheKey, fetcher, { dedupingInterval: 1000 * 60 * 60 });
}