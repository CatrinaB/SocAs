import React from "react";
// import store from "./store";
// import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

// import Login from "./components/auth/Login.js";
// import SignupForm from "./components/auth/Signup";
// import Dashboard from "./components/Dashboard";
// import BackgroundImagePage from "./components/Background";
// import AssistantForm from "./components/AssistantForm";
// import DisabilityForm from "./components/DisabilityForm";

import "../App.css";
// import { AppBar, Toolbar, Typography, Tabs, Tab } from "@material-ui/core";
// import { connect } from "mongoose";

// const express = require('express');
// const bodyParser = require('body-parser');
// const graphqlHttp = require('express-graphql');

// const app = express();
// var value = 0;
// function changeTab(e) {
//     console.log(e.target);
// }

function NavbarNoAuth() {
    return (
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
                            <Link className="nav-link" to={"/signup"}>
                                Sign up
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                to={"/assistantForm"}
                                            >
                                                Assistant Form
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                to={"/disabilityForm"}
                                            >
                                                Disability Form
                                            </Link>
                                        </li> */}
                    </ul>
                </div>
            </div>
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
        </nav>
    );
    // app.use(bodyParser.json());
    // app.get('/', (req, res, next) => {
    // 	res.send('Hello world!');
    // })
}

// app.listen(3000);

export default NavbarNoAuth;
