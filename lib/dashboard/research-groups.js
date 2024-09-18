import { fetchFromDashboard } from "@/utils/dashboard";
import {
  getPeopleRelations,
  getLeadsRelations,
  getProjectRelations,
  getOrganizationRelations,
} from "./utils";

export const fetchResearchGroups = async () => {
  const payload = await fetchFromDashboard("research-groups");

  return payload;
};

export const fetchSingleResearchGroup = async (slug) => {
  const researchGroup = await fetchFromDashboard(`research-groups/${slug}`);

  const researchGroupPayload = ({
    id,
    displayName,
    slug,
    description,
    isPublished,
    featuredImage,
    people,
    leads,
    projects,
    organizationPartners,
  }) => ({
    id: id,
    name: displayName,
    slug: slug,
    description: description,
    isPublished: isPublished,
    featuredImage: featuredImage[0],
    members: [...getPeopleRelations(people), ...getLeadsRelations(leads)],
    projects: getProjectRelations(projects),
    partners: getOrganizationRelations(organizationPartners),
  });
  return researchGroupPayload(researchGroup);
};
