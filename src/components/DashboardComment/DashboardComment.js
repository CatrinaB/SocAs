import React from "react";
import useStyles from "./styles";
import Avatar from "@material-ui/core/Avatar";

const DashboardComment = ({ comment }) => {
    const classes = useStyles();

    return (
        <div className={classes.commentContainer}>
            <div className={classes.commentDetailsContainer}>
                <Avatar
                    className={classes.avatar}
                    alt="Avatar image"
                    src="http://localhost:3000/avatars/u3.jpg"
                />
                <div className={classes.name}>
                    <strong>{comment.authorName}</strong>
                </div>
                <div className={classes.date}>{comment.timeCommented}</div>
            </div>
            <div>{comment.text}</div>
        </div>
    );
};

export default DashboardComment;
