import { Redirect, Route } from "react-router-dom";
import React from "react";

export const RequireAuth = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		localStorage.getItem('user')
			? <Component {...props} />
			: <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
	)}/>
)
