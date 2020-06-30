import React, { useState, useEffect } from "react";
// import useStyles from "./styles";
import { connect, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { Button, TextField, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { searchUsers } from "../redux/actions/search-actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { getPendingRequests } from "../queries";
import FriendCard from "../components/FriendCard";
import { getFriends, addFriend } from "../queries";
import FriendRequestCard from "../components/FriendRequestCard";

const Friends = () => {
    const [friends, setFriends] = useState();
    const [requests, setRequests] = useState();

    const userID = useSelector((state) => state.auth.userId);

    useEffect(() => {
        const fetchData = async () => {
            const existingFriends = await getFriends(userID);
            setFriends(existingFriends);
            const pendingRequests = await getPendingRequests(userID);
            setRequests(pendingRequests);
        };
        fetchData();
    }, []);

    return (
        <div>
            {console.log("me,", userID)}
            <Paper>
                <Typography variant="h4">Friend requests</Typography>

                {requests &&
                    (requests.length !== 0 ? (
                        requests.map((req) => {
                            return (
                                <FriendRequestCard
                                    fullName={req.pendingName}
                                    pendingId={req.pendingId}
                                />
                            );
                        })
                    ) : (
                        <div>
                            <br />
                            <Typography>
                                There are no friend requests for now!
                            </Typography>
                        </div>
                    ))}
            </Paper>
            <Paper>
                <Typography variant="h4">Friends</Typography>
                {friends &&
                    (friends.length !== 0 ? (
                        friends.map(
                            (el) =>
                                el && <FriendCard fullName={el.friendName} />
                        )
                    ) : (
                        <div>
                            <br />
                            <Typography>You have no friends yet</Typography>
                        </div>
                    ))}
            </Paper>
        </div>
    );
};

export default Friends;
