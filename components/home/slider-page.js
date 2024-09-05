import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Link } from "../link";
import BB from "./bb.png";
import { ArrowRight } from "@mui/icons-material";

/**
 * 
 * @param {{
 *  items: {
 *    key: string,
 *    title: string,
 *    description: string,
 *    link: string,
 *    image?: string,
 *  }[]
 * }} 
 * @returns 
 */
export default function SliderPage({ items, bgColor, color, title, subtitle }) {
  const [emblaRef] = useEmblaCarousel();
  
  return (
    <Box
      sx={{
        height: "60dvh",
        background: bgColor,
        color,
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "60%" }}>
        <Typography variant="h1" sx={{ fontWeight: "bold " }}>
          {title}
        </Typography>
        <Typography>
          <Link href="/">{subtitle}</Link>
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }} ref={emblaRef}>
        <Box sx={{ display: "flex" }}>
            {items.map(({ title, description, link, image, key }) => (
              <Slide key={key} title={title} description={description} link={link} image={image} />
            ))}
        </Box>
      </Box>
    </Box>
  );
}

function Slide({ title, description, link, image }) {
  return (
    <Box sx={{
      flex: "0 0 33%",
      minWidth: "0px",
      maxWidth: "100%",
      "--background": "#ffffff",
      background: "var(--background)",
      border: "1px solid #e8e8e8",
      borderRadius: "8px",
      color: "#484848",
      boxShadow: "0px 5px 16px 0px #00000029",
      display: "flex",
      userSelect: "none",
      maxHeight: 400,
      mx: 16,
      my: 2,
      p: 2,
      gap: 2
    }}
    >
      {image !== undefined &&
        <Box sx={{ alignSelf: "stretch", flex: "1", position: "relative", borderRadius: "4px", border: "1px solid #e8e8e8", overflow: "hidden" }}>
          {/* <Image src={BB} alt="" layout="fill" objectFit="cover" /> */}
          <img src={image} alt="" style={{ objectFit: 'cover', maxHeight: '100%' }} />
        </Box>
      }
      <Box sx={{ flex: "2", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <Box flex="1" minHeight={0} overflow="hidden" sx={{ position: "relative", "&::after": {
          content: '""',
          position: "absolute",
          background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100px",
        }}}>
          <Typography variant="h2" color="black" fontWeight="500" fontSize="1.5rem">{title}</Typography>
          <Typography>
            {description}
          </Typography>
        </Box>
        <Box alignSelf="flex-end">
          <Button component={Link} to={link} endIcon={<ArrowRight />}>
            Read More
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
