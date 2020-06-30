import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import AddCommentIcon from "@material-ui/icons/AddComment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useStyles from "./styles";
import DashboardComment from "../DashboardComment/DashboardComment";
import DashboardNewComment from "../DashboardNewComment";
// import { getAllCommentsFromPost } from "../../queries";
// import logger from "../../utils/logger";

const DashboardCard = ({
    postID,
    author,
    text,
    timePosted,
    comments,
    rerenderParent
}) => {
    const classes = useStyles();

    // const [commentsState, setCommentsState] = useState(comments);

    // logger.debug(commentsState);

    // useEffect(() => {
    //     setInterval(() => {
    //         let qresult = getAllCommentsFromPost(postID);
    //         setCommentsState(qresult);
    //     }, 1000);
    // }, [postID]);

    return (
        <Paper className={classes.paperContainer}>
            <div className={classes.postDetailsContainer}>
                <Avatar
                    className={classes.avatar}
                    alt="Avatar image"
                    src={
                        author.fullName === "Catrina Bodean"
                            ? "http://localhost:3000/avatars/u3.jpg"
                            : "http://localhost:3000/avatars/u1.jpg"
                    }
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
            <DashboardNewComment
                postID={postID}
                rerenderParent={rerenderParent}
            />
        </Paper>
    );
};

export default DashboardCard;
