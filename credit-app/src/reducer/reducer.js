import axios from 'axios'
import { CHANGE_PERSON, REFRESH_PERSONS, REFRESH_PENALTIES, REFRESH_CREDITS } from '../actions/actions'

const initialState = {
	selectedPerson: 0,
	persons: [],
	penalties: [],
	credits: [],
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_PERSON:
			// console.log(action.payload)
			return Object.assign({}, state, { 
				selectedPerson: action.payload.selectedPerson,
				credits: action.payload.credits,
				penalties: action.payload.penalties,
			})
			
		case REFRESH_PERSONS:
			// newState.persons = action.payload
			if(state.selectedPerson) {
				return Object.assign({}, state, {persons: action.payload})
			} else {
				return Object.assign({}, state, {persons: action.payload, selectedPerson: action.payload[0]})
			}
		
		case REFRESH_PENALTIES:
			return Object.assign({}, state, {penalties: action.payload})

		case REFRESH_CREDITS:
			return Object.assign({}, state, {credits: action.payload})
		default:
			return state
			break;
	}
}

export default reducer