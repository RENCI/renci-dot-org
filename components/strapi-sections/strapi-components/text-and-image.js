import { Markdown } from "../../markdown";
import { TextImageSection } from "../../layout";

export const TextAndImage = ({ data }) => {
  return (
    <TextImageSection
      imageUrl={data.Image.data.attributes.url}
      imageWidth={data.Image.data.attributes.width}
      imageHeight={data.Image.data.attributes.height}
    >
      <Markdown linkTarget="_blank">{data.Text}</Markdown>
    </TextImageSection>
  );
};
