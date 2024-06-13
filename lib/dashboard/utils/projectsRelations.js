export const getProjectRelations = (projects) => {
  const payload = Array.isArray(projects)
    ? projects.map((project) => ({
        id: project.id,
        name: project.name,
        slug: project.slug,
        active: project.active,
      }))
    : [];

  return payload;
};
