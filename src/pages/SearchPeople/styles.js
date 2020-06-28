import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    searchItem: {
        display: 'flex',
        direction: 'row',
        padding: theme.spacing(2),
        justifyContent: 'space-between'
    },
    searchTextField: {
        flexGrow: 1,
        marginRight: theme.spacing(2)
    },
    resultsItem: {

    }
}));

export default useStyles;