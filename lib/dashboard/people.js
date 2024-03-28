import { fetchFromDashboard } from "@/utils/dashboard";

export const fetchDashboardPeople = async () => {
  const payload = await fetchFromDashboard("people");
  let oodList = [];

  payload.forEach(person => {
    if (person.teams.length > 0) {
      person.teams.forEach(team => {
        if (team.data == "ood") {
          oodList.push(person)
        }
      })
    }
  })

  return { ood: oodList, people: payload };
};
