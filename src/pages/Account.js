import React from "react";
import store from "../redux/store";
import { Redirect } from "react-router-dom";


class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: ""
		};
	}

	render() {
		if (!store.getState().auth.token) {
			return (<Redirect to="/login"/>);
		}

		return (<div>Account page</div>);
	}
}

export default Account;
