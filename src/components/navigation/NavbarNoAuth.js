import React from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../../App.css";

function NavbarNoAuth() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light fixed-top">
			<div className="container">
				<NavLink className="navbar-brand" to={"/"}>
					Home
				</NavLink>
				<div
					className="collapse navbar-collapse"
					id="navbarTogglerDemo02">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<NavLink className="nav-link" to="/">
								Login
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/signup">
								Sign up
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default NavbarNoAuth;
