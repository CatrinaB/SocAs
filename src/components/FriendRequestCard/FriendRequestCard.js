import React from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles";
import BlockIcon from "@material-ui/icons/Block";
import { useSelector } from "react-redux";
import { addFriend, removePending, removeReceivedPending } from "../../queries";

const FriendRequestCard = ({ fullName, pendingId }) => {
    const classes = useStyles();

    const userID = useSelector((state) => state.auth.userId);
    const userName = useSelector((state) => state.auth.name);

    const handleAddClick = () => {
        console.log("pending", pendingId);
        addFriend(userID, pendingId, fullName);
        addFriend(pendingId, userID, userName);
        removePending(pendingId, userID);
        removeReceivedPending(userID, pendingId);
    };

    return (
        <Paper className={classes.paperContainer}>
            <div className={classes.subPaper}>
                <Avatar className={classes.avatar} alt="Avatar image" src="" />
                <div className={classes.name}>{fullName}</div>
            </div>
            <div className={classes.subPaper}>
                <IconButton
                    color="secondary"
                    component="span"
                    onClick={handleAddClick}
                >
                    <AddIcon />
                </IconButton>
                <IconButton color="secondary" component="span">
                    <BlockIcon />
                </IconButton>
            </div>
        </Paper>
    );
};

export default FriendRequestCard;
