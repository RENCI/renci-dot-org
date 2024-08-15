import { Box } from "@mui/material";
import Image from "next/image";

export function SliceSection({
  children,
  contentSide = "left",
  contentBgColor,
  bgImage,
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
        ...sx,
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: contentBgColor,
          display: "grid",
          placeItems: "center",
        }}
      >
        {children}
      </Box>

      <Box
        sx={{
          flex: "0 0 150px",
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
            clipPath:
              contentSide === "left"
                ? "polygon(0 0, 100% 0, 0% 100%, 0% 100%)"
                : "polygon(0 0, 100% 0, 100% 100%, 100% 100%)",
          }}
        ></Box>
      </Box>

      <Box sx={{ flex: 1, zIndex: -1 }}>
        {" "}
        <Image
          src={bgImage}
          alt="An abstract background image"
          quality="100"
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </Box>
  );
}
