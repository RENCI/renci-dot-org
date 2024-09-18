import { Box, Stack } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";

export const TextImageSection = ({
  imageUrl,
  imageHeight,
  imageWidth,
  imageAlt,
  children,
  imageAspectRatio,
  rounded,
}) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    spacing={{ xs: 2, sm: 6 }}
    sx={{
      marginY: "3rem",
    }}
  >
    {imageUrl && (
      <Box
        sx={{
          flex: {
            xs: "0 0",
            sm: `0 0 ${255 / 16}rem`,
          },
        }}
      >
        <Box
          sx={{
            aspectRatio: imageAspectRatio,
            ...(rounded && { borderRadius: "50%", overflow: "hidden" }),
          }}
        >
          <Image
            priority
            src={imageUrl}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
      </Box>
    )}
    <Box sx={{ flex: "1" }}>{children}</Box>
  </Stack>
);

TextImageSection.propTypes = {
  imageUrl: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  imageAlt: PropTypes.string,
  imageAspectRatio: PropTypes.string,
  rounded: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
