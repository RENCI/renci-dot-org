import { fetchFromDashboard } from "@/utils/dashboard";
import { getProjectRelations, getDivisionRelations } from "./utils";
import genericAvatar from "../../images/generic-avatar.svg";

export const fetchDashboardPeople = async () => {
  let people = await fetchFromDashboard("people");

  people = people
    .filter((person) => person.isActive)
    .map((person) => ({
      ...person,
      // give person our generic avatar if no photo exists
      photo: person.photo || genericAvatar.src,
    }))
    .sort((p, q) => {
      return p.firstName.localeCompare(q.firstName)
        ? p.lastName.localeCompare(q.lastName)
        : -1;
    });

  const ood = people.filter(
    (person) => person.teams.some((t) => t.id === "_bKDyhHztEUazg1GOoGEkoA"), // dashboard uid for team OOD
  );

  return { ood, people };
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
    photo: photo,
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
