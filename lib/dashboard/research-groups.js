import { fetchFromDashboard } from "@/utils/dashboard";
import { 
  getPeopleRelations,
  getLeadsRelations,
  getProjectRelations,
  getOrganizationRelations
} from "./utils";

export const fetchResearchGroups = async () => {
  const payload = await fetchFromDashboard("research-groups");

  return payload;
};

export const fetchSingleResearchGroup = async (slug) => {
  const researchGroup = await fetchFromDashboard(`research-groups/${slug}`)

  const extractLastName = name => name.split(' ').slice(-1)[0] || '?'

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
  }) => {
    // collect all team members and sort everyone
    // alphabetically lastName, firstName (displayName).
    const sortedPeople = [
      ...getPeopleRelations(people),
      ...getLeadsRelations(leads)
    ].map(person => ({
      ...person,
      lastName: extractLastName(person.displayName)
    })).sort((p, q) => p.lastName.localeCompare(q.lastName)
      || p.displayName.localeCompare(q.displayName)
    )

    return {
      id: id,
      name: displayName,
      slug: slug,
      description: description,
      isPublished: isPublished,
      featuredImage: featuredImage[0],
      members: sortedPeople,
      projects: getProjectRelations(projects),
      partners: getOrganizationRelations(organizationPartners)
    }
  }
  return researchGroupPayload(researchGroup)
}