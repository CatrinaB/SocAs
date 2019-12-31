import { combineReducers } from 'redux';
import signupReducer from './signupReducer.js';

const rootReducer = combineReducers({
	signup: signupReducer
})

export default rootReducer;
