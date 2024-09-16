import { Typography } from "@mui/material";
import { Page } from "@/components/layout";

export default function Partnerships() {
  return (
    <Page title="Partnerships">
      <Typography paragraph>
        ...
      </Typography>
    </Page>
  );
}

export const getStaticProps = () => {
  return { props: { dummyValue: 1 } };
};
