import React from "react";
import { Button, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import RadioMenu from "./options/RadioMenu";
import CheckboxMenu from "./options/CheckboxMenu";

const FORM_ITEMS_MARGIN = "10px";

class AssistantAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasExperience: false,
            name: "",
            email: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const request = {
            query: `
                query {
                    getAssistant(userId: "${this.props.userId}") {
						name
						gender
						dob
						experience
                    }
                    getUser {
                    	email
                    }
                }
            `
        };
        fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json",
                Authorization: this.props.token
            }
        })
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log(
                        `Error response for assistant retrieve: ${JSON.stringify(
                            res.body,
                            null,
                            2
                        )}`
                    );
                    throw new Error("Something went wrong!");
                }
                return res.json();
            })
            .then((resData) => {
                if (resData.errors && resData.errors.length > 0) {
                    let alertMessage = "";
                    for (let error in resData.errors) {
                        alertMessage += resData.errors[error].message + "\n";
                    }
                    throw new Error(alertMessage);
                } else {
                    const assistant = resData.data.getAssistant;
                    const user = resData.data.getUser;

                    console.log("assistant is ", assistant);
                    this.setState({
                        name: assistant.name,
                        email: user.email,
                        gender: assistant.gender,
                        dob: assistant.dob
                    });
                }
            })
            .catch((err) => {
                console.log(err.message);
                this.setState({
                    ...this.state,
                    loginError: true,
                    loginErrorMessage: err.message
                });
            });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    spaceBetween: "20px"
                }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: FORM_ITEMS_MARGIN }}
                    startIcon={<EmojiPeopleIcon />}
                >
                    Update details
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: FORM_ITEMS_MARGIN }}
                    startIcon={<DeleteIcon />}
                >
                    Delete account
                </Button>
                <Avatar
                    alt="Sexy profile picture"
                    src="http://localhost:3000/avatar.png"
                    style={{ margin: FORM_ITEMS_MARGIN }}
                />
                <TextField
                    value={this.state.email}
                    id="email"
                    label="E-mail"
                    style={{ margin: FORM_ITEMS_MARGIN }}
                />
                <TextField
                    value={this.state.name}
                    id="name"
                    label="Name"
                    style={{ margin: FORM_ITEMS_MARGIN }}
                />
                <FormControl style={{ margin: FORM_ITEMS_MARGIN }}>
                    <InputLabel>Gender</InputLabel>
                    <Select id="gender" defaultValue={this.state.gender}>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    <FormHelperText>Helper text</FormHelperText>
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        style={{ margin: FORM_ITEMS_MARGIN }}
                        value={this.state.dob}
                    ></KeyboardDatePicker>
                </MuiPickersUtilsProvider>
                {this.props.isAssistant ? (
                    <>
                        <h3 style={{ margin: FORM_ITEMS_MARGIN }}>
                            Assistant details
                        </h3>
                        <RadioMenu
                            style={{ margin: FORM_ITEMS_MARGIN }}
                            formLabelComponent="label"
                            required={true}
                            formLabelText="Status"
                            radioGroupAriaLabel="status"
                            radioGroupName="status"
                            menuItems={[
                                {
                                    value: "pupil",
                                    color: "primary",
                                    label: "Pupil",
                                    labelPlacement: "end"
                                },
                                {
                                    value: "student",
                                    color: "primary",
                                    label: "Student",
                                    labelPlacement: "end"
                                },
                                {
                                    value: "employed",
                                    color: "primary",
                                    label: "Employed",
                                    labelPlacement: "end"
                                },
                                {
                                    value: "unemployed",
                                    color: "primary",
                                    label: "Unemployed",
                                    labelPlacement: "end"
                                },
                                {
                                    value: "retired",
                                    color: "primary",
                                    label: "Retired",
                                    labelPlacement: "end"
                                },
                                {
                                    value: "other",
                                    color: "primary",
                                    label: (
                                        <div
                                            style={{
                                                marginTop: "10px"
                                            }}
                                        >
                                            Other:{" "}
                                            <TextField name="status-other" />
                                        </div>
                                    ),
                                    labelPlacement: "end"
                                }
                            ]}
                        />
                        <RadioMenu
                            formLabelComponent="label"
                            required={true}
                            formLabelText="Do you have any experience working with disabled people?"
                            radioGroupAriaLabel="has-experience" // original code has "required" at RadioGroup too
                            radioGroupName="hasExperience"
                            radioGroupValue={this.state.hasExperience}
                            radioGroupOnChange={this.handleChange}
                            menuItems={[
                                {
                                    value: true,
                                    color: "primary",
                                    label: "Yes"
                                },
                                {
                                    value: false,
                                    color: "primary",
                                    label: "No"
                                }
                            ]}
                        />

                        {this.state.hasExperience !== "true" ? (
                            <br />
                        ) : (
                            <div>
                                <RadioMenu
                                    formLabelComponent="label"
                                    required={true}
                                    formLabelText="How long have you worked with disabled people?"
                                    radioGroupAriaLabel="time-experience"
                                    radioGroupName="timeExperience"
                                    menuItems={[
                                        {
                                            value: "1",
                                            color: "primary",
                                            label: "<1 year"
                                        },
                                        {
                                            value: "3",
                                            color: "primary",
                                            label: "1-3 years"
                                        },
                                        {
                                            value: "5",
                                            color: "primary",
                                            label: ">5 years"
                                        }
                                    ]}
                                />

                                <CheckboxMenu
                                    formLabelComponent="label"
                                    formLabelText="With what types of disabilities have you worked?"
                                    onChange={this.handleChange}
                                    menuItems={[
                                        {
                                            checked: this.state.checkedMotor,
                                            name: "motor",
                                            color: "primary",
                                            label: "Motor disabilities"
                                        },
                                        {
                                            checked: this.state.checkedAuditory,
                                            name: "auditory",
                                            color: "primary",
                                            label: "Auditory disabilities"
                                        },
                                        {
                                            checked: this.state.checkedVision,
                                            name: "vision",
                                            color: "primary",
                                            label: "Vision disabilities"
                                        },
                                        {
                                            checked: this.state.checkedMental,
                                            name: "mental",
                                            color: "primary",
                                            label: "Mental disabilities"
                                        }
                                    ]}
                                />

                                <CheckboxMenu
                                    formLabelComponent="label"
                                    formLabelText="How did you help the person/people you worked with?"
                                    menuItems={[
                                        {
                                            checked: this.state
                                                .checkedSchoolworkExp,
                                            name: "schoolworkExp",
                                            color: "primary",
                                            label: "Schoolwork"
                                        },
                                        {
                                            checked: this.state
                                                .checkedOccasionalExp,
                                            name: "occasionalExp",
                                            color: "primary",
                                            label: "Occasional assistance"
                                        },
                                        {
                                            checked: this.state
                                                .checkedPermanentExp,
                                            name: "permanentExp",
                                            color: "primary",
                                            label: "Permanent assistance"
                                        }
                                    ]}
                                />
                            </div>
                        )}
                        <CheckboxMenu
                            formLabelComponent="label"
                            formLabelText="How would you like to help people?"
                            onChange={this.handleChange}
                            menuItems={[
                                {
                                    checked: this.state.checkedSchoolwork,
                                    name: "schoolwork",
                                    color: "primary",
                                    label: "Schoolwork"
                                },
                                {
                                    checked: this.state.checkedOccasional,
                                    name: "occasional",
                                    color: "primary",
                                    label: "Occasional assistance"
                                },
                                {
                                    checked: this.state.checkedPermanentExp,
                                    name: "permanent",
                                    color: "primary",
                                    label: "Permanent assistance"
                                }
                            ]}
                        />
                    </>
                ) : (
                    <h3>To be done</h3>
                )}
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: FORM_ITEMS_MARGIN }}
                    startIcon={<EmojiPeopleIcon />}
                >
                    Update details
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: FORM_ITEMS_MARGIN }}
                    startIcon={<DeleteIcon />}
                >
                    Delete account
                </Button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAssistant: true,
		token: state.auth.token,
		userId: state.auth.userId
    };
};

export default connect(mapStateToProps)(AssistantAccount);
