import { fetchFromDashboard } from "@/utils/dashboard";

let collaborations, researchGroups, teams;
export const fetchOurWorkTrayItems = async () => {
  if (!collaborations || !researchGroups || !teams) {
    [
      collaborations,
      researchGroups,
      teams
    ] = await Promise.all([
      fetchFromDashboard("collaborations"),
      fetchFromDashboard("research-groups"),
      fetchFromDashboard("teams"),
    ])
  }
  
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