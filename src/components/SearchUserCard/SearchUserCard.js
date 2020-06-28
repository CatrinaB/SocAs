import React from "react";
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './styles';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import { useHistory } from "react-router";

const SearchUserCard = ({user, ...props}) => {
    const classes = useStyles();
    const history = useHistory();

    const goToProfilePage = () => {
        history.push(`/profile/${user._id}`);
    }

	return (
		<Paper className={classes.paperContainer}>
			<div className={classes.subPaper}>
				<Avatar className={classes.avatar} alt="Avatar image" src={user.profileImageSource}/>
				<div className={classes.name}>{user.email}</div>
			</div>
			<div className={classes.subPaper}>
				<IconButton color="secondary" component="span" onClick={goToProfilePage}>
					<RecentActorsIcon/>
				</IconButton>
			</div>
        </Paper>
	);
};

export default SearchUserCard;
