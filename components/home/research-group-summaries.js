import { Box, Typography } from "@mui/material";
import Link from "next/link";

export function ResearchGroupSummaries({ groups }) {
  return (
    <Box>
      {groups.map(({ name, summary, link }) => (
        <Box
          key={name}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            py: "3rem",
            "&:not(:last-of-type)": {
              borderBottom: "2px solid white"
            }
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {name}
          </Typography>
          <Typography>
            {summary}{" "}
            <Link href={link}>Learn more.</Link>
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
