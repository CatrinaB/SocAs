import React from "react";
import { updateToken, updateName, updateUserId, updateTokenExpiration } from "../../redux/actions/auth-actions";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
	render() {
		updateToken(null);
		updateName("");
		updateUserId(null);
		updateTokenExpiration(null)
		return (<Redirect to="/login"/>);
	}
}

export default Logout;
