import { Redirect, Route } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";


const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => {
		const token = rest.token;
		return (
			token !== undefined && token != null
				? <Component {...props} />
				: <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>)
		}
	}/>
)

const mapStateToProps = state => {
	return {
		token: state.auth.token,
	};
};

export default connect(mapStateToProps)(PrivateRoute);
