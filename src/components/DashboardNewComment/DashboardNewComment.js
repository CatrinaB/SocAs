import React, { useState } from "react";
import useStyles from "./styles";
import { TextField } from "@material-ui/core";
import { addComment } from "../../queries";

const DashboardNewComment = ({ rerenderParent }) => {
    const classes = useStyles();

    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            addComment(text);
            setText("");
            rerenderParent();
        }
    };

    return (
        <div className={classes.commentContainer}>
            <TextField
                className={classes.commentInput}
                label="Add comment..."
                // multiline
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default DashboardNewComment;
