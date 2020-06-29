import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from "./subscribers/local-storage";

const store = createStore(rootReducer, loadState(), composeWithDevTools(applyMiddleware(...[thunk])));

store.subscribe(() => {
	saveState({
		auth: {
			token: store.getState().auth.token,
			userId: store.getState().auth.userId,
			name: store.getState().auth.name,
			tokenExpiration: store.getState().auth.tokenExpiration
		}
	});
});

export default store;
