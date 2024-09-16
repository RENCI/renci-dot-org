import { Section } from "../../layout";
import { Markdown } from "../../markdown";

export const TitleAndBody = ({ data }) => {
  return data.sectionContent.map((section) => (
    <Section title={section.leftTitle} key={section.id + section.leftTitle}>
      <Markdown>{section.rightBody}</Markdown>
    </Section>
  ));
};
