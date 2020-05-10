import React from "react";
import { connect } from "react-redux";

import { FormControl, TextField, Button } from "@material-ui/core";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import store from "../redux/store";
import {
    updateGender,
    updateExperience,
    updateDOB
} from "../redux/actions/auth-actions";

import SelectMenu from "./options/SelectMenu";
import RadioMenu from "./options/RadioMenu";
import CheckboxMenu from "./options/CheckboxMenu";
import logger from "../utils/logger";

class AssistantForm extends React.Component {
    state = {
        radio: "",
        gender: null,
        date: null,
        status: null,
        hasExperience: null,
        checkedMotor: false,
        checkedAuditory: false,
        checkedVision: false,
        checkedMental: false,
        checkedSchoolworkExp: false,
        checkedOccasionalExp: false,
        checkedPermanentExp: false,
        checkedSchoolwork: false,
        checkedOccasional: false,
        checkedPermanent: false,
        dateError: false,
        dateErrorText: ""
    };

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onClick = (nr) => () => {
        this.setState({
            radio: nr
        });
    };

    calculateDate() {
        let date = new Date();
        let year = date.getFullYear();
        let diff = year - 14;
        return new Date(`${diff}-${date.getMonth() + 1}-${date.getDate()}`);
    }

    handleChange(e) {
        if (e.target === undefined) {
            try {
                updateDOB(e.toISOString());
                this.setState({ ...this.state, dateError: false });
            } catch (err) {
                this.setState({
                    ...this.state,
                    dateError: true,
                    dateErrorText: err.message
                });
            }
        } else {
            switch (e.target.name) {
                case "gender":
                    updateGender(e.target.value);
                    break;

                case "hasExperience":
                    updateExperience(e.target.value);
                    break;

                case "motor":
                    this.setState({
                        ...this.state,
                        checkedMotor: !this.state.checkedMotor
                    });
                    break;

                case "auditory":
                    this.setState({
                        ...this.state,
                        checkedAuditory: !this.state.checkedAuditory
                    });
                    break;

                case "vision":
                    this.setState({
                        ...this.state,
                        checkedVision: !this.state.checkedVision
                    });
                    break;

                case "mental":
                    this.setState({
                        ...this.state,
                        checkedMental: !this.state.checkedMental
                    });
                    break;

                case "schoolworkExp":
                    this.setState({
                        ...this.state,
                        checkedSchoolworkExp: !this.state.checkedSchoolworkExp
                    });
                    break;

                case "occasionalExp":
                    this.setState({
                        ...this.state,
                        checkedOccasionalExp: !this.state.checkedOccasionalExp
                    });
                    break;

                case "permanentExp":
                    this.setState({
                        ...this.state,
                        checkedPermanentExp: !this.state.checkedPermanentExp
                    });
                    break;

                case "schoolwork":
                    this.setState({
                        ...this.state,
                        checkedSchoolwork: !this.state.checkedSchoolwork
                    });
                    break;

                case "occasional":
                    this.setState({
                        ...this.state,
                        checkedOccasional: !this.state.checkedOccasional
                    });
                    break;

                case "permanent":
                    this.setState({
                        ...this.state,
                        checkedPermanent: !this.state.checkedPermanent
                    });
                    break;

                default:
                    this.setState({ ...this.state, status: e.target.value });
            }
        }
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this);
        const gender = store.getState().auth.gender;
        const date = store.getState().auth.dob;
        const exp = store.getState().auth.hasExperience === "true";
        const userId = store.getState().auth.userId;
        // const date = this.state.date.toISOString

        const assistantRequest = {
            query: `
                mutation {
                    updateAssistant(existingAssistantInput: {
                        _id: "${userId}"
                        gender: '${gender}'
                        dob: '${date}'
                        experience: '${exp}'
                    }) {
                        _id
                        name
                        gender
                        dob
                        experience
                    }
                }
            `
        };
        fetch("http://localhost:8000/graphql", {
            method: "POST",
            body: JSON.stringify(assistantRequest),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error("Failed!");
                }
                return res.json();
            })
            .then((resData) => {
                console.log("assis ", resData);
            })
            .catch((err) => {
                console.log(err);
            });

        // fetch("http://localhost:8000/graphql", {
        //     method: "POST",
        //     body: JSON.stringify(request),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then(res => {
        //         if (res.status !== 200 && res.status !== 201) {
        //             throw new Error("Failed!");
        //         }
        //         return res.json();
        //     })
        //     .then(resData => {
        //         console.log(resData.data.createUser);
        //         if (resData.data.createUser) {
        //             if (resData.data.createUser.userType === "assistant") {
        //                 addAssistant(resData.data.createUser._id, name);
        //                 this.props.history.push("/assistantForm");
        //             } else {
        //                 addDisabledPerson(
        //                     resData.data.createUser._id,
        //                     name
        //                 );
        //                 this.props.history.push("/disabledForm");
        //             }
        //         }
        //     })
        //     .catch(err => {
        //         alert(err.message);
        //     });
        this.props.history.push("/");
    }

    render() {
        return (
            <div style={{ marginTop: "140px" }}>
                <form onSubmit={this.onSubmit}>
                    <FormControl
                        component="fieldset"
                        style={{ width: "400px", textAlign: "left" }}
                    >
                        <SelectMenu
                            inputLabelId="gender"
                            required={true}
                            selectLabelId="label-select-gender"
                            selectId="select-gender"
                            selectName="gender"
                            selectValue={this.props.gender}
                            onChange={this.handleChange}
                            selectStyle={{ width: "100px" }}
                            menuItems={[
                                { value: "Female", option: "Female" },
                                { value: "Male", option: "Male" },
                                { value: "Other", option: "Other" }
                            ]}
                        />

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                // error={this.state.dateError}
                                // helperText={
                                //     this.state.dateError &&
                                //     this.state.dateErrorText
                                // }
                                required
                                disableFuture
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date of birth"
                                value={this.props.dob}
                                onChange={this.handleChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                                maxDate={this.calculateDate()}
                                maxDateMessage="You need to be at least 14 years old to sign up!"
                            />
                        </MuiPickersUtilsProvider>

                        <RadioMenu
                            formLabelComponent="label"
                            required={true}
                            formLabelText="Status"
                            radioGroupAriaLabel="status"
                            radioGroupName="status"
                            radioGroupValue={this.state.status}
                            radioGroupOnChange={this.handleChange}
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
                                        <div style={{ marginTop: "10px" }}>
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
                            radioGroupValue={this.props.hasExperience}
                            radioGroupOnChange={this.handleChange}
                            menuItems={[
                                {
                                    value: "true",
                                    color: "primary",
                                    label: "Yes"
                                },
                                {
                                    value: "false",
                                    color: "primary",
                                    label: "No"
                                }
                            ]}
                        />

                        {this.props.hasExperience !== "true" ? (
                            <br />
                        ) : (
                            <div>
                                <RadioMenu
                                    formLabelComponent="label"
                                    required={true}
                                    formLabelText="How long have you worked with disabled people?"
                                    radioGroupAriaLabel="time-experience"
                                    radioGroupName="timeExperience"
                                    radioGroupValue={this.state.timeExperience}
                                    radioGroupOnChange={this.handleChange}
                                    // prettier-ignore
                                    menuItems={[
										{value: "1", color: "primary", label: "<1 year"},
										{value: "3", color: "primary", label: "1-3 years"},
										{value: "5", color: "primary", label: ">5 years"}
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
                                    onChange={this.handleChange}
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

                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "40px" }}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </FormControl>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gender: state.auth.gender,
        dob: state.auth.dob,
        hasExperience: state.auth.hasExperience
    };
};

export default connect(mapStateToProps)(AssistantForm);
