import { Box } from "@mui/material";

export function SolidSection({
  title,
  children,
  contentSide = "left",
  bgColor,
  sx,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        backgroundColor: bgColor,
        flexDirection: contentSide === "left" ? "row" : "row-reverse",
        '@media (max-width: 1000px)': {
          flexDirection: contentSide === "left" ? "column" : "column-reverse",
        },
        '@media (max-width: 800px)': {
          minHeight: 'auto',
          py: 4,
        },
        gap: 4,
        alignItems: "stretch",
        overflow: "hidden",
        ...sx,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "grid",
          placeItems: "center",
        }}
      >
        {title}
      </Box>

      <Box sx={{ flex: 1, display: "grid", placeItems: "center" }}>
        {children}
      </Box>
    </Box>
  );
}
