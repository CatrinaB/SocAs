import React from "react";
import Paper from "@material-ui/core/Paper";
import { Button, TextField } from "@material-ui/core";
import useStyles from './styles'

const DashboardPostCard = () => {
	const classes = useStyles();

	return (
		<Paper className={classes.paperContainer}>
			<TextField className={classes.textInput} label="What's on your mind?" multiline/>
			<Button className={classes.postButton} variant="contained" color="secondary">
				Post
			</Button>
		</Paper>
	)
};

export default DashboardPostCard;


