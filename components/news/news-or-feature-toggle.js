import { Button, ButtonGroup } from "@mui/material";

export const NewsOrFeatureToggle = ({ blogOrFeature, setBlogOrFeature }) => (
  <ButtonGroup
    size="small"
    sx={{
      display: "flex",
      "--br": "4px",
      px: "8px",
      "& .MuiButton-root": {
        flex: 1,
        "&:first-of-type": { borderRadius: "var(--br) 0 0 var(--br)" },
        "&:last-of-type": { borderRadius: "0 var(--br) var(--br) 0" },
      },
    }}
  >
    <Button
      onClick={() => {
        setBlogOrFeature(null);
      }}
      variant={blogOrFeature === null ? "contained" : "outlined"}
    >
      All
    </Button>
    <Button
      onClick={() => {
        setBlogOrFeature("blog");
      }}
      variant={blogOrFeature === "blog" ? "contained" : "outlined"}
    >
      Blog
    </Button>
    <Button
      onClick={() => {
        setBlogOrFeature("feature");
      }}
      variant={blogOrFeature === "feature" ? "contained" : "outlined"}
    >
      Feature
    </Button>
  </ButtonGroup>
);
