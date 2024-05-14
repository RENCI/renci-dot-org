import { fetchFromDashboard } from "@/utils/dashboard";
import { getPeopleRelations } from "./utils";

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
  }) =>({
    id: id,
    name: displayName,
    slug: slug,
    description: description,
    isPublished: isPublished,
    featuredImage: featuredImage[0],
    members: getPeopleRelations(people),
    leads: getPeopleRelations(leads)
  })
  return teamPayload(team)
}