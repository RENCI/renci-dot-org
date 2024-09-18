import React from "react";
import PropTypes from "prop-types";
import { Box, useTheme } from "@mui/material";

export const PersonGrid = ({ children, size = "medium" }) => {
  const theme = useTheme();

  let minWidth;
  switch (size) {
    case "small":
      minWidth = 150;
      break;
    case "medium":
    default:
      minWidth = 175;
      break;
    case "large":
      minWidth = 250;
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,

        [theme.breakpoints.down("sm")]: {
          gridTemplateColumns: "1fr",
        },
      }}
    >
      {children}
    </Box>
  );
};

PersonGrid.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
