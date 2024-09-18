import { dateToSlug } from "@/utils/slug";
import { Page } from "../layout";
import { Link } from "../link";
import { Typography } from "@mui/material";

const MONTHS = [
  undefined,
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];
const DAYS = [
  undefined,
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "15th",
  "16th",
  "17th",
  "18th",
  "19th",
  "20th",
  "21st",
  "22nd",
  "23rd",
  "24th",
  "25th",
  "26th",
  "27th",
  "28th",
  "29th",
  "30th",
  "31st",
];

export const TimeGrouping = ({ year, month, day, posts }) => {
  const title = `Articles during ${
    month !== undefined ? `${MONTHS[Number(month)]} ` : ""
  }${day !== undefined ? `${DAYS[Number(day)]}, ` : ""}${year}`;

  return (
    <Page title={title}>
      <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
        <Link to="/news">← Back to news</Link>
      </Typography>
      {posts.length === 0 ? (
        "No articles for this period."
      ) : (
        <ul>
          {posts.map(({ title, publishDate, slug }, i) => {
            const d = new Date(publishDate);
            return (
              <li key={i}>
                <Link to={`/news/${dateToSlug(d)}/${slug}`}>
                  {`${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`}
                  {" - "}
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Page>
  );
};
