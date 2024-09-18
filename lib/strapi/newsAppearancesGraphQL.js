import { fetchStrapiGraphQL } from "./";

export const fetchAllNewsAppearances = async (preview = false) => {
  const { data } = await fetchStrapiGraphQL(
    `query {
    newsAppearances (sort: "date:desc", pagination: { limit: 1000 }) {
      data {
        id
        attributes {
          title
          date
          articles {
            ... on ComponentNewsArticlesNewsArticle {
              title
              url
              date
            }
          }
        }
      }
    }
  }`,
    preview,
  );

  return data.newsAppearances.data;
};
