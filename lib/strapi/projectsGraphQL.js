import { fetchStrapiGraphQL } from "./";
import { fetchPeopleByPIDs } from "./";
import homeHero from "../../images/racks.jpg";

export const fetchAllStrapiProjects = async (preview = false) => {
  const { data } = await fetchStrapiGraphQL(
    `query {
    projects (sort: ["name"] pagination: { limit: 150}){
      data {
        id
        attributes {
          active
          name
          shortTitle
          description
          slug
          featuredImage {
            data {
              attributes {
                url
              }
            }
          }    
        }
      }
    }
  }`,
    preview,
  );

  const getPayload = (array) => {
    const trimText = (description, wordCount = 25) => {
      //split the description into an array of words
      const snippetArray = description.split(" ");

      //grab the first X number of words as defined by the wordCount above
      const trimmedSnippetArray = snippetArray.slice(0, wordCount);

      //if the number of words in the description is longer than the wordcount, return a string that has an ellipsis at the end. if not, return a string that just joins the words from the trimmed array
      return snippetArray.length >= wordCount
        ? `${trimmedSnippetArray.join(" ")} ...`
        : trimmedSnippetArray.join(" ");
    };

    return array.map((project) => ({
      id: project.id,
      active: project.attributes.active,
      name: project.attributes.name,
      shortTitle: project.attributes.shortTitle
        ? project.attributes.shortTitle
        : null,
      slug: project.attributes.slug,
      description: project.attributes.description,
      snippet: project.attributes.description
        ? trimText(project.attributes.description)
        : "Click to read more",
      featuredImage:
        project.attributes.featuredImage.data?.attributes?.url || homeHero.src,
    }));
  };

  const payload = getPayload(data.projects.data);

  return payload;
};

export const fetchActiveStrapiProjects = async (preview = false) => {
  const { data } = await fetchStrapiGraphQL(
    `query {
    projects (filters: { active: {eq: true}} sort: ["name"] pagination: { limit: 150}){
      data {
        id
        attributes {
          active
          name
          shortTitle
          description
          slug
          featuredImage {
            data {
              attributes {
                url
              }
            }
          }    
        }
      }
    }
  }`,
    preview,
  );

  const getPayload = (array) => {
    const trimText = (description, wordCount = 25) => {
      //split the description into an array of words
      const snippetArray = description.split(" ");

      //grab the first X number of words as defined by the wordCount above
      const trimmedSnippetArray = snippetArray.slice(0, wordCount);

      //if the number of words in the description is longer than the wordcount, return a string that has an ellipsis at the end. if not, return a string that just joins the words from the trimmed array
      return snippetArray.length >= wordCount
        ? `${trimmedSnippetArray.join(" ")} ...`
        : trimmedSnippetArray.join(" ");
    };

    return array.map((project) => ({
      id: project.id,
      active: project.attributes.active,
      name: project.attributes.name,
      shortTitle: project.attributes.shortTitle
        ? project.attributes.shortTitle
        : null,
      slug: project.attributes.slug,
      description: project.attributes.description,
      snippet: project.attributes.description
        ? trimText(project.attributes.description)
        : "Click to read more",
      featuredImage:
        project.attributes.featuredImage.data?.attributes?.url || homeHero.src,
    }));
  };

  const payload = getPayload(data.projects.data);

  return payload;
};

export const fetchStrapiProject = async (id, preview = false) => {
  const { data: projectData } = await fetchStrapiGraphQL(
    `query {
    projects(filters: { slug:{ eq:"${id}" }} ) {
      data {
        id
        attributes {
          name
          shortTitle
          description
          renciRole
          researchGroup {
            data {
              attributes {
                name
                slug
              }
            }
          }
          featuredImage {
            data {
              attributes {
                url
              }
            }
          }
          slug
          members {
            data {
              attributes {
                pid
              }
            }
          }
          partners (sort: ["name"]){
            data {
              attributes {
                name
                url
                slug
              }
            }
          }
          funding (sort: ["name"]){
            data {
              attributes {
                name
                url
                slug
              }
            }
          }
        }
      }
    }
  }`,
    preview,
  );

  // create an array of PIDs for the members of the project
  const memberPIDs =
    await projectData.projects.data[0].attributes.members.data.map(
      (member) => member.attributes.pid,
    );

  // call a function that takes the array of PIDs, queries those people, and returns an
  // array of people objects that you can reference in the payload object below

  const peopleData = await fetchPeopleByPIDs(memberPIDs);

  // construct a new project object combining and massaging/flattening data from
  // the project query and the people query
  const payload = {
    id: projectData.projects.data[0].id,
    name: projectData.projects.data[0].attributes.name,
    shortTitle: projectData.projects.data[0].attributes.shortTitle
      ? projectData.projects.data[0].attributes.shortTitle
      : null,
    description: projectData.projects.data[0].attributes.description,
    renciRole: projectData.projects.data[0].attributes.renciRole,
    researchGroup: {
      ...projectData.projects.data[0].attributes?.researchGroup?.data
        ?.attributes,
    },
    featuredImage:
      projectData.projects.data[0].attributes.featuredImage.data?.attributes
        ?.url || homeHero.src,
    members: peopleData ? peopleData : [],
    partners: projectData.projects.data[0].attributes.partners.data
      ? projectData.projects.data[0].attributes.partners.data.map(
          (partner) => ({
            name: partner.attributes.name,
            url: partner.attributes.url,
            slug: partner.attributes.slug,
          }),
        )
      : [],
    funding: projectData.projects.data[0].attributes.funding.data
      ? projectData.projects.data[0].attributes.funding.data.map((partner) => ({
          name: partner.attributes.name,
          url: partner.attributes.url,
          slug: partner.attributes.slug,
        }))
      : [],
  };

  // return one mega payload object
  return payload;
};
