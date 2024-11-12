import { Box } from "@mui/material";
import Image from "next/image";

export function SliceSection({
  children,
  contentSide = "left",
  contentBgColor,
  bgImage,
  otherSide,
  clearBackground = false,
  sx,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: contentSide === "left" ? "row" : "row-reverse",
        alignItems: "stretch",
        overflow: "hidden",
        position: 'relative',
        ...sx,
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: clearBackground ? "transparent" : contentBgColor,
          display: "grid",
          placeItems: "center",
        }}
      >
        {children}
      </Box>

      <Box
        sx={{
          flex: "0 0 150px",
          visibility: clearBackground ? 'hidden' : 'visible',
          filter:
            contentSide === "left"
              ? "drop-shadow(10px 0px 5px rgba(0,0,0,0.15))"
              : "drop-shadow(-10px 0px 5px rgba(0,0,0,0.15))",
        }}
      >
        <Box
          sx={{
            backgroundColor: contentBgColor,
            zIndex: 2,
            height: "100%",
            transform: 
              contentSide === "left"
                ? "translateX(-1px)"
                : "translateX(1px)",
            clipPath:
              contentSide === "left"
                ? "polygon(0 0, 100% 0, 0% 100%, 0% 100%)"
                : "polygon(0 0, 100% 0, 100% 100%, 100% 100%)",
          }}
        ></Box>
      </Box>

      <Box sx={{ flex: 1, zIndex: -1 }}>
        {" "}
        {otherSide ? otherSide : (
          <Image
            src={bgImage}
            alt="An abstract background image"
            quality="100"
            layout="fill"
            objectFit="cover"
          />
        )}
      </Box>
    </Box>
  );
}
