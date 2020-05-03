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
	const styles = navStyles();

	return (
		<AppBar position="static" color="primary">
			<Toolbar>
    			<Typography variant="h6" className={styles.title}>
      				The Social Network
    			</Typography>
    			<Button variant="contained" color="secondary" component={Link} to="/login" className={styles.menuButton}>
					Login
				</Button>
				<Button variant="contained" color="secondary" component={Link} to="/signup" className={styles.menuButton}>
					Signup
				</Button>
  			</Toolbar>
		</AppBar>
	);
}

export default NavbarNoAuth;
