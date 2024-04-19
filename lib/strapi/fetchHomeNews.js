import { getStrapiURL } from "@/utils/api";

export const fetchHomeNews = async (preview = false) => {
  try {
    let bodyContent = JSON.stringify({
      "pagination": {
        "pageSize": 3,
        "page": 1
      }
    });

    const response = await fetch(getStrapiURL('/api/post-list'), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: bodyContent
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result.results

  } catch (error) {
    console.log(error);
  } 
}