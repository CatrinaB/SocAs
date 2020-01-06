import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/auth/Login.js';
import SignupForm from './components//auth/Signup';
import Dashboard from './components/Dashboard';

import './App.css';


// const express = require('express');
// const bodyParser = require('body-parser');
// const graphqlHttp = require('express-graphql');

// const app = express();

function App() {
	return (
		<div className="App">
			<Provider store={ store }>
				<Router>
					<div className="App">
						<br/>
						<Route exact path="/" component={ Login } />
						<Route exact path="/signup" component={ SignupForm } />
						<Route path="/dashboard" component={ Dashboard } />
					</div>
				</Router>
			</Provider>
		</div>
  	);
	// app.use(bodyParser.json());
	// app.get('/', (req, res, next) => {
	// 	res.send('Hello world!');
	// })
}

// app.listen(3000);

export default App;
