import { fetchFromDashboard } from "@/utils/dashboard";

export const fetchOrganizations = async () => {
  const organizations = await fetchFromDashboard("organizations");

  const payload = organizations.map(org => ({
    ...org,
    projectPartners: org.projectPartners.map(p => ({
      ...p,
      path: `/projects/${ p.slug }`
    })),
    collaborationPartners: org.collaborationPartners.map(p => ({
      ...p,
      path: `/collaborations/${ p.slug }`
    })),
  }));

  return payload;
};
