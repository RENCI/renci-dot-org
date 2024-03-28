export const getProjectRelations = (projects) => {

   const payload = Array.isArray(projects) ? projects.map((project) => ({
    id: project.id,
    name: project.text,
    slug: project.data,
  })) : []

  return payload
}