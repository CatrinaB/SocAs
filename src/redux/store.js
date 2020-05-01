import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from "./subscribers/local-storage";

const store = createStore(rootReducer, loadState(), composeWithDevTools(applyMiddleware(...[thunk])));

store.subscribe(() => {
	saveState({
		auth: {
			token: store.getState().auth.token
		}
	});
});

export default store;
