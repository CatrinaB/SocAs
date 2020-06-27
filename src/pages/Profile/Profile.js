import React, { useEffect } from "react";
import { connect } from "react-redux";
import useStyles from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import AssistantProfileCard from "../../components/AssistantProfileCard";
import DisabledProfileCard from "../../components/DisabledProfileCard";
import { loadUser } from "../../redux/actions/user-actions";
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';

const Profile = ({ loadUser, ...props }) => {
    const classes = useStyles();

    useEffect(() => {
        loadUser(props.match.params.uid);
    }, []);

    console.log(props);

    if (props.error !== null) {
        return (
            <Container>
                <Alert severity="warning">
                    Whoooooops: {props.error}
                </Alert>
            </Container>
        );
    }
    if (props.loading === true) {
        return <CircularProgress />
    }
    if (props.loaded && props.accountType === "assistant") {
        return <AssistantProfileCard assistant={props.assistant} />;
    }
    if (props.loaded) {
        return <DisabledProfileCard disabled={props.disabled} />;
    }
    return <div>None</div>

};

const mapDispatchToProps = dispatch => {
    return {
        loadUser: (uid) => {
            return dispatch(loadUser(uid));
        },
    };
};

const mapStateToProps = state => {
    return {
        error: state.otherProfile.error,
        loading: state.otherProfile.loading,
        loaded: state.otherProfile.loaded,
        accountType: state.otherProfile.accountType,
        assistant: state.otherProfile.assistant,
        disabled: state.otherProfile.disabled
        // user: {
        //     error: null,
        //     loading: false,
        //     loaded: true,
        //     accountType: 'assistant',
        //     assistant: {
        //         name: "Andreea Bunea",
        //         gender: "Female",
        //         employmentStatus: "Home Assistant at Carpatex",
        //         dob: "13.07.1998",
        //         experience: "Experience",
        //         experienceTime: "10 years",
        //         experienceType: ["Exp type 1","Exp type 2","Exp type 3",],
        //         disabilityExp: ["Dis exp1","Dis exp2","Dis exp3"],
        //         allotedTime: "5 years",
        //         helpType: ["help type 1","help type 2","help type 3"],
        //         reason: "No fuckin idea"
        //     },
        //     disabled: {
        //         name: "Andreea Buna",
        //         gender: "Female",
        //         employmentStatus: "Unemployed",
        //         dob: "13.07.1998",
        //         disabilities: ["Probleme", "cu", "capul"],
        //         gravity: "Foarte grav",
        //         neededTime: "8 hrs",
        //         experienceWithStrangers: false,
        //         stateAid: true,
        //         helpType: "Help type",
        //         reason: "I need help .. ?"
        //     }
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
