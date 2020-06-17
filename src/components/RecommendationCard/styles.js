import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	paperContainer: {
		margin: theme.spacing(2),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: theme.spacing(2),
	},
	name: {
		fontSize: '20px',
		margin: theme.spacing(1),
		paddingLeft: theme.spacing(2)
	},
	avatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
	},
	subPaper: {
		display: 'flex',
		flexDirection: 'row',
	}
}));

export default useStyles;
