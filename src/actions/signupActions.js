import {
	UPDATE_USERNAME,
	UPDATE_PASSWORD,
	UPDATE_CONFIRM_PASSWORD
} from './action-types'
import store from '../store'

export function updateUsername(params){
	return store.dispatch({
		type: UPDATE_USERNAME,
		payload: params
	})
}

export function updatePassword(params){
	return store.dispatch({
		type: UPDATE_PASSWORD,
		payload: params
	})
}

export function updateConfirmPassword(params){
	return store.dispatch({
		type: UPDATE_CONFIRM_PASSWORD,
		payload: params
	})
}
