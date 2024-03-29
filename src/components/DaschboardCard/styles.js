import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paperContainer: {
        margin: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(2)
    },
    postDetailsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: theme.spacing(1)
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "flex-end",
        margin: theme.spacing(1)
    },
    name: {
        fontSize: "20px",
        margin: theme.spacing(1)
    },
    date: {
        margin: theme.spacing(1)
    },
    content: {
        margin: theme.spacing(3),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        overflow: "hidden",
        wordWrap: "break-word"
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6)
    }
}));

export default useStyles;
