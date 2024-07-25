export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://api.renci.org"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path, options = {}) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
          `Bearer ${process.env.STRAPI_ACCESS_TOKEN}`,
    },
  };
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl, mergedOptions);
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}

/**
 *
 * @param {object} params The router params object with slug: { slug: [<slug>] }
 * @param {string} locale The current locale specified in router.locale
 * @param {boolean} preview router isPreview value
 */
export async function getPageData(params, locale, preview) {
  const slug = params.slug.join("/");
  // Find the pages that match this slug
  const pagesData = await fetchAPI(
    `/api/pages?filters[slug]=${slug}&populate[contentSections][populate]=*&populate[metaData][populate]=*`
  );

  // Make sure we found something, otherwise return null
  if (pagesData == null || pagesData.length === 0 || pagesData.data.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data[0].attributes;
}

let strapiGlobal;

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData(locale) {
  if (!strapiGlobal)
    strapiGlobal = await fetchAPI(`/api/global?populate[metaData][populate]=*&populate[navBar][populate]=*&populate[favicon][populate]=*`);
  return strapiGlobal;
}

export async function getStrapiApiPageData(slug) {
  const pageData = await getPageData({ slug: [slug] }, "en", false);
  return pageData;
}
