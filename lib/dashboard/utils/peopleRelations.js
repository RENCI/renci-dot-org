import genericAvatar from '../../../images/generic-avatar.svg'

export const getPeopleRelations = (people) => {

  const payload = Array.isArray(people) ? people.map((person) => ({
    id: person.id,
    displayName: person.name,
    slug: person.slug,
    photo: person.photo ? person.photo : genericAvatar.src,
    active: person.active,
    title: person.title
  })) : []

  return payload
}

export const getLeadsRelations = (people) => {

  const payload = Array.isArray(people) ? people.map((person) => ({
    id: person.id,
    displayName: person.name,
    slug: person.slug,
    photo: person.photo ? person.photo : genericAvatar.src,
    active: person.active,
    title: person.title,
    lead: true,
  })) : []

  return payload
}