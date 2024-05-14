import { fetchStrapiGraphQL } from './'
import { fetchPeopleByPIDs } from './'

export const fetchStrapiCollaborations = async (preview = false) => {
  const { data } = await fetchStrapiGraphQL(`query {
    collaborations (pagination: { limit: 50}){
      data {
        id
        attributes {
          name
          description
          renciRole
          slug
          URL {
            address
            id
          }
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
  }`, preview)

const getPayload = (array) => {
  return array.map((collaboration) => ({
    id: collaboration.id,
    name: collaboration.attributes.name,
    slug: collaboration.attributes.slug,
    url: collaboration.attributes.URL
  }))
}

const payload = getPayload(data.collaborations.data)

  return payload
}

export const fetchStrapiCollaboration = async (id, preview = false) => {

  const { data: collaborationData } = await fetchStrapiGraphQL(`query {
    collaborations(filters: { slug:{ eq:"${ id }" }} ) {
      data {
        id
        attributes {
          name
          description
          renciRole
          featuredImage {
            data {
              attributes {
                url
              }
            }
          }
          slug
          URL {
            address
            id
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
  }`, preview)


  // create an array of PIDs for the members of the project
  const memberPIDs = await collaborationData.collaborations.data[0].attributes.members.data.map((member)=> ( member.attributes.pid))
  
  // call a function that takes the array of PIDs, queries those people, and returns an 
  // array of people objects that you can reference in the payload object below

  const peopleData = await fetchPeopleByPIDs(memberPIDs)

  // construct a new collaborations object combining and massaging/flattening data from 
  // the collaborations query and the fetchPeopleByPIDs query
  const payload = {
    id: collaborationData.collaborations.data[0].id,
    name: collaborationData.collaborations.data[0].attributes.name,
    description: collaborationData.collaborations.data[0].attributes.description,
    featuredImage: collaborationData.collaborations.data[0].attributes?.featuredImage?.data?.attributes,
    role: collaborationData.collaborations.data[0].attributes.renciRole,
    members: peopleData ? peopleData : [],
    urls: collaborationData.collaborations.data[0].attributes?.URL,
    projects: collaborationData.collaborations.data[0].attributes.projects.data ? collaborationData.collaborations.data[0].attributes.projects.data.map((project) => ({
      slug: project.attributes.slug,
      name: project.attributes.name,
    })) : [],
    partners: collaborationData.collaborations.data[0].attributes.partners.data ? collaborationData.collaborations.data[0].attributes.partners.data.map((partner) => ({
      slug: partner.attributes.slug,
      name: partner.attributes.name,
      orgURL: partner.attributes.url
    })) : [],
    funding: collaborationData.collaborations.data[0].attributes.funding.data ? collaborationData.collaborations.data[0].attributes.funding.data.map((partner) => ({
      slug: partner.attributes.slug,
      name: partner.attributes.name,
      orgURL: partner.attributes.url
    })) : [],
  }

  // return one mega payload object
  return payload
}
