import React from "react";
import NavbarNoAuth from "./NavbarNoAuth";
import { connect } from "react-redux";
import NavbarAuth from "./NavbarAuth";

class Navbar extends React.Component {
	render() {
		return (
			<div>
				{this.props.token === null ? <NavbarNoAuth/> : <NavbarAuth/>}
			</div>
		);
	}
}

const mapStateToProps = state => {
	//console.log("State changed: ", state);
	return {
		token: state.signup.token
	};
};

export default connect(mapStateToProps)(Navbar);
