const extractLastName = name => name.split(' ').slice(-1)[0] || '?';

export const sortPeople = peopleArr => {
  let sortedPeople;
  if (!Array.isArray(peopleArr) || !peopleArr.length) {
    return [];
  }
  try {
    sortedPeople = peopleArr.map(person => ({
      ...person,
      lastName: extractLastName(person.displayName)
    })).sort((p, q) => p.lastName.localeCompare(q.lastName)
      || p.displayName.localeCompare(q.displayName)
    );
  } catch (error) {
    console.error(error.message);
    return [];
  }
  return sortedPeople;
}
