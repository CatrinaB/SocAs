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
				<Typography variant="h6" className={styles.title}>
					The Social Network
				</Typography>
				<Link style={{ textDecoration: 'none', color: 'white' }} to="/dashboard">
					<Button variant="contained" color="secondary" className={styles.menuButton}>
						Dashboard
					</Button>
				</Link>
				<Link style={{ textDecoration: 'none', color: 'white' }} to="/account">
					<Button variant="contained" color="secondary" className={styles.menuButton}>
						Account
					</Button>
				</Link>
				<Link style={{ textDecoration: 'none', color: 'white' }} to="/logout">
					<Button variant="contained" color="secondary" className={styles.menuButton}>
						Logout
					</Button>
				</Link>
			</Toolbar>
		</AppBar>
	);
}

export default NavbarAuth;
