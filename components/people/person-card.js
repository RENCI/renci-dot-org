import React from "react";
import PropTypes from "prop-types";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "../link";
import { useTheme } from "@emotion/react";

export const PersonCard = ({ person, showTitle = false, anchorName }) => {
  const theme = useTheme();

  const onMediaFallback = event => event.target.src = "/static/images/generic-avatar.svg" ;

  return (
    <Card
      elevation={0}
      name={anchorName}
      sx={{
        "& a": { textDecoration: "none" },
      }}
    >
      <Link to={`/people/${person.slug}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "row",
              alignItems: "center",
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              aspectRatio: "1 / 1",
              borderRadius: "50%",

              [theme.breakpoints.down("sm")]: {
                width: 100,
              },
            }}            
            src={ person.photo }
            onError={onMediaFallback}
            alt={`${person.firstName} ${person.lastName} photo`}
            image={person.photo}
          />
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Typography mb={0.5} sx={{ textDecoration: "underline" }}>
              {person.fullName || person.displayName}
            </Typography>

            {showTitle && (person.title || person.lead) && (
              <Typography variant="caption" sx={{ lineHeight: 1.4 }}>
                {person.title || "Lead"}
              </Typography>
            )}
          </CardContent>
        </Box>
      </Link>
    </Card>
  );
};

PersonCard.propTypes = {
  anchorName: PropTypes.string,
  showTitle: PropTypes.bool.isRequired,
  person: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string,
  }),
};
