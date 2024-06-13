import { fetchStrapiGraphQL } from ".";
import genericAvatar from "../../images/generic-avatar.svg";

export const fetchPeopleByPIDs = async (memberPIDs) => {
  // format the PID array so that the people query can accept
  const formatPIDs = memberPIDs.join('" , "');

  // build people query that accepts the pids from the project's members array
  // using the pids, query only the people whos PID matches the array
  const { data: peopleData } = await fetchStrapiGraphQL(`query {
    people(filters: {pid: { in: ["${formatPIDs}"] }} sort: ["lastName"] pagination: { limit: 50}) {
      data {
        attributes {
          pid
          firstName
          lastName
          slug
          title
          email
          active
          photo {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }`);

  const payload = peopleData.people.data.map((member) => ({
    fullName: `${member.attributes.firstName} ${member.attributes.lastName}`,
    firstName: member.attributes.firstName,
    lastName: member.attributes.lastName,
    pid: member.attributes?.pid,
    slug: member.attributes?.slug,
    title: member.attributes?.title,
    email: member.attributes?.email,
    active: member.attributes?.active,
    photoURL: member.attributes.photo.data[0]?.attributes
      ? member.attributes.photo.data[0].attributes.url
      : genericAvatar.src,
  }));

  return payload;
};

export const fetchPeopleExcludePIDs = async (memberPIDs) => {
  // format the PID array so that the people query can accept
  const formatPIDs = memberPIDs.join('" , "');

  // build people query that accepts the pids from the project's members array
  // using the pids, query only the people whos PID matches the array
  const { data: peopleData } = await fetchStrapiGraphQL(`query {
    people(filters: {pid: { notIn: ["${formatPIDs}"] } active: {eq: true}} sort: ["lastName"] pagination: { limit: 250}) {
      data {
        attributes {
          pid
          firstName
          lastName
          slug
          active
          title
          email
          photo {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }`);

  const payload = peopleData.people.data.map((member) => ({
    fullName: `${member.attributes.firstName} ${member.attributes.lastName}`,
    firstName: member.attributes.firstName,
    lastName: member.attributes.lastName,
    pid: member.attributes?.pid,
    slug: member.attributes?.slug,
    title: member.attributes?.title,
    email: member.attributes?.email,
    photoURL: member.attributes.photo.data[0]?.attributes
      ? member.attributes.photo.data[0].attributes.url
      : genericAvatar.src,
  }));

  return payload;
};
