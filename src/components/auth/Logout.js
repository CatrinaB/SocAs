import React from "react";
import { updateToken } from "../../redux/actions/auth-actions";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
	render() {
		updateToken(null);
		return (<Redirect to="/login"/>);
	}
}

export default Logout;
