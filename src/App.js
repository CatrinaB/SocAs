import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import uiTheme from './utils/ui-theme';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import Login from "./pages/Login.js";
import Logout from "./components/auth/Logout";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AssistantForm from "./components/AssistantForm";
import DisabilityForm from "./components/DisabilityForm";
import Account from "./pages/Account";
import PrivateRoute from "./components/auth/PrivateRoute"

import "./App.css";
import Navbar from "./components/navigation/Navbar";

require('dotenv').config();

function App() {
	console.log(process.env);
	return (
		<ThemeProvider theme={uiTheme}>
			<div className="App">
				<Provider store={store}>
					<Router>
						<Navbar/>
						<main style={{ margin: "5%" }}>
							<Switch>
								<Route path="/login" component={Login}/>
								<Route path="/signup" component={Signup}/>
								<Route path="/assistantForm" component={AssistantForm}/>
								<Route path="/disabledForm" component={DisabilityForm}/>
								<PrivateRoute path="/dashboard" component={Dashboard}/>
								<PrivateRoute path="/account" component={Account}/>
								<Route path="/logout" component={Logout}/>
								<Redirect to="/login"/>
							</Switch>
						</main>
					</Router>
				</Provider>
			</div>
		</ThemeProvider>
	);
}

export default App;
