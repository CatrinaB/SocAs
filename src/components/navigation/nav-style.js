import { makeStyles } from '@material-ui/core/styles';

export const navStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
		textAlign: 'left',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
}));
