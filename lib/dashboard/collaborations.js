import { fetchFromDashboard } from "@/utils/dashboard";
import {
  getPeopleRelations,
  getProjectRelations,
  getOrganizationRelations,
} from "./utils";

export const fetchDashboardCollaborations = async () => {
  const payload = await fetchFromDashboard("collaborations");

  return payload;
};

export const fetchSingleCollaboration = async (slug) => {
  const collaboration = await fetchFromDashboard(`collaborations/${slug}`);

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
    organizationFundings,
  }) => ({
    id: id,
    name: displayName,
    slug: slug,
    urls: urls,
    role: renciRole,
    description: description,
    isPublished: isPublished,
    featuredImage: featuredImage[0],
    members: getPeopleRelations(people),
    leads: getPeopleRelations(leads),
    projects: getProjectRelations(projects),
    partners: getOrganizationRelations(organizationPartners),
    funding: getOrganizationRelations(organizationFundings),
  });

  return collaborationPayload(collaboration);
};
