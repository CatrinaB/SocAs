import React, { useState } from "react";
import {useSelector} from "react-redux"
import useStyles from "./styles";
import { TextField } from "@material-ui/core";
import { addComment } from "../../queries";
import logger from "../../utils/logger";

const DashboardNewComment = ({ postID, rerenderParent }) => {
    const classes = useStyles();

	const [text, setText] = useState("");
	
	const userID = useSelector(state => state.auth.userId);
	const userName = useSelector(state => state.auth.name);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            let newText = text.replace(/[\n\r]/g, "");
            addComment(postID, userID, userName, newText);
            setText("");
            rerenderParent();
        }
    };

    return (
        <div className={classes.commentContainer}>
            <TextField
                className={classes.commentInput}
                label="Add comment..."
                multiline
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default DashboardNewComment;
