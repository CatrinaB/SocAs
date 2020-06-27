import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column'
    },
    item: {
        margin: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center'
    }
}));

export default useStyles;
