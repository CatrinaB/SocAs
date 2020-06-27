import React from 'react';
import useStyles from './styles';
import Paper from "@material-ui/core/Paper";
import { Button, TextField } from "@material-ui/core";
import Container from '@material-ui/core/Container';

const SearchPeople = () => {
    const classes = useStyles();

    return (
        <Container>
            <Paper className={classes.container}>
                <div className={classes.searchItem}>
                    <TextField />
                    <Button variant="contained" color="secondary">
                        Send users by
                    </Button>
                </div>
                <div className={classes.resultsItem}>

                </div>
            </Paper>
        </Container>
    )
};

export default SearchPeople;
