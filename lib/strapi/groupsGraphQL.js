import { fetchStrapiGraphQL } from "./";
import { fetchPeopleByPIDs } from "./";

export const fetchStrapiGroups = async (preview = false) => {
  const { data } = await fetchStrapiGraphQL(
    `query {
    researchGroups {
      data {
        id
        attributes {
          name
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
    return array.map((group) => ({
      id: group.id,
      name: group.attributes.name,
      slug: group.attributes.slug,
    }));
  };
  const payload = getPayload(data.researchGroups.data);

  return payload;
};

export const fetchStrapiGroup = async (id, preview = false) => {
  const { data: groupData } = await fetchStrapiGraphQL(
    `query {
    researchGroups (filters: { slug: { eq:"${id}" }}) {
      data {
        id
        attributes {
          name
          description
          slug
          featuredImage {
            data {
              attributes {
                url
              }
            }
          }
          members {
            data {
              attributes {
                pid
              }
            }
          }
          projects (sort: ["name"]){
            data {
              attributes {
                active
                slug
                name
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
        }
      }
    }
  }`,
    preview,
  );

  // create an array of PIDs for the members of the project
  const memberPIDs =
    await groupData.researchGroups.data[0].attributes.members.data.map(
      (member) => member.attributes.pid,
    );

  // call a function that takes the array of PIDs, queries those people, and returns an
  // array of people objects that you can reference in the payload object below

  const peopleData = await fetchPeopleByPIDs(memberPIDs);

  // construct a new groups object combining and massaging/flattening data from
  // the groups query and the people query
  const payload = {
    id: groupData.researchGroups.data[0].id,
    featuredImage:
      groupData.researchGroups.data[0].attributes.featuredImage.data.attributes,
    name: groupData.researchGroups.data[0].attributes.name,
    description: groupData.researchGroups.data[0].attributes.description,
    role: groupData.researchGroups.data[0].attributes.role,
    slug: groupData.researchGroups.data[0].attributes.slug,
    members: peopleData ? peopleData : [],
    projects: groupData.researchGroups.data[0].attributes.projects.data
      ? groupData.researchGroups.data[0].attributes.projects.data.map(
          (project) => ({
            slug: project.attributes.slug,
            name: project.attributes.name,
            active: project.attributes.active,
          }),
        )
      : [],
    partners: groupData.researchGroups.data[0].attributes.partners.data
      ? groupData.researchGroups.data[0].attributes.partners.data.map(
          (partner) => ({
            name: partner.attributes.name,
            url: partner.attributes.url,
            slug: partner.attributes.slug,
          }),
        )
      : [],
  };

  // return one mega payload object
  return payload;
};
