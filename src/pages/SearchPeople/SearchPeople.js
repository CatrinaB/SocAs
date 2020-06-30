import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { connect, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { Button, TextField, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { searchUsers } from "../../redux/actions/search-actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import SearchUserCard from "../../components/SearchUserCard";
import FriendRequestCard from "../../components/FriendRequestCard";
import { getPendingRequests } from "../../queries";

const SearchPeople = ({
    searchUsers,
    error,
    loading,
    loaded,
    users,
    ...props
}) => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [requests, setRequests] = useState();

    const userID = useSelector((state) => state.auth.userId);

    useEffect(() => {
        const fetchData = async () => {
            const pendingRequests = await getPendingRequests(userID);
            console.log(pendingRequests);
            setRequests(pendingRequests);
        };
        fetchData();
    }, []);

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
                        className={classes.searchTextField}
                        label="Email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onSearchClick}
                    >
                        Search users
                    </Button>
                </div>
                <div className={classes.resultsItem}>
                    {loading && <CircularProgress />}
                    {error && (
                        <Alert severity="warning">
                            Whoooooops: {props.error}
                        </Alert>
                    )}
                    {users &&
                        users.map((user, index) => {
                            return (
                                <SearchUserCard
                                    key={`searched_user${index}`}
                                    user={user}
                                />
                            );
                        })}
                </div>
            </Paper>
        </Container>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchUsers: (email) => {
            return dispatch(searchUsers(email));
        }
    };
};

const mapStateToProps = (state) => {
    return {
        error: state.searchUsers.error,
        loading: state.searchUsers.loading,
        loaded: state.searchUsers.loaded,
        users: state.searchUsers.users
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPeople);
