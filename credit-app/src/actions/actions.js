
export const CHANGE_PERSON = "CHANGE_PERSON"
export const REFRESH_PERSONS = "REFRESH_PERSONS"
export const REFRESH_PENALTIES = "REFRESH_PENALTIES"
export const REFRESH_CREDITS = "REFRESH_CREDITS"

export function changePerson(person) {
	return {
		type: CHANGE_PERSON,
		payload: person,
	}
}

export function refreshPersons(persons) {
	return {
		type: REFRESH_PERSONS,
		payload: persons,
	}
}

export function refreshPenalties(penalties) {
	return {
		type: REFRESH_PENALTIES,
		payload: penalties,
	}
}

export function refreshCredits(credits) {
	return {
		type: REFRESH_CREDITS,
		payload: credits,
	}
}