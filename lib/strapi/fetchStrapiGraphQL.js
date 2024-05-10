import { getStrapiURL } from "@/utils/api";

export const fetchStrapiGraphQL = async (query, preview = false, signal = undefined) => {
  return fetch(getStrapiURL("/graphql"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_ACCESS_TOKEN}`,
    },
    signal,
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
};

//add error message if there's not a 200 status message
