import React, { useState } from 'react';
import useStyles from './styles';
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { Button, TextField } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import { searchUsers } from "../../redux/actions/search-actions";
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

const SearchPeople = ({searchUsers, error, loading, loaded, users, ...props}) => {
    const classes = useStyles();
    const [email, setEmail] = useState("");


    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onSearchClick = (e) => {
        e.preventDefault();
        searchUsers(email);
    };

    return (
        <Container>
            <Paper className={classes.container}>
                <div className={classes.searchItem}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={onChangeEmail} />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onSearchClick}>
                        Send users by
                    </Button>
                </div>
                <div className={classes.resultsItem}>
                    {loading &&
                        <CircularProgress/>
                    }
                    {error &&
                        <Alert severity="warning">
                            Whoooooops: {props.error}
                        </Alert>
                    }
                    {/* {loaded && users &&
                        users.map((value, index) => {
                            return <div>{value}</div>;
                        })
                    } */}
                </div>
            </Paper>
        </Container>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        searchUsers: (email) => {
            return dispatch(searchUsers(email));
        },
    };
};

const mapStateToProps = state => {
    return {
        error: state.searchUsers.error,
        loading: state.searchUsers.loading,
        loaded: state.searchUsers.loaded,
        users: state.searchUsers.users
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchPeople);
