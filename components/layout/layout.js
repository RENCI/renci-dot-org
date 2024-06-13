import PropTypes from "prop-types";
import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Paper,
  Toolbar,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Menu } from "./menu";
import { Footer } from "./footer";
import renciLogo from "../../images/renci.png";
import { useConfig } from "../../context";
import { Link } from "../link";

export const Layout = ({ children, ourWorkTrayItems }) => {
  const { config } = useConfig();

  return (
    <Fragment>
      <Head>
        <title>RENCI.org</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          height: "120px",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "stretch",
        }}
      >
        <Container maxWidth={config.width} sx={{ height: "100%" }}>
          <Toolbar
            sx={{
              padding: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
              height: "100%",
            }}
          >
            <Link to="/">
              <Box
                sx={{
                  width: "120px",
                  height: "100%",
                  maxWidth: "120px",
                  backgroundImage: `url(${renciLogo.src})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "50% 50%",
                }}
              />
            </Link>
            <Menu ourWorkTrayItems={ourWorkTrayItems} />
          </Toolbar>
        </Container>
      </AppBar>
      <main style={{ flex: 1 }}>
        <Container maxWidth={config.width}>{children}</Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
