import React from "react";
import useStyles from "./styles";
import Avatar from '@material-ui/core/Avatar';

const DashboardComment = ({comment}) => {
	const classes = useStyles();

	return (
		<div className={classes.commentContainer}>
			<div className={classes.commentDetailsContainer}>
				<Avatar className={classes.avatar} alt="Avatar image" src={comment.user.profileImageSource}/>
				<div className={classes.name}><strong>{comment.user.fullName}</strong></div>
				<div className={classes.date}>{comment.date}</div>
			</div>
			<div>{comment.comment}</div>
		</div>
	);
};

export default DashboardComment;
