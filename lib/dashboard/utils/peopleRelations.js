import genericAvatar from '../../../images/generic-avatar.svg'

export const getPeopleRelations = (people) => {

  const payload = Array.isArray(people) ? people.map((person) => ({
    id: person.id,
    fullName: person.text,
    slug: person.data,
    photo: person.photo ? person.photo : genericAvatar.src,
    active: true,
  })) : []
console.log(payload)
 return payload
}