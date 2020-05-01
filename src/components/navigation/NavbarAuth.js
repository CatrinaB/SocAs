import React from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../../App.css";

function NavbarAuth() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light fixed-top">
			<div className="container">
				<NavLink className="navbar-brand" to="/dashboard">
					Home
				</NavLink>
				<div className="collapse navbar-collapse"
					 id="navbarTogglerDemo02">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<NavLink className="nav-link" to="/account">
								Account
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/logout">
								Logout
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default NavbarAuth;
