import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { Button, TextField } from "@material-ui/core";
import useStyles from "./styles";
import { createPost } from "../../queries";
import { useSelector } from "react-redux";

const DashboardPostCard = () => {
    const classes = useStyles();

	const [text, setText] = useState("");
	
	const userID = useSelector(state => state.auth.userId);
	const userName = useSelector(state => state.auth.name);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleCreateNewPost = () => {
        let newText = text.replace(/[\n\r]/g, "");
        createPost(userID, userName, newText);
    };

    return (
        <Paper className={classes.paperContainer}>
            <TextField
                className={classes.textInput}
                label="What's on your mind?"
                multiline
                value={text}
                onChange={handleChange}
            />
            <Button
                className={classes.postButton}
                variant="contained"
                color="secondary"
                onClick={handleCreateNewPost}
            >
                Post
            </Button>
        </Paper>
    );
};

export default DashboardPostCard;
