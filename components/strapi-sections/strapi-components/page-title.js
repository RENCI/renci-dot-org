import { Fragment } from "react";
// import PropTypes from 'prop-types'
import { Divider, Typography } from "@mui/material";
import { Markdown } from "../../markdown";
// import { Hero } from './hero'

export const PageTitle = ({ data }) => {
  return (
    <Fragment>
      {/* {
        !!heroImage && (
          <Hero
            backgroundImage={ heroImage }
            backgroundColor="lightgrey"
          />
        )
      } */}

      <br />
      <br />

      <Typography variant="h1">{data.title}</Typography>

      <br />
      <br />
      <Divider />
      <br />
      <br />
      <Markdown linkTarget="_blank">{data.optionalDescription}</Markdown>
    </Fragment>
  );
};

// Page.propTypes = {
//   children: PropTypes.node,
//   title: PropTypes.string,
//   description: PropTypes.string,
// }
