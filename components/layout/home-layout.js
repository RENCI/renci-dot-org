import PropTypes from "prop-types";
import Head from "next/head";
import { Footer } from "./footer";
import { AppBar } from "./app-bar";

export const HomeLayout = ({ children, ourWorkTrayItems }) => {
  return (
    <>
      <Head>
        <title>RENCI.org</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <AppBar ourWorkTrayItems={ourWorkTrayItems} homePageAppBar />

      {children}
      
      <footer>
        <Footer />
      </footer>
    </>
  );
};

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
