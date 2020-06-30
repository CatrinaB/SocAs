import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import {
    isFriend,
    isPending,
    addPending,
    addReceivedRequest
} from "../../queries";
import { Typography } from "@material-ui/core";

const AssistantProfileCard = ({ assistant, ...props }) => {
    const classes = useStyles();

    const userID = useSelector((state) => state.auth.userId);
    const userName = useSelector((state) => state.auth.name);
    const friendID = useSelector((state) => state.otherProfile.profileId);
    const friendName = useSelector(
        (state) => state.otherProfile.assistant.name
    );

    const [friend, setFriend] = useState(false);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const friend = await isFriend(userID, friendID);
            setFriend(friend);

            const pending = await isPending(userID, friendID);
            setPending(pending);
        };

        fetchData();
    }, []);

    const handleClick = () => {
        addPending(userID, friendID, friendName);
        addReceivedRequest(friendID, userID, userName);
        setPending(true);
    };

    return (
        <Container>
            <Paper className={classes.container}>
                <div className={classes.item}>
                    <Avatar />
                </div>
                <h1 className={classes.item}>ASSISTANT</h1>
                <div className={classes.item}>
                    <strong>Name: </strong> {assistant.name || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Gender: </strong> {assistant.gender || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Date of birth: </strong> {assistant.dob || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Experience: </strong>{" "}
                    {assistant.experience || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Experience time: </strong>{" "}
                    {assistant.experienceTime || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Experience type: </strong>{" "}
                    {assistant.experienceType &&
                    assistant.experienceType.length > 0
                        ? assistant.experienceType.map((value, index) => {
                              return `${value} `;
                          })
                        : "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Disability experience: </strong>{" "}
                    {assistant.disabilityExp &&
                    assistant.disabilityExp.length > 0
                        ? assistant.disabilityExp.map((value, index) => {
                              return `${value} `;
                          })
                        : "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Alloted time: </strong>{" "}
                    {assistant.allotedTime || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Help type: </strong>{" "}
                    {assistant.helpType && assistant.helpType.length > 0
                        ? assistant.helpType.map((value, index) => {
                              return `${value} `;
                          })
                        : "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Reason: </strong> {assistant.reason || "N/A"}
                </div>
                {pending ? (
                    <Typography
                        variant="button"
                        style={{ fontSize: "20px", border: "1px solid grey" }}
                    >
                        Friend request pending...
                    </Typography>
                ) : friend ? (
                    <Button variant="outlined" color="secondary">
                        Remove friend
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClick}
                    >
                        Send friend request
                    </Button>
                )}
            </Paper>
        </Container>
    );
};

export default AssistantProfileCard;
