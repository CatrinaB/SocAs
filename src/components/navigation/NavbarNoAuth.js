import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { navStyles } from './nav-style';
import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../../App.css";



function NavbarNoAuth() {
	const classes = navStyles();

	return (
		<AppBar>
			<Toolbar>
    			<Typography variant="h6" className={classes.title}>
      				The Social Network
    			</Typography>
    			<Button component={Link}to="/login">
					Login
				</Button>
				<Button component={Link}to="/signup">
					Signup
				</Button>
  			</Toolbar>
		</AppBar>
	);
}

export default NavbarNoAuth;
