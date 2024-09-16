import { Typography } from "@mui/material";
import { Page } from "../../components";

export default function Careers() {
  return (
    <Page title="Careers">
      <Typography paragraph>
        RENCI’s inclusive, creative ethos transcends disciplinary boundaries to
        catalyze data-driven discovery and innovation for the public good. A
        career at RENCI offers a stimulating, collaborative environment where
        you can unleash your intellectual potential to advance technology and
        accelerate research.
      </Typography>

      <Typography paragraph>
        We value new ideas, innovative solutions, and collaboration, and our
        employees enrich our organizational culture with their unique skills and
        perspectives. We are always looking for new talent to further expand the
        range of skill sets, backgrounds, and perspectives at RENCI.
      </Typography>

      <Typography paragraph>
        See below for our current open positions to see if RENCI could be the
        right fit for you.
      </Typography>

      <Typography paragraph>[insert open positions]</Typography>
    </Page>
  );
}

// there is no data needed for this page, but this is a workaround to prevent getInitialProps from
// running on this client page
export const getStaticProps = () => {
  return { props: { dummyValue: 1 } };
};
