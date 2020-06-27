import { combineReducers } from 'redux';
import authReducer from './auth-reducer.js';
import profileReducer from './profile-reducers';

const rootReducer = combineReducers({
	auth: authReducer,
	otherProfile: profileReducer
});

export default rootReducer;
