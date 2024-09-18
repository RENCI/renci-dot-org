import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import { getStrapiMedia } from "utils/media";
import { mediaPropTypes } from "utils/types";

const Seo = ({ metadata }) => {
  // Prevent errors if no metadata was set
  if (!metadata) return null;
  return (
    <NextSeo
      title={metadata.metaTitle}
      description={metadata.metaDescription}
      openGraph={{
        // Title and description are mandatory
        title: metadata.metaTitle,
        description: metadata.metaDescription,
        // Only include OG image if we have it
        // Careful: if you disable image optimization in Strapi, this will break
        ...(metadata.shareImage && {
          images: Object.values(metadata.shareImage.data).map((image) => {
            return {
              url: getStrapiMedia(image.attributes.url),
              width: image.attributes.width,
              height: image.attributes.height,
            };
          }),
        }),
      }}
    />
  );
};

Seo.propTypes = {
  metadata: PropTypes.shape({
    metaTitle: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    shareImage: mediaPropTypes,
  }),
};

export default Seo;
