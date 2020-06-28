import { combineReducers } from 'redux';
import authReducer from './auth-reducer.js';
import profileReducer from './profile-reducers';
import searchUsers from './search-reducers';

const rootReducer = combineReducers({
	auth: authReducer,
	otherProfile: profileReducer,
	searchUsers: searchUsers
});

export default rootReducer;
