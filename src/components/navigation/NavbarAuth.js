import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../../App.css";
import { navStyles } from './nav-style';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


function NavbarAuth() {
	const styles = navStyles();

	return (
		<AppBar position="static">
			<Toolbar>
				<Button component={Link} to="/dashboard">
					Dashboard
				</Button>
    			<Typography variant="h6" className={styles.title}>
      				The Social Network
    			</Typography>
				<Button component={Link} to="/account">
					Account
				</Button>
				<Button component={Link} to="/logout">
					Logout
				</Button>
  			</Toolbar>
		</AppBar>
	);
}

export default NavbarAuth;
