import { Redirect, Route } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import store from "../../redux/store";


const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => {
		const token = store.getState().auth.token;
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
