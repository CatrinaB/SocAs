import { combineReducers } from 'redux';
import signupReducer from './auth-reducer.js';

const rootReducer = combineReducers({
	signup: signupReducer
})

export default rootReducer;
