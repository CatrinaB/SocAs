import React from "react";
import { TextField, Avatar } from "@material-ui/core";

class Dashboard extends React.Component {
    render() {
        return (
            <div
                style={{
                    marginTop: "100px",
                    width: "100%",
                    textAlign: "center"
                }}
            >
                <Avatar variant="square" style={{ marginLeft: "760px" }}>
                    YN
                </Avatar>
                <TextField
                    id="post-textarea"
                    label=""
                    placeholder="Share your thoughts!"
                    multiline
                    // rows="4"
                    style={{
                        border: "1px solid lightgrey",
                        borderRadius: "0px 5px",
                        width: "300px"
                    }}
                />
            </div>
        );
    }
}

export default Dashboard;
