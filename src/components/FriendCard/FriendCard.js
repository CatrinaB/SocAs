import React from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles";
import BlockIcon from "@material-ui/icons/Block";
import MessageIcon from "@material-ui/icons/Message";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const FriendCard = ({ fullName, friendId }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paperContainer}>
            <div className={classes.subPaper}>
                <Avatar className={classes.avatar} alt="Avatar image" />
                <div className={classes.name}>{fullName}</div>
            </div>
            <div className={classes.subPaper}>
                <IconButton color="secondary" component="span">
                    <MessageIcon />
                </IconButton>
                <IconButton color="secondary" component="span">
                    <DeleteForeverIcon />
                </IconButton>
            </div>
        </Paper>
    );
};

export default FriendCard;
