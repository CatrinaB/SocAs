import React, {useEffect} from "react";
import {connect} from "react-redux";
import useStyles from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import AssistantProfileCard from "../../components/AssistantProfileCard";
import DisabledProfileCard from "../../components/DisabledProfileCard";

const Profile = ({loadUser, ...props}) => {
    const classes = useStyles();

    useEffect(() => {
        loadUser();
    }, []);

    if (props.user.error !== null) {
        return <div>Errlr: {props.user.error}</div>
    }
    else if (props.user.loading === true) {
        return <CircularProgress/>
    } else if (props.user.accountType === "assistant"){
        return <AssistantProfileCard assistant={props.user.assistant}/>;
    } else {
        return <DisabledProfileCard disabled={props.user.disabled}/>;
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => {
            return dispatch(() => {
                console.log('Loading user');
            });
        },
    };
};

const mapStateToProps = state => {
    return {
        // user: {
        //     loading: state.otherProfile.loading,
        //     accountType: state.otherProfile.accountType,
        //     assistant: state.otherProfile.assistant,
        //     disabledPerson: state.otherProfile.disabledPerson
        // }
        user: {
            error: null,
            loading: false,
            loaded: true,
            accountType: 'assistant',
            assistant: {
                name: "Andreea Bunea",
                gender: "Female",
                employmentStatus: "Home Assistant at Carpatex",
                dob: "13.07.1998",
                experience: "Experience",
                experienceTime: "10 years",
                experienceType: ["Exp type 1","Exp type 2","Exp type 3",],
                disabilityExp: ["Dis exp1","Dis exp2","Dis exp3"],
                allotedTime: "5 years",
                helpType: ["help type 1","help type 2","help type 3"],
                reason: "No fuckin idea"
            },
            disabledPerson: {
                name: "Andreea Buna",
                gender: "Female",
                employmentStatus: "Unemployed",
                dob: "13.07.1998",
                disabilities: ["Probleme", "cu", "capul"],
                gravity: "Foarte grav",
                neededTime: "8 hrs",
                experienceWithStrangers: false,
                stateAid: true,
                helpType: "Help type",
                reason: "I need help .. ?"
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
