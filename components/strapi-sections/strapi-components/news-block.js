import { GenericArticlePreview } from "@/components/news/article-preview";
import { Section } from "../../layout";
import { Stack } from "@mui/material";

export const NewsBlock = ({ data }) => {
  return (
    <Section title={data.title}>
      <Stack direction="column" gap={2}>
        {data.posts.data.map(({ attributes: post, id }) => (
          <GenericArticlePreview article={post} key={id} />
        ))}
      </Stack>
    </Section>
  );
};
