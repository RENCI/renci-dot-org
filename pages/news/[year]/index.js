import { TimeGrouping } from "@/components/news/time-grouping";
import { fetchStrapiGraphQL } from "@/lib/strapi";
import { isValidDate } from "@/utils/date";

export default function YearCatalog({ year, posts }) {
  return <TimeGrouping year={year} posts={posts} />;
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

  const yearSet = new Set(
    postsGql.data.posts.data.map(({ attributes: { publishDate } }) =>
      new Date(publishDate).getUTCFullYear().toString(),
    ),
  );

  const paths = Array.from(yearSet).map((year) => ({ params: { year } }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const firstDayOfYear = new Date(params.year, 0, 1);
  const lastDayOfYear = new Date(params.year, 11, 31);

  if (!isValidDate(firstDayOfYear) || !isValidDate(lastDayOfYear))
    return {
      notFound: true,
    };

  const firstDayOfYearStr = firstDayOfYear.toISOString().split("T")[0];
  const lastDayOfYearStr = lastDayOfYear.toISOString().split("T")[0];

  const postsGql = await fetchStrapiGraphQL(`
    query {
      posts(
        sort: "publishDate:desc"
        filters: { publishDate: { between: ["${firstDayOfYearStr}", "${lastDayOfYearStr}"] } }
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
      posts,
    },
  };
}
