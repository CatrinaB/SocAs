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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
