import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Stack,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Chip,
  Typography,
  CardActionArea,
  ButtonBase,
  useMediaQuery,
} from "@mui/material";
import { Link } from "../link";
import { Pre } from "../pre";
import { useTheme } from "@mui/material/styles";
import { Markdown } from "../markdown";
import { Pattern } from "./project-image";
import { ProjectActivityChip } from "./project-activity-chip";

export const ProjectCard = ({ project }) => {
  const theme = useTheme();

  const styles = {
    project: {
      margin: "1rem 0",
    },
    cardMedia: {
      width: useMediaQuery(theme.breakpoints.down("md")) ? "100%" : "250px",
      backgroundSize: "contain",
      backgroundPosition: "center",
    },
    description: {
      textAlign: "left",
      flexBasis: useMediaQuery(theme.breakpoints.down("md")) ? null : "840px",
    },
  };

  return (
    <Card sx={styles.project} key={project.slug}>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        {project.featuredImage.length > 0 ? (
          <CardMedia
            component={"img"}
            src={project.featuredImage[0].url}
            sx={styles.cardMedia}
          />
        ) : (
          <Pattern />
        )}
        <CardContent sx={styles.description}>
          <Stack
            direction="row-reverse"
            justifyContent="space-between"
            sx={{ marginBottom: "0.25rem" }}
          >
            <ProjectActivityChip active={project.isActive} />
            {project.researchGroups.length > 0 ? (
              <Link
                to={`/groups/${project.researchGroups[0].slug}`}
                style={{
                  textDecoration: "none",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography variant="caption" sx={{}}>
                  {project.researchGroups[0].name}
                </Typography>
              </Link>
            ) : project.collaborations.length > 0 ? (
              <Link
                to={`/collaborations/${project.collaborations[0].slug}`}
                style={{
                  textDecoration: "none",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography variant="caption" sx={{}}>
                  {project.collaborations[0].name}
                </Typography>
              </Link>
            ) : null}
          </Stack>

          <Link
            to={`/projects/${project.slug}`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              variant="h4"
              sx={{ marginBottom: "1rem", fontWeight: "500" }}
            >
              {project.webName}
            </Typography>
          </Link>

          <Markdown>{project.webDescription}</Markdown>
        </CardContent>
      </Stack>
    </Card>
  );
};
