import { fetchStrapiGraphQL } from "./";
import { fetchPeopleByPIDs } from "./";

export const fetchStrapiTeams = async (preview = false) => {
  const { data } = await fetchStrapiGraphQL(
    `query {
    teams (pagination: { limit: 50}){
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
    return array.map((team) => ({
      id: team.id,
      name: team.attributes.name,
      slug: team.attributes.slug,
    }));
  };

  const payload = getPayload(data.teams.data);

  return payload;
};

export const fetchStrapiTeam = async (id, preview = false) => {
  const { data: teamData } = await fetchStrapiGraphQL(
    `query {
    teams(filters: { slug:{ eq:"${id}" }} ) {
      data {
        id
        attributes {
          name
          description
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
        }
      }
    }
  }`,
    preview,
  );

  // create an array of PIDs for the members of the project
  const memberPIDs = await teamData.teams.data[0].attributes.members.data.map(
    (member) => member.attributes.pid,
  );

  // call a function that takes the array of PIDs, queries those people, and returns an
  // array of people objects that you can reference in the payload object below

  const peopleData = await fetchPeopleByPIDs(memberPIDs);

  // construct a new team object combining and massaging/flattening data from
  // the team query and the people query
  const payload = {
    id: teamData.teams.data[0].id,
    name: teamData.teams.data[0].attributes.name,
    description: teamData.teams.data[0].attributes.description,
    featuredImage:
      teamData.teams.data[0].attributes?.featuredImage?.data?.attributes,
    role: teamData.teams.data[0].attributes.role,
    slug: teamData.teams.data[0].attributes.slug,
    members: peopleData ? peopleData : [],
  };

  // return one mega payload object
  return payload;
};
