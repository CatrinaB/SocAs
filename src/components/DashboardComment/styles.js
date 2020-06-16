import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	commentContainer: {
		margin: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: theme.spacing(2),
	},
	avatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
	},
	commentDetailsContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		margin: theme.spacing(1)
	},
	name: {
		paddingLeft: theme.spacing(2)
	},
	date: {
		paddingLeft: theme.spacing(1)
	}
}));

export default useStyles;
