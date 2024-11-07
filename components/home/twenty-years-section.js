import { Box, Button, Typography } from "@mui/material";
import { SolidSection } from "./solid-section";
import { Link } from "../link";
import { ArrowRight } from "@mui/icons-material";
import { Satellite } from "./satellite";

function Content() {
  return <>
    <Typography
      variant="h1"
      my={2}
      sx={{ textWrap: "balanced", fontWeight: "bold" }}
    >
      20+ years of excellence
    </Typography>
    <Typography sx={{ textWrap: "balanced", my: "2rem" }}>
      Founded in 2004, RENCI has demonstrated experience and driven
      innovation across a variety of projects and domains.
    </Typography>
    <Link href="/about" passHref>
      <Button variant="outlined" endIcon={<ArrowRight />} sx={{ borderRadius: '8px' }}>
        Read our mission statement
      </Button>
    </Link>
  </>
}

export function TwentyYearsSection() {
  return (
    <>
      <Box sx={{
        '@media (min-width: 799px)': {
          display: 'none'
        },
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}>
        <Box sx={{ m: '-64px', transform: 'scale(0.6)' }}>
          <Satellite sizes={{ outerOrbitSize: 600 }} />
        </Box>
        <Content />
      </Box>

      <SolidSection bgColor={"white"} title={<Satellite sizes={{ outerOrbitSize: 700 }} />} sx={{
        '@media (max-width: 800px)': {
          display: 'none'
        }
      }}>
        <Box sx={{ maxWidth: "60%", "@media (max-width: 800px)": {
            maxWidth: "90%"
          }}}>
          <Content />
        </Box>
      </SolidSection>
    </>
  )
}