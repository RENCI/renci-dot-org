import { fetchFromDashboard } from "@/utils/dashboard";
import { 
  getPeopleRelations,
  getLeadsRelations,
  sortPeople,
} from "./utils";

export const fetchDashboardTeams = async () => {
  const payload = await fetchFromDashboard("teams");

  return payload;
};

export const fetchSingleTeam = async (slug) => {
  const team = await fetchFromDashboard(`teams/${slug}`)

  const teamPayload = ({
    id,
    displayName,
    slug,
    description,
    isPublished,
    featuredImage,
    people,
    leads,
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
      description: description,
      isPublished: isPublished,
      featuredImage: featuredImage[0],
      members: sortedPeople,
    })
  }
  return teamPayload(team)
}