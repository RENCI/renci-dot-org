// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   env: {
//     CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
//     CONTENTFUL_DELIVERY_ACCESS_TOKEN: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
//     CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
//   },
// }

// module.exports = nextConfig


module.exports = {
  // webpack5: false,
  // images: {
  //   domains: ["heal-community-portal-api.s3.amazonaws.com"],
  // },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ['https://dashboard.renci.org/','radx-images.s3.amazonaws.com', 'dashboard.renci.org', '/static/images'],
  },
};
