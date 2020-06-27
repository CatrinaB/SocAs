import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    commentContainer: {
        margin: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(2)
    },
    commentInput: {
        margin: theme.spacing(1)
    }
}));

export default useStyles;
