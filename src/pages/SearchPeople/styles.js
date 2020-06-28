import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        direction: 'row'
    },
    searchItem: {
        display: 'flex',
        direction: 'column',
        padding: theme.spacing(1)
    },
    resultsItem: {

    }
}));

export default useStyles;