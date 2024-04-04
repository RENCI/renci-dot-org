export const getDivisionRelations = (researchGroups, teams) => {

  const payload = (Array.isArray(researchGroups) && researchGroups.length) ?
    ({
      id: researchGroups[0].id,
      name: researchGroups[0].text,
      slug: researchGroups[0].data,
      type: 'researchGroups'
    })
  : (Array.isArray(teams) && teams.length) ?
    ({
      id: teams[0].id,
      name: teams[0].text,
      slug: teams[0].data,
      type: 'teams'
    })
  : null

  return payload
}