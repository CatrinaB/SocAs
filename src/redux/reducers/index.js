import { combineReducers } from 'redux';
import authReducer from './auth-reducer.js';

const rootReducer = combineReducers({
	auth: authReducer
});

export default rootReducer;
