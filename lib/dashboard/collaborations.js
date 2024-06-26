import { fetchFromDashboard } from "@/utils/dashboard";
import {
import { 
  getPeopleRelations,
  getLeadsRelations,
  getProjectRelations,
  getOrganizationRelations,
  sortPeople,
} from "./utils";

export const fetchDashboardCollaborations = async () => {
  const payload = await fetchFromDashboard("collaborations");

  return payload;
};

export const fetchSingleCollaboration = async (slug) => {
  const collaboration = await fetchFromDashboard(`collaborations/${slug}`)

  const collaborationPayload = ({
    id,
    displayName,
    slug,
    urls,
    renciRole,
    description,
    isPublished,
    featuredImage,
    people,
    leads,
    projects,
    organizationPartners,
    organizationFundings
  }) => {
    // collect all team members and sort everyone
    // alphabetically lastName, firstName (displayName).
    const sortedPeople = sortPeople([
      ...getPeopleRelations(people),
      ...getLeadsRelations(leads)
    ]);
    
    return ({
      id: id,
      name: displayName,
      slug: slug,
      urls: urls,
      role: renciRole,
      description: description,
      isPublished: isPublished,
      featuredImage: featuredImage[0],
      members: sortedPeople,
      projects: getProjectRelations(projects),
      partners: getOrganizationRelations(organizationPartners),
      funding:  getOrganizationRelations(organizationFundings),
    })
  }

  return collaborationPayload(collaboration)
}