import React from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import AddCommentIcon from "@material-ui/icons/AddComment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useStyles from "./styles";
import DashboardComment from "../DashboardComment/DashboardComment";

const DashboardCard = ({ author, text, timePosted, comments }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paperContainer}>
            <div className={classes.postDetailsContainer}>
                <Avatar
                    className={classes.avatar}
                    alt="Avatar image"
                    src={author.profileImageSource}
                />
                <div className={classes.name}>
                    <strong>{author.fullName}</strong>
                </div>
                <div className={classes.date}>{timePosted}</div>
            </div>
            <div className={classes.content}>{text}</div>
            <div className={classes.buttonsContainer}>
                <IconButton color="secondary" component="span">
                    <FavoriteIcon />
                </IconButton>
                <IconButton color="secondary" component="span">
                    <AddCommentIcon />
                </IconButton>
            </div>
            {comments && (
                <div>
                    {comments.map((comment, i) => {
                        return <DashboardComment comment={comment} />;
                    })}
                </div>
            )}
        </Paper>
    );
};

export default DashboardCard;
