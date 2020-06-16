import React from "react";
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddCommentIcon from '@material-ui/icons/AddComment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import useStyles from './styles';

const DashboardCard = ({ user, content, date }) => {
	const classes = useStyles();

	return (
		<Paper className={classes.paperContainer}>
			<div className={classes.postDetailsContainer}>
				<Avatar className={classes.avatar} alt="Avatar image" src={user.profileImageSource}/>
				<div className={classes.name}>{user.fullName}</div>
				<div className={classes.date}>{date}</div>
			</div>
			<div className={classes.content}>{content}</div>
			<div className={classes.buttonsContainer}>
				<IconButton color="secondary" component="span">
					<FavoriteIcon/>
				</IconButton>
				<IconButton color="secondary" component="span">
					<AddCommentIcon/>
				</IconButton>
			</div>
		</Paper>
	)
};

export default DashboardCard;
