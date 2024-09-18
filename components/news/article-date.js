import { styled } from "@mui/system";
import { formatDate } from "@/utils/date";

export const DateSpan = styled("span")({
  fontSize: "95%",
  fontWeight: "bold",
  margin: 0,
  lineHeight: 2,
});

export const ArticleDate = ({ date }) => {
  return <DateSpan>{formatDate(date)}</DateSpan>;
};
