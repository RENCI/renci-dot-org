import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Layout } from "../components";
import "../style/global.css";
import theme from "../style/theme";
import { ConfigProvider } from "../context";
import fontCss from "../fonts/atlas-grotesk/fonts.css";
import App from "next/app";
import { getGlobalData } from "utils/api";
import { DefaultSeo } from "next-seo";
import { fetchOurWorkTrayItems } from "../lib/dashboard/ourWorkTray";

const MyApp = (props) => {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel={fontCss} />
      </Head>
      {/* Global site metadata */}
      {/* <DefaultSeo
        titleTemplate={`%s | ${global.metaTitleSuffix}`}
        title="Page"
        description={metadata.metaDescription}
        openGraph={{
          images: Object.values(metadata.shareImage.formats).map((image) => {
            return {
              url: getStrapiMedia(image.url),
              width: image.width,
              height: image.height,
            };
          }),
        }}
      /> */}
      <ConfigProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout ourWorkTrayItems={pageProps.ourWorkTrayItems}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ConfigProvider>
    </React.Fragment>
  );
};

// App.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   pageProps: PropTypes.object.isRequired,
// }

// import App from "next/app"
// import Head from "next/head"
// import ErrorPage from "next/error"
// import { useRouter } from "next/router"
// // import { DefaultSeo } from "next-seo"
// import { getStrapiMedia } from "utils/media"
// import { getGlobalData } from "utils/api"
// import { Provider } from "next-auth/client"
// import { useEffect } from "react"
// import "@/styles/index.css"

// const MyApp = ({ Component, pageProps }) => {
// const router = useRouter()
// useEffect(() => {
//   const handleRouteChange = (url) => {
//     window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
//       page_path: url,
//     })
//   }
//   router.events.on("routeChangeComplete", handleRouteChange)
//   return () => {
//     router.events.off("routeChangeComplete", handleRouteChange)
//   }
// }, [router.events])
// Extract the data we need
// const { global } = pageProps
// if (global == null) {
//   return <ErrorPage statusCode={404} />
// }

// const { metadata } = global

// return (
//   <div>
//     {/* Favicon */}
//     <Head>
//       {/* <link rel="shortcut icon" href={getStrapiMedia(global.favicon.url)} /> */}
//     </Head>
//     {/* Global site metadata */}
//     {/* <DefaultSeo
//       titleTemplate={`%s | ${global.metaTitleSuffix}`}
//       title="Page"
//       description={metadata.metaDescription}
//       openGraph={{
//         images: Object.values(metadata.shareImage.formats).map((image) => {
//           return {
//             url: getStrapiMedia(image.url),
//             width: image.width,
//             height: image.height,
//           }
//         }),
//       }}
//       twitter={{
//         cardType: metadata.twitterCardType,
//         handle: metadata.twitterUsername,
//       }}
//     /> */}
//     {/* Display the content */}
//       <Component {...pageProps} />
//   </div>
// )
// }

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (appContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const globalLocale = await getGlobalData();

  const ourWorkTrayItems = await fetchOurWorkTrayItems();

  return {
    ...appProps,
    pageProps: { globalLocale, ourWorkTrayItems },
  };
};

export default MyApp;
