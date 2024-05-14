import PropTypes from "prop-types";
import { Chip } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

const TYPES = {
  researchGroups: {
    bgColor: "#bbffde",
    color: "#2d4339",
  },
  collaborations: {
    bgColor: "#ffebb1",
    color: "#473f28",
  },
  projects: {
    bgColor: "#d9c8ff",
    color: "#352f44",
  },
  organizations: {
    bgColor: "#bcf2ff",
    color: "#2c3e43",
  },
  people: {
    bgColor: "#ffd1e6",
    color: "#523c46",
  },
  default: {
    bgColor: "#ededed",
    color: "#474747",
  },
};

/**
 * @param {{
 *   type?: keyof TYPES,
 *   contents: ReactNode,
 *   inverted?: boolean,
 *   uppercase?: boolean
 *   ...props?: any
 * }} props
 */
export const Tag = ({
  type = "default",
  contents,
  inverted = false,
  uppercase = false,
  sx = {},
  ...props
}) => {
  if (TYPES[type] === undefined) type = 'default';
  const { color, bgColor } = TYPES[type];
  
  return <Chip
    label={contents}
    size="small"
    deleteIcon={
      props.onDelete ? (
        <CloseRounded
          sx={{
            transform: "scale(0.8)",
            transformOrigin: "center",
            strokeWidth: 0,
            fill: !inverted ? color : bgColor,
          }}
        />
      ) : undefined
    }
    sx={{
      direction: 'initial',
      backgroundColor: !inverted ? bgColor : color,
      color: !inverted ? color : bgColor,
      borderRadius: "6px",
      cursor: "revert",
      border: `1px solid ${!inverted ? color : bgColor}80`,
      whiteSpace: 'nowrap',
      overflow:  'hidden',
      textOverflow: 'ellipsis',
      maxWidth: "35ch",
      textTransform: uppercase ? 'uppercase' : 'initial',
      ...sx,
    }}
    {...props}
  />;
};

Tag.propTypes = {
  color: PropTypes.string,
  contents: PropTypes.node,
  inverted: PropTypes.bool,
  props: PropTypes.any,
};