import { fetchFromDashboard } from "@/utils/dashboard";
import { getProjectRelations, getDivisionRelations } from "./utils";
import genericAvatar from "../../images/generic-avatar.svg";

export const fetchDashboardPeople = async () => {
  const payload = await fetchFromDashboard("people");
  let oodList = [];

  payload.forEach((person) => {
    if (person.teams.length > 0) {
      person.teams.forEach((team) => {
        if (team.data === "ood") {
          oodList.push(person);
        }
      });
    }
  });

  return { ood: oodList, people: payload };
};

export const fetchSinglePerson = async (slug) => {
  const person = await fetchFromDashboard(`people/${slug}`);

  const personPayload = ({
    personId,
    displayName,
    slug,
    isPublished,
    isActive,
    photo,
    title,
    researchGroups,
    teams,
    email,
    phones,
    biography,
    projects,
    collaborations,
  }) => ({
    id: personId,
    displayName: displayName,
    slug: slug,
    isPublished: isPublished,
    active: isActive,
    photo: photo ? photo : genericAvatar.src,
    title: title,
    division: getDivisionRelations(researchGroups, teams),
    researchGroups: researchGroups,
    teams: teams,
    email: email,
    phones: phones,
    biography: biography,
    projects: getProjectRelations(projects),
    collaborations: getProjectRelations(collaborations),
  });

  return personPayload(person);
};
