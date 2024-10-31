import { Box } from "@mui/material";
import { SliceSection } from "../slice-section";
import { FlexSpaceCarousel } from "./flex-space-carousel";

import eventsDefault from "./images/events.png";
import newsDefault from "./images/news.png";
import projectsDefault from "./images/projects.png";
import { useMemo, useState } from "react";

export function FlexSpaceSection({ slides }) {
  const [currentTag, setCurrentTag] = useState(slides?.[0].tag ?? "News");

  const image = useMemo(() => ({
    "News": newsDefault,
    "Blog": eventsDefault,
    "Projects": projectsDefault,
  }[currentTag]), [currentTag]);
  
  return (
    <SliceSection
      contentSide="right"
      contentBgColor={"rgb(30 55 91)"}
      bgImage={image}
      sx={{ color: "white" }}
    >
      <Box
        sx={{
          maxWidth: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          "@media (max-width: 800px)": {
            maxWidth: "90%"
          }
        }}
      >
        <FlexSpaceCarousel
          onCurrentSlideIndexChange={(i) => { setCurrentTag(slides?.[i]?.tag ?? "News") }}
          slides={slides}
        />
      </Box>
    </SliceSection>
  )
}