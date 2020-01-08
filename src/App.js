import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import Login from "./components/auth/Login.js";
import SignupForm from "./components/auth/Signup";
import Dashboard from "./components/Dashboard";

import "./App.css";

// const express = require('express');
// const bodyParser = require('body-parser');
// const graphqlHttp = require('express-graphql');

// const app = express();

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                            <div className="container">
                                <Link className="navbar-brand" to={"/"}>
                                    Home
                                </Link>
                                <div
                                    className="collapse navbar-collapse"
                                    id="navbarTogglerDemo02"
                                >
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/"}>
                                                Login
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                to={"/signup"}
                                            >
                                                Sign up
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div className="auth-wrapper">
                            <div className="auth-inner">
                                <Switch>
                                    <Route exact path="/" component={Login} />
                                    <Route
                                        exact
                                        path="/signup"
                                        component={SignupForm}
                                    />
                                    <Route
                                        path="/dashboard"
                                        component={Dashboard}
                                    />
                                </Switch>
                            </div>
                        </div>
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
