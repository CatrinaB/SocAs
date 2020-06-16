import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	paperContainer: {
		margin: theme.spacing(2),
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	postButton: {
		margin: theme.spacing(1)
	},
	textInput: {
		margin: theme.spacing(1)
	}
}));

export default useStyles;
