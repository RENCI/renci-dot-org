export const getDivisionRelations = (researchGroups, teams) => {

  const payload = (Array.isArray(researchGroups) && researchGroups.length) ?
    ({
      id: researchGroups[0].id,
      name: researchGroups[0].name,
      slug: researchGroups[0].slug,
      type: 'researchGroups'
    })
  : (Array.isArray(teams) && teams.length) ?
    ({
      id: teams[0].id,
      name: teams[0].name,
      slug: teams[0].slug,
      type: 'teams'
    })
  : null

  return payload
}