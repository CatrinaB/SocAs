import React from "react";
import useStyles from "./styles";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

const DisabledProfileCard = ({ disabled, ...props }) => {
    const classes = useStyles();

    return (
        <Container>
            <Paper className={classes.container}>
                <div className={classes.item}>
                    <Avatar />
                </div>
                <h1 className={classes.item}>
                    DISABLED
                </h1>
                <div className={classes.item}>
                    <strong>Name:</strong> {disabled.name || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Gender:</strong> {disabled.gender || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Date of birth:</strong> {disabled.dob || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Employment status:</strong> {disabled.employmentStatus || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Disabilities:</strong> {
                        disabled.disabilities.map((value, index) => {
                            return `${value} `;
                        })
                    }
                </div>
                <div className={classes.item}>
                    <strong>Gravity:</strong> {disabled.gravity || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Needed time:</strong> {disabled.neededTime || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Experienced with strangers:</strong> {disabled.experienceWithStrangers ? "Yes" : "No"}
                </div>

                <div className={classes.item}>
                    <strong>State aid:</strong> {disabled.stateAid ? "Yes" : "No"}
                </div>
                <div className={classes.item}>
                    <strong>Help type:</strong> {disabled.helpType || "N/A"}
                </div>
                <div className={classes.item}>
                    <strong>Reason:</strong> {disabled.reason || "N/A"}
                </div>
                <Button variant="contained" color="secondary">
                    Send friend request
                </Button>
            </Paper>
        </Container>
    );
};

export default DisabledProfileCard;
