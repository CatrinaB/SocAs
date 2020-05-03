import React from "react";
import NavbarNoAuth from "./NavbarNoAuth";
import { connect } from "react-redux";
import NavbarAuth from "./NavbarAuth";
import { navStyles } from './nav-style';

class Navbar extends React.Component {
	render() {

		return (
			<div className={navStyles.root}>
				{this.props.token === null ? <NavbarNoAuth/> : <NavbarAuth/>}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token
	};
};

export default connect(mapStateToProps)(Navbar);
