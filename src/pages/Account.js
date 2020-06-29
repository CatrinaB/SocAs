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
import RadioMenu from "../components/options/RadioMenu";
import CheckboxMenu from "../components/options/CheckboxMenu";

const FORM_ITEMS_MARGIN = "10px";

class Account extends React.Component {
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
        var request;
        this.props.isAssistant
            ? (request = {
                  query: `
                query {
                    getAssistant(userId: "${this.props.userId}") {
						name
						gender
						dob
						experience
                    }
                    getUser(userId: "${this.props.userId}") {
                    	email
                    }
                }
            `
              })
            : (request = {
                  query: `
                query {
                    getDisabled(userId: "${this.props.userID}") {
						name
						gender
						dob
						status
                    }
                    getUser {
                    	email
                    }
                }`
              });
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
                        dob: assistant.dob,
                        status: assistant.status
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div style={{ width: "40%" }}>
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
                            <Select
                                id="gender"
                                defaultValue={this.state.gender}
                            >
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
                        {this.props.isAssistant ? (
                            <>
                                <h3 style={{ margin: FORM_ITEMS_MARGIN }}>
                                    Assistant details
                                </h3>

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
                                                    checked: this.state
                                                        .checkedMotor,
                                                    name: "motor",
                                                    color: "primary",
                                                    label: "Motor disabilities"
                                                },
                                                {
                                                    checked: this.state
                                                        .checkedAuditory,
                                                    name: "auditory",
                                                    color: "primary",
                                                    label:
                                                        "Auditory disabilities"
                                                },
                                                {
                                                    checked: this.state
                                                        .checkedVision,
                                                    name: "vision",
                                                    color: "primary",
                                                    label: "Vision disabilities"
                                                },
                                                {
                                                    checked: this.state
                                                        .checkedMental,
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
                                                    label:
                                                        "Occasional assistance"
                                                },
                                                {
                                                    checked: this.state
                                                        .checkedPermanentExp,
                                                    name: "permanentExp",
                                                    color: "primary",
                                                    label:
                                                        "Permanent assistance"
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
                                            checked: this.state
                                                .checkedSchoolwork,
                                            name: "schoolwork",
                                            color: "primary",
                                            label: "Schoolwork"
                                        },
                                        {
                                            checked: this.state
                                                .checkedOccasional,
                                            name: "occasional",
                                            color: "primary",
                                            label: "Occasional assistance"
                                        },
                                        {
                                            checked: this.state
                                                .checkedPermanentExp,
                                            name: "permanent",
                                            color: "primary",
                                            label: "Permanent assistance"
                                        }
                                    ]}
                                />
                            </>
                        ) : (
                            <>
                                <CheckboxMenu
                                    formLabelComponent="label"
                                    formLabelText="What types of disability or disabilities do you have?"
                                    required
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

                                <RadioMenu
                                    formLabelComponent="label"
                                    required={true}
                                    formLabelText="How seriously does your disability impact your life?"
                                    radioGroupAriaLabel="seriousness"
                                    radioGroupName="seriousness"
                                    radioGroupValue={this.state.seriousness}
                                    radioGroupOnChange={this.handleChange}
                                    // prettier-ignore
                                    menuItems={[
								{value: "1", color: "primary", label: "It has very little impact, I can do (almost) everything on my own"},
								{value: "2", color: "primary", label: "It has some impact, there are a few activities I need assistance with"},
								{value: "3", color: "primary", label: "It has a signicative impact, "},
								{value: "4", color: "primary", label: "There are a few things I can do by myself, but most of the time I need assistance"},
								{value: "5", color: "primary", label: "It impacts every aspect of my life, I need assistance for (almost) every activity"}
							]}
                                />

                                <RadioMenu
                                    formLabelComponent="label"
                                    required={true}
                                    formLabelText="How much assistance would you need on a daily basis?"
                                    radioGroupAriaLabel="time-assistance"
                                    radioGroupName="timeAssistance"
                                    radioGroupValue={this.state.timeAssistance}
                                    radioGroupOnChange={this.handleChange}
                                    // prettier-ignore
                                    menuItems={[
								{value: "1", color: "primary", label: "less than 1 hour"},
								{value: "2", color: "primary", label: "1-2 hours"},
								{value: "4", color: "primary", label: "3-4 hours"},
								{value: "8", color: "primary", label: "5-8 hours"},
								{value: "11", color: "primary", label: "9-11 hours"},
								{value: "15", color: "primary", label: "12-15 hours"},
								{value: "19", color: "primary", label: "16-19 hours"},
								{value: "24", color: "primary", label: "20-24 hours"}
							]}
                                />

                                <RadioMenu
                                    formLabelComponent="label"
                                    required={true}
                                    formLabelText="Do you have experience with strangers helping you out?"
                                    radioGroupAriaLabel="strangers-experience"
                                    radioGroupName="strangersExperience"
                                    radioGroupValue={
                                        this.state.strangersExperience
                                    }
                                    radioGroupOnChange={this.handleChange}
                                    // prettier-ignore
                                    menuItems={[
								{value: "no-alone", color: "primary", label: "No, I usually do things myself"},
								{value: "no", color: "primary", label: "No, only my family and friends have assisted me until now"},
								{value: "yes", color: "primary", label: "Yes, I have been assisted by strangers before"}
							]}
                                />

                                <RadioMenu
                                    formLabelComponent="label"
                                    required={true}
                                    formLabelText="Do you receive any kind of state aid?"
                                    radioGroupAriaLabel="state-aid"
                                    radioGroupName="stateAid"
                                    radioGroupValue={this.state.stateAid}
                                    radioGroupOnChange={this.handleChange}
                                    // prettier-ignore
                                    menuItems={[
								{value: "yes", color: "primary", label: "Yes"},
								{value: "no", color: "primary", label: "No"}
							]}
                                />

                                <CheckboxMenu
                                    formLabelComponent="label"
                                    formLabelText="What kind of assistance do you need?"
                                    onChange={this.handleChange}
                                    menuItems={[
                                        {
                                            checked: this.state
                                                .checkedSchoolwork,
                                            name: "schoolwork",
                                            color: "primary",
                                            label: "Schoolwork"
                                        },
                                        {
                                            checked: this.state
                                                .checkedOccasional,
                                            name: "occasional",
                                            color: "primary",
                                            label: "Occasional assistance"
                                        },
                                        {
                                            checked: this.state
                                                .checkedPermanentExp,
                                            name: "permanent",
                                            color: "primary",
                                            label: "Permanent assistance"
                                        }
                                    ]}
                                />
                            </>
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAssistant: state.auth.userType === "assistant" ? true : false,
		token: state.auth.token,
		userId: state.auth.userId
    };
};

export default connect(mapStateToProps)(Account);
