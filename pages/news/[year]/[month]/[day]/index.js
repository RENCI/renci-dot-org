import { TimeGrouping } from "@/components/news/time-grouping";
import { fetchStrapiGraphQL } from "@/lib/strapi";
import { isValidDate } from "@/utils/date";

export default function MonthCatalog({ year, month, day, posts }) {
  return <TimeGrouping
    year={year}
    month={month}
    day={day}
    posts={posts}
  />
}

export async function getStaticPaths() {
  const postsGql = await fetchStrapiGraphQL(`query {
    posts(pagination: { limit: 1000 }, sort: "publishDate:desc") {
      data {
        attributes {
          publishDate
        }
      }
    }
  }`);

  // we need to create a list of paths for each year/month/day group. In order to avoid duplicates,
  // here we create a Set of JSON.stringify({ year, month, day }), which can then be cast to an array and parsed
  const yearSet = new Set(postsGql.data.posts.data.map(({  attributes: { publishDate } }) => {
    const date = new Date(publishDate);
    
    return JSON.stringify({
      year: date.getUTCFullYear().toString(),
      month: (date.getUTCMonth() + 1).toString(),
      day: date.getUTCDate().toString(),
    })
  }));

  const paths = Array.from(yearSet).map((date) => ({ params: JSON.parse(date) }));

  return {
    paths,
    fallback: 'blocking', 
  };
}

export async function getStaticProps({ params }) {
  
  const date = new Date(params.year, params.month - 1, params.day);

  if (!isValidDate(date)) return {
    notFound: true,
  }

  const dateStr = date.toISOString().split('T')[0];
  
  const postsGql = await fetchStrapiGraphQL(`
    query {
      posts(
        sort: "publishDate:desc"
        filters: { publishDate: { eq: "${dateStr}" } }
        pagination: { limit: 1000 }
      ) {
        data {
          attributes {
            title
            publishDate
            slug
          }
        }
      }
    }
  `);

  const posts = postsGql.data.posts.data.map(({ attributes }) => attributes);

  return {
    props: {
      year: params.year,
      month: params.month,
      day: params.day,
      posts
    }
  }
}
