import React from 'react';
import SignupForm from './components/Signup.js';
import store from './store';
import { Provider } from 'react-redux';
import './App.css';

function App() {
	return (
		<div className="App">
			<Provider store={ store }>
				<SignupForm />
			</Provider>
		</div>
  	);
}

export default App;
