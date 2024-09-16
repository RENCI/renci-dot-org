import { fetchStrapiGraphQL } from "./";
import { fetchPeopleByPIDs, fetchPeopleExcludePIDs } from "./";
import genericAvatar from "../../images/generic-avatar.svg";

// the logic :
// fetch OOD team, get PIDs
// fetch people data using OOD PIDs
// fetch remaining people excluding OOD PIDs

// Write query for individual people

export const fetchStrapiPeople = async () => {
  // fetch OOD
  const { data } = await fetchStrapiGraphQL(`query {
    teams(filters: { slug: { eq: "ood" }} ) {
      data {
        attributes {
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
  }`);

  const memberPIDs = await data.teams.data[0].attributes.members.data.map(
    (member) => member.attributes.pid,
  );

  const oodPeopleData = await fetchPeopleByPIDs(memberPIDs);

  //note: fetchPeopleExludePIDs function will only return active staff members
  const otherPeopleData = await fetchPeopleExcludePIDs(memberPIDs);

  return { ood: oodPeopleData, people: otherPeopleData };
};

export const fetchStrapiPerson = async (id) => {
  const { data: personData } = await fetchStrapiGraphQL(`query {
    people(filters: { slug:{ eq:"${id}" }} ) {
      data {
        attributes {
          pid
          firstName
          lastName
          slug
          title
          email
          biography
          photo {
            data {
              attributes {
                url
              }
            }
          }
          teams {
            data {
              attributes {
                name
                slug
              }
            }
          }
          researchGroups {
            data {
              attributes {
                name
                slug
              }
            }
          }
          projects (sort: ["name"]){
            data {
              attributes {
                name
                slug
              }
            }
          }
          collaborations (sort: ["name"]){
            data {
              attributes {
                name
                slug
              }
            }
          }
        }
      }
    }
  }`);

  const getPayload = (personData) => {
    const person = personData.people.data[0].attributes;

    return {
      id: personData.people.data[0].id,
      fullName: `${person.firstName} ${person.lastName}`,
      firstName: person.firstName,
      lastName: person.lastName,
      pid: person?.pid,
      slug: person?.slug,
      title: person?.title,
      email: person?.email,
      biography: person?.biography,
      photoURL: person.photo.data[0]?.attributes
        ? person.photo.data[0].attributes.url
        : genericAvatar.src,
      team: person.teams.data[0]?.attributes
        ? person.teams.data.map((team) => ({
            name: team.attributes.name,
            slug: team.attributes.slug,
          }))
        : null,
      researchGroup: person.researchGroups.data[0]?.attributes
        ? person.researchGroups.data.map((group) => ({
            name: group.attributes.name,
            slug: group.attributes.slug,
          }))
        : null,
      contributions:
        person.projects.data[0] || person.collaborations.data[0]
          ? {
              projects: person.projects.data[0]
                ? person.projects.data.map((project) => ({
                    name: project.attributes.name,
                    slug: project.attributes.slug,
                  }))
                : null,
              collaborations: person.collaborations.data[0]
                ? person.collaborations.data.map((project) => ({
                    name: project.attributes.name,
                    slug: project.attributes.slug,
                  }))
                : null,
            }
          : null,
    };
  };

  return getPayload(personData);
};
