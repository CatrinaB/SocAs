import React from "react";
import { connect } from "react-redux";

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import {
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    FormGroup,
    Checkbox,
    Button
} from "@material-ui/core";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import store from "../store";
import {
    updateGender,
    updateExperience,
    updateDOB
} from "../actions/authActions";

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
        checkedPermanent: false
    };

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onClick = nr => () => {
        this.setState({
            radio: nr
        });
    };

    handleChange(e) {
        if (e.target === undefined) {
            console.log("date  ", e);
            updateDOB(e.toISOString());
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
        const gender = store.getState().signup.gender;
        const date = store.getState().signup.dob;
        const exp = store.getState().signup.hasExperience === "true";
        const userId = store.getState().signup.userId;
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
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error("Failed!");
                }
                return res.json();
            })
            .then(resData => {
                console.log("assis ", resData);
            })
            .catch(err => {
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
                        style={{ width: "400px" }}
                    >
                        {/* <FormLabel component="label" required>Gender</FormLabel>
                    <RadioGroup row 
                    <FormControlLabel value="female" control={<Radio color="primary" />} label="female" labelPlacement="end" /> */}
                        <InputLabel id="gender" required>
                            Gender
                        </InputLabel>
                        <Select
                            labelId="label-select-gender"
                            id="select-gender"
                            name="gender"
                            value={this.props.gender}
                            onChange={this.handleChange}
                        >
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                required
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date of birth"
                                value={this.props.date}
                                onChange={this.handleChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        <FormLabel
                            component="label"
                            required
                            style={{ textAlign: "left", marginTop: "30px" }}
                        >
                            Status:
                        </FormLabel>
                        <RadioGroup
                            aria-label="status"
                            name="status"
                            value={this.state.status}
                            onChange={this.handleChange}
                            style={{ alignContent: "center" }}
                        >
                            <FormControlLabel
                                value="pupil"
                                control={<Radio color="primary" />}
                                label="Pupil"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="student"
                                control={<Radio color="primary" />}
                                label="Student"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="employed"
                                control={<Radio color="primary" />}
                                label="Employed"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="unemployed"
                                control={<Radio color="primary" />}
                                label="Unemployed"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="retired"
                                control={<Radio color="primary" />}
                                label="Retired"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="other"
                                control={<Radio color="primary" />}
                                label={
                                    <div style={{ marginTop: "10px" }}>
                                        Other: <TextField name="status-other" />
                                    </div>
                                }
                            />
                        </RadioGroup>
                        <FormLabel component="label" required>
                            Do you have any experience working with disabled
                            people?
                        </FormLabel>
                        <RadioGroup
                            required
                            aria-label="hasExperience"
                            name="hasExperience"
                            value={this.props.hasExperience}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio color="primary" />}
                                label="No"
                            />
                        </RadioGroup>
                        {this.props.hasExperience !== "true" ? (
                            <br />
                        ) : (
                            <div>
                                <FormLabel component="label">
                                    How long have you worked with disabled
                                    people?
                                </FormLabel>
                                <RadioGroup
                                    name="timeExperience"
                                    value={this.state.timeExperience}
                                    aria-label="time-experience"
                                    onChange={this.handleChange}
                                >
                                    <FormControlLabel
                                        value="1"
                                        control={<Radio color="primary" />}
                                        label="<1 year"
                                    />
                                    <FormControlLabel
                                        value="3"
                                        control={<Radio color="primary" />}
                                        label="1-3 years"
                                    />
                                    <FormControlLabel
                                        value="5"
                                        control={<Radio color="primary" />}
                                        label="3-5 years"
                                    />
                                    <FormControlLabel
                                        value="10"
                                        control={<Radio color="primary" />}
                                        label=">5 years"
                                    />
                                </RadioGroup>
                                <FormLabel component="label">
                                    With what types of disabilities have you
                                    worked?
                                </FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    this.state.checkedMotor
                                                }
                                                onChange={this.handleChange}
                                                name="motor"
                                                color="primary"
                                            />
                                        }
                                        label="Motor disabilities"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    this.state.checkedAuditory
                                                }
                                                onChange={this.handleChange}
                                                name="auditory"
                                                color="primary"
                                            />
                                        }
                                        label="Auditory disabilities"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    this.state.checkedVision
                                                }
                                                onChange={this.handleChange}
                                                name="vision"
                                                color="primary"
                                            />
                                        }
                                        label="Vision disabilities"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    this.state.checkedMental
                                                }
                                                onChange={this.handleChange}
                                                name="mental"
                                                color="primary"
                                            />
                                        }
                                        label="Mental disabilities"
                                    />
                                </FormGroup>
                                <FormLabel component="label">
                                    How did you help the person/people you
                                    worked with?
                                </FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    this.state
                                                        .checkedSchoolworkExp
                                                }
                                                onChange={this.handleChange}
                                                name="schoolworkExp"
                                                color="primary"
                                            />
                                        }
                                        label="Schoolwork"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    this.state
                                                        .checkedOccasionalExp
                                                }
                                                onChange={this.handleChange}
                                                name="occasionalExp"
                                                color="primary"
                                            />
                                        }
                                        label="Occasional assistance"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    this.state
                                                        .checkedPermanentExp
                                                }
                                                onChange={this.handleChange}
                                                name="permanentExp"
                                                color="primary"
                                            />
                                        }
                                        label="Permanent assistance"
                                    />
                                </FormGroup>
                            </div>
                        )}
                        <FormLabel component="label">
                            How would you like to help people?
                        </FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedSchoolwork}
                                        onChange={this.handleChange}
                                        name="schoolwork"
                                        color="primary"
                                    />
                                }
                                label="Schoolwork"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedOccasional}
                                        onChange={this.handleChange}
                                        name="occasional"
                                        color="primary"
                                    />
                                }
                                label="Occasional assistance"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedPermanent}
                                        onChange={this.handleChange}
                                        name="permanent"
                                        color="primary"
                                    />
                                }
                                label="Permanent assistance"
                            />
                        </FormGroup>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "40px" }}
                            type="submit"
                        >
                            Submit
                        </Button>

                        {/* <InputLabel id="status">Gender</InputLabel>
                    <Select
                        labelId="label-select-status"
                        id="select-status"
                        name="gender"
                        value={this.state.gender}
                        onChange={this.handleChange}
                    >
                        <MenuItem value="pupil">Female</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select> */}
                    </FormControl>
                </form>
            </div>
            // <div>
            //     <form onSubmit={this.onSubmit}>
            //         <MDBContainer>
            //             <MDBRow className="d-flex justify-content-center">
            //                 <MDBCol md="6">
            //                     <form>
            //                         <p className="h5 text-center mt-3">
            //                             Assistant form
            //                         </p>
            //                         <div className="mt-5 grey-text">
            //                             <div
            //                                 name="gender"
            //                                 onChange={this.onChange}
            //                                 value={this.props.user}
            //                             >
            //                                 <select className="browser-default mb-3 custom-select">
            //                                     <option>
            //                                         What's your gender?
            //                                     </option>
            //                                     <option value="1">Male</option>
            //                                     <option value="2">
            //                                         Female
            //                                     </option>
            //                                     <option value="3">Other</option>
            //                                 </select>
            //                             </div>
            //                             <div
            //                                 name="age"
            //                                 onChange={this.onChange}
            //                                 value={this.props.user}
            //                             >
            //                                 <select className="browser-default mb-3 custom-select">
            //                                     <option>
            //                                         How old are you?
            //                                     </option>
            //                                     <option value="1">0-5 years old</option>
            //                                     <option value="2">6-10 years old</option>
            //                                     <option value="3">11-17 years old</option>
            //                                     <option value="4">18-25 years old</option>
            //                                     <option value="5">26-35 years old</option>
            //                                     <option value="6">36-45 years old</option>
            //                                     <option value="7">46-55 years old</option>
            //                                     <option value="8">56+ years old</option>
            //                                 </select>
            //                             </div>
            //                             <div
            //                                 name="status"
            //                                 onChange={this.onChange}
            //                                 value={this.props.user}
            //                             >
            //                                 <select className="browser-default mb-3 custom-select">
            //                                     <option>
            //                                         What's your status?
            //                                     </option>
            //                                     <option value="1">Pupil</option>
            //                                     <option value="2">Student</option>
            //                                     <option value="3">Employee</option>
            //                                     <option value="4">Retired</option>
            //                                     <option value="5">Other</option>
            //                                 </select>
            //                             </div>
            //                             <div
            //                                 name="experience"
            //                                 onChange={this.onChange}
            //                                 value={this.props.user}
            //                             >
            //                                 <select className="browser-default mb-3 custom-select">
            //                                     <option>
            //                                         How experienced are you regarding people with disabilities?
            //                                     </option>
            //                                     <option value="1">1. I have no experience at all</option>
            //                                     <option value="2">2.</option>
            //                                     <option value="3">3.</option>
            //                                     <option value="4">4.</option>
            //                                     <option value="5">5. I am very experienced</option>
            //                                 </select>
            //                             </div>
            //                             <div
            //                                 name="availability"
            //                                 onChange={this.onChange}
            //                                 value={this.props.user}
            //                             >
            //                                 <select className="browser-default custom-select">
            //                                     <option>
            //                                         How much time are you willing to help them on a weekly basis?
            //                                     </option>
            //                                     <option value="1">1-2 hours/week</option>
            //                                     <option value="2">3-4 hours/week</option>
            //                                     <option value="3">5-7 hours/week</option>
            //                                     <option value="4">8-10 hours/week</option>
            //                                     <option value="5">11-15 hours/week</option>
            //                                     <option value="6">16-20 hours/week</option>
            //                                     <option value="7">21+ hours/week</option>
            //                                 </select>
            //                             </div>
            //                             <MDBInput
            //                                 containerClass="text-left"
            //                                 label="How would you prefer to help?"
            //                                 type="text"
            //                                 name="how"
            //                                 onChange={this.onChange}
            //                                 value={this.props.confirmPassword}
            //                             />
            //                             <MDBInput
            //                                 containerClass="text-left mb-5"
            //                                 label="Why do you want to join this project?"
            //                                 type="text"
            //                                 name="why"
            //                                 onChange={this.onChange}
            //                                 value={this.props.confirmPassword}
            //                             />
            //                         </div>
            //                         <div className="text-center d-flex justify-content-center">
            //                             <MDBBtn color="primary" type="submit">
            //                                 Submit
            //                             </MDBBtn>
            //                         </div>
            //                     </form>
            //                 </MDBCol>
            //             </MDBRow>
            //         </MDBContainer>
            //     </form>
            // </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        gender: state.signup.gender,
        dob: new Date(state.signup.dob),
        hasExperience: state.signup.hasExperience
    };
};

export default connect(mapStateToProps)(AssistantForm);
