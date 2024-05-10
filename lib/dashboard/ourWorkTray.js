import { fetchFromDashboard } from "@/utils/dashboard";

export const fetchOurWorkTrayItems = async () => {
  const collaborations = await fetchFromDashboard("collaborations");
  const researchGroups = await fetchFromDashboard("research-groups");
  const teams = await fetchFromDashboard("teams");

  let payload = {
    collaborationCollection: collaborations.map((group) => ({
      id: group.id,
      name: group.displayName,
      slug: group.slug,
    })),
    researchGroupCollection: researchGroups.map((group) => ({
      id: group.id,
      name: group.displayName,
      slug: group.slug,
    })),
    teamCollection: teams.map((group) => ({
      id: group.id,
      name: group.displayName,
      slug: group.slug,
    })),
  };
  // sort everything alphabetically -- groups, collabs, and ops teams
  payload = Object.keys(payload)
    .reduce((acc, key) => {
      acc[key] = payload[key].sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
      return acc
    }, {})

  return payload
}