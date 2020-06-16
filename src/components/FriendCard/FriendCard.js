import React from "react";
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './styles';
import BlockIcon from '@material-ui/icons/Block';

const FriendCard = ({ user }) => {
	const classes = useStyles();

	return (
		<Paper className={classes.paperContainer}>
			<div className={classes.subPaper}>
				<Avatar className={classes.avatar} alt="Avatar image" src={user.profileImageSource}/>
				<div className={classes.name}>{user.fullName}</div>
			</div>
			<div className={classes.subPaper}>
				<IconButton color="secondary" component="span">
					<AddIcon/>
				</IconButton>
				<IconButton color="secondary" component="span">
					<BlockIcon/>
				</IconButton>
			</div>
		</Paper>
	);
};

export default FriendCard;
