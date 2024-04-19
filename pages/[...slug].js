import ErrorPage from "next/error"
import { getPageData, fetchAPI, getGlobalData } from "../utils/api"
import Sections from "../components/strapi-sections/sections"
import Seo from "@/components/elements/seo"
import { useRouter } from "next/router"
import Layout from "../components/layout"
import { getLocalizedPaths } from "utils/localize"
import Head from "next/head"

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({
  sections,
  metadata,
  preview,
  title,
  global,
  pageContext
}) => {
  const router = useRouter()

  // Check if the required data was provided
  if (!router.isFallback && !sections?.length) {
    return <ErrorPage statusCode={404} />
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }
  
  return (
    <div>
      {Boolean(title) && <Head>
        <title> { title } | RENCI.org</title>
      </Head>}

      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />
      {/* Display content sections */}
      <Sections
        sections={sections}
        preview={preview}
      />
    </div>
  )
}

export async function getServerSideProps(context) {
  context.res.setHeader(
    'Cache-Control',
    'no-cache, no-store, must-revalidate'
  )

  const { params, locale, locales, defaultLocale, preview = null } = context

  const globalLocale = await getGlobalData(locale)
  
  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getPageData(
    { slug: !params.slug ? [""] : params.slug },
    locale,
    preview
  )

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const { contentSections, slug } = pageData

  const pageContext = {
    // defaultLocale,
    slug,
    // localizations,
  }

  // const localizedPaths = getLocalizedPaths(pageContext)

  return {
    props: {
      preview,
      sections: contentSections,
      metadata: pageData.metaData,
      global: globalLocale,
      title: pageData.title,
      pageContext: {
        ...pageContext,
        // localizedPaths,
      },
    },
  }
}

export default DynamicPage
