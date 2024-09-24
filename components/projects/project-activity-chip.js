import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Chip } from "@mui/material";

const ACTIVE_LABEL = "ACTIVE";
const INACTIVE_LABEL = "INACTIVE";

export const ProjectActivityChip = ({ active }) => {
  if (active) {
    return (
      <Chip
        label={ ACTIVE_LABEL }
        size="small"
        sx={{
          background: "linear-gradient(135deg, #238b8b, #00778f)",
          color: "white",
          fontWeight: 500,
        }}
      />
    )
  }
  return <Chip label={ INACTIVE_LABEL } size="small" />
};
