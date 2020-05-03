import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import Login from "./components/auth/Login.js";
import Logout from "./components/auth/Logout";
import SignupForm from "./components/auth/Signup";
import Dashboard from "./pages/Dashboard";
import BackgroundImagePage from "./components/Background";
import AssistantForm from "./components/AssistantForm";
import DisabilityForm from "./components/DisabilityForm";
import Account from "./pages/Account";

import "./App.css";
import Navbar from "./components/navigation/Navbar";

function App() {

	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Navbar/>
					<main>
						<Switch>
							<Route path="/login" component={Login}/>
							<Route path="/signup" component={SignupForm}/>
							<Route path="/dashboard" component={Dashboard}/>
							<Route path="/background" component={BackgroundImagePage}/>
							<Route path="/assistantForm" component={AssistantForm}/>
							<Route path="/disabilityForm" component={DisabilityForm}/>
							<Route path="/account" component={Account}/>
							<Route path="/logout" component={Logout}/>
							<Redirect to="/login"/>
						</Switch>
					</main>
				</Router>
			</Provider>
		</div>
	);
}

export default App;
