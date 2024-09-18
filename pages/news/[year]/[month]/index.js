import { TimeGrouping } from "@/components/news/time-grouping";
import { fetchStrapiGraphQL } from "@/lib/strapi";
import { isValidDate } from "@/utils/date";

export default function MonthCatalog({ year, month, posts }) {
  return <TimeGrouping year={year} month={month} posts={posts} />;
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

  // we need to create a list of paths for each year/month pair. In order to avoid duplicates,
  // here we create a Set of JSON.stringify({ year, month }), which can then be cast to an array and parsed
  const yearSet = new Set(
    postsGql.data.posts.data.map(({ attributes: { publishDate } }) => {
      const date = new Date(publishDate);

      return JSON.stringify({
        year: date.getUTCFullYear().toString(),
        month: (date.getUTCMonth() + 1).toString(),
      });
    }),
  );

  const paths = Array.from(yearSet).map((yearAndMonth) => ({
    params: JSON.parse(yearAndMonth),
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const firstDayOfMonth = new Date(params.year, params.month - 1, 1);
  const lastDayOfMonth = new Date(params.year, params.month - 1 + 1, 0); // 0th day of the next month, i.e. last day of this month

  if (!isValidDate(firstDayOfMonth) || !isValidDate(lastDayOfMonth))
    return {
      notFound: true,
    };

  const firstDayOfMonthStr = firstDayOfMonth.toISOString().split("T")[0];
  const lastDayOfMonthStr = lastDayOfMonth.toISOString().split("T")[0];

  const postsGql = await fetchStrapiGraphQL(`
    query {
      posts(
        sort: "publishDate:desc"
        filters: { publishDate: { between: ["${firstDayOfMonthStr}", "${lastDayOfMonthStr}"] } }
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
      posts,
    },
  };
}
