import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import Login from "./components/auth/Login.js";
import SignupForm from "./components/auth/Signup";
import Dashboard from "./components/Dashboard";
import BackgroundImagePage from "./components/Background";
import AssistantForm from "./components/AssistantForm";
import DisabilityForm from "./components/DisabilityForm";
import Account from "./components/Account";

import "./App.css";
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@material-ui/core";
import Navbar from "./components/Navbar";

// const express = require('express');
// const bodyParser = require('body-parser');
// const graphqlHttp = require('express-graphql');

// const app = express();
// var value = 0;
// function changeTab(e) {
//     console.log(e.target);
// }

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    <div className="App">
                        {/* <AppBar position="fixed" elevation={0}>
                            <Tabs onChange={changeTab} value={value}>
                                <Tab label="Home" to="/" component={Link} />
                                <Tab
                                    label="Sign up"
                                    to="/signup"
                                    component={Link}
                                />
                            </Tabs>
                        </AppBar> */}
                        <Navbar />
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
                                    <Route
                                        path="/background"
                                        component={BackgroundImagePage}
                                    />
                                    <Route
                                        path="/assistantForm"
                                        component={AssistantForm}
                                    />
                                    <Route
                                        exact
                                        path="/disabilityForm"
                                        component={DisabilityForm}
                                    />
                                    <Route
                                        path="/account"
                                        component={Account}
                                    />
                                </Switch>
                            </div>
                        </div>
                        {/* <SignupForm /> */}
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
