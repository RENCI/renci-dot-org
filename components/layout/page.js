import { Fragment } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Divider, Typography } from "@mui/material";
import { Hero } from "./hero";

export const Page = ({
  title,
  hideTitle,
  superheader,
  superheaderUrl,
  description,
  children,
  heroImage,
}) => {
  const windowTitle = `${title + " | " || ""} RENCI.org`;
  return (
    <Fragment>
      <Head>
        <title> {title} | RENCI.org</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!!heroImage && (
        <Hero
          backgroundImage={heroImage}
          backgroundColor="lightgrey"
          title={title}
          superheader={superheader}
          superheaderUrl={superheaderUrl}
          description={description}
        />
      )}

      <br />
      <br />

      {!!heroImage ||
        (!hideTitle && (
          <Fragment>
            <Typography variant="h1">{title}</Typography>
            <br />
            <br />
            <Divider />
            <br />
            <br />
          </Fragment>
        ))}

      {children}
    </Fragment>
  );
};

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node.isRequired,
  superheader: PropTypes.string,
  superheader: PropTypes.string,
  hideTitle: PropTypes.bool.isRequired,
  description: PropTypes.string,
};

Page.defaultProps = {
  hideTitle: false,
};
