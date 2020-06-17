import React from "react";
import useStyles from "./styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import BlockIcon from "@material-ui/icons/Block";
import Button from "@material-ui/core/Button";

const RecommendationCard = ({user}) => {
	const classes = useStyles();

	return (
		<Paper className={classes.paperContainer} elevation={0} variant="outlined">
			<div className={classes.subPaper}>
				<Avatar className={classes.avatar} alt="Avatar image" src={user.profileImageSource}/>
				<div className={classes.name}>{user.fullName}</div>
			</div>
			<div className={classes.subPaper}>
				<Button color="secondary" variant="outlined">
					Send Friend Request
				</Button>
			</div>
		</Paper>
	);
};

export default RecommendationCard;
