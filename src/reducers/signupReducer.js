import {
	UPDATE_USERNAME,
	UPDATE_PASSWORD,
	UPDATE_CONFIRM_PASSWORD
} from '../actions/action-types'

const initialState = {
	newUsername: '',
	newPassword: '',
	confirmPassword: ''
}

export default function (state=initialState, action){
	switch(action.type){
		case UPDATE_USERNAME:
			return{
				...state,
				newUsername: action.payload
			}

		case UPDATE_PASSWORD:
			return{
				...state,
				newPassword: action.payload
			}

		case UPDATE_CONFIRM_PASSWORD:
			return{
				...state,
				confirmPassword: action.payload
			}

		default: {
			return state;
		}
	}
}
