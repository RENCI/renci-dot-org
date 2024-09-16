import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import { Box, Button, Typography } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import { useCallback } from "react";
import { DotButton, useDotButton } from "./carousel-dot-buttons";

export function FlexSpaceCarousel({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({}, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  return <Box sx={{ maxWidth: '100%' }}>
    <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
      <Box sx={{ display: "flex" }}>
        {slides.map((slide, i) => (
          <Slide title={slide.title} content={slide.content} tag={slide.tag} key={i} />
        ))}
      </Box>
    </Box>

    <Box sx={{ display: "flex", gap: '16px', justifyContent: 'flex-end', alignItems: 'center', mt: 4 }}>
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          onClick={() => onDotButtonClick(index)}
          isSelected={index === selectedIndex}
        />
      ))}
    </Box>
  </Box>
}

function Slide({ title, content, tag }) {
  return (
    <Box sx={{ flex: '0 0 100%', minWidth: 0, padding: 1 }}>
      <Typography
        sx={{
          textTransform: 'uppercase',
          display: 'inline-block',
          mb: '1rem',
          fontSize: '0.9rem',
          fontWeight: '500',
          letterSpacing: '1px',
          position: 'relative',
          '&::after': {
            content: '""',
            backgroundColor: 'white',
            position: 'absolute',
            bottom: -5,
            left: 0,
            right: 0,
            height: 2,
          }
        }}
      >
        {tag}
      </Typography>
      <Typography
        variant="h1"
        my={2}
        sx={{ textWrap: "balanced", fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <Typography sx={{ textWrap: "balanced" }} my={4}>
        {content}
      </Typography>
      <Button
        variant="contained"
        endIcon={<ArrowRight />}
        sx={{
          alignSelf: "flex-end",
          background: "rgb(255, 68, 202)",
          borderRadius: "8px",
        }}
      >
        Learn more
      </Button>
    </Box>
  );
}
