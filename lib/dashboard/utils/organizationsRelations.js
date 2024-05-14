export const getOrganizationRelations = (organizations) => {

  const payload = Array.isArray(organizations) ? organizations.map((partner)=> ({
    id: partner.id,
    name: partner.name,
    orgURL: partner.url,
  })) : []

  return payload
}