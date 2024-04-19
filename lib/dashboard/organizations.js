import { fetchFromDashboard } from "@/utils/dashboard";

export const fetchOrganizations = async () => {
  const payload = await fetchFromDashboard("organizations");

  return payload;
};