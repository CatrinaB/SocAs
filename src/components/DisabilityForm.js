import React from "react";
import { connect } from "react-redux";

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput
} from "mdbreact";

class DisabilityForm extends React.Component {
    state = {
        radio: ""
    };

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onClick = nr => () => {
        this.setState({
            radio: nr
        });
    };

    onChange(e) {
        // switch (e.target.name) {
        //     case "username":
        //         updateUsername(e.target.value);
        //         break;
        //     case "password":
        //         updatePassword(e.target.value);
        //         break;
        //     default:
        //         updateConfirmPassword(e.target.value);
        // }
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this);
        this.props.history.push("/dashboard");
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <MDBContainer>
                        <MDBRow className="d-flex justify-content-center">
                            <MDBCol md="6">
                                <form>
                                    <p className="h5 text-center mt-3">
                                        Disability form
                                    </p>
                                    <div className="mt-5 grey-text">
                                        <div
                                            name="gender"
                                            onChange={this.onChange}
                                            value={this.props.user}
                                        >
                                            <select className="browser-default mb-3 custom-select">
                                                <option>
                                                    What's your gender?
                                                </option>
                                                <option value="1">
                                                    Male
                                                </option>
                                                <option value="2">
                                                    Female
                                                </option>
                                                <option value="3">Other</option>
                                            </select>
                                        </div>
                                        <div
                                            name="age"
                                            onChange={this.onChange}
                                            value={this.props.user}
                                        >
                                            <select className="browser-default mb-3 custom-select">
                                                <option>
                                                    How old are you?
                                                </option>
                                                <option value="1">0-5 years old</option>
                                                <option value="2">6-10 years old</option>
                                                <option value="3">11-17 years old</option>
                                                <option value="4">18-25 years old</option>
                                                <option value="5">26-35 years old</option>
                                                <option value="6">36-45 years old</option>
                                                <option value="7">46-55 years old</option>
                                                <option value="8">56+ years old</option>
                                            </select>
                                        </div>
                                        <div
                                            name="status"
                                            onChange={this.onChange}
                                            value={this.props.user}
                                        >
                                            <select className="browser-default mb-3 custom-select">
                                                <option>
                                                    What's your status?
                                                </option>
                                                <option value="1">Pupil</option>
                                                <option value="2">Student</option>
                                                <option value="3">Employee</option>
                                                <option value="4">Retired</option>
                                                <option value="5">Other</option>
                                            </select>
                                        </div>
                                        <div
                                            name="problems"
                                            onChange={this.onChange}
                                            value={this.props.user}
                                        >
                                            <select className="browser-default mb-3 custom-select">
                                                <option>
                                                    What kind of problems do you have?
                                                </option>
                                                <option value="1">Blind/Visually impaired</option>
                                                <option value="2">Deaf/Hearing impairments</option>
                                                <option value="3">Mobility impaired</option>
                                                <option value="4">Dyslexia</option>
                                                <option value="5">Autism</option>
                                                <option value="6">Alzheimer's/Dementia</option>
                                            </select>
                                        </div>
                                        <div
                                            name="seriousness"
                                            onChange={this.onChange}
                                            value={this.props.user}
                                        >
                                            <select className="browser-default mb-3 custom-select">
                                                <option>
                                                    How serious is your disability?
                                                </option>
                                                <option value="1">1. It's not that bad</option>
                                                <option value="2">2. </option>
                                                <option value="3">3. </option>
                                                <option value="4">4. </option>
                                                <option value="5">5. Very serious</option>
                                            </select>
                                        </div>
                                        <div
                                            name="assist-level"
                                            onChange={this.onChange}
                                            value={this.props.user}
                                        >
                                            <select className="browser-default mb-3 custom-select">
                                                <option>
                                                    How much assistance would you need on a weekly basis?
                                                </option>
                                                <option value="1">1-2 hours/week</option>
                                                <option value="2">3-4 hours/week</option>
                                                <option value="3">5-7 hours/week</option>
                                                <option value="4">8-10 hours/week</option>
                                                <option value="5">11-15 hours/week</option>
                                                <option value="6">16-20 hours/week</option>
                                                <option value="7">21+ hours/week</option>
                                            </select>
                                        </div>
                                        <div
                                            name="experience-strangers"
                                            onChange={this.onChange}
                                            value={this.props.user}
                                        >
                                            <select className="browser-default mb-3 custom-select">
                                                <option>
                                                    Do you have experience with strangers helping you out?
                                                </option>
                                                <option value="1">No, I can usually handle it myself</option>
                                                <option value="2">No, only my family and friends have helped me until now</option>
                                                <option value="3">Yes, strangers usually help me</option>
                                            </select>
                                        </div>
                                        <div
                                            name="state-aid"
                                            onChange={this.onChange}
                                            value={this.props.user}
                                        >
                                            <select className="browser-default custom-select">
                                                <option>
                                                    Have you also reached for state aid (social assistance)?
                                                </option>
                                                <option value="1">No</option>
                                                <option value="2">Yes</option>
                                            </select>
                                        </div>
                                        <MDBInput
                                            containerClass="text-left"
                                            label="What kind of help do you need?"
                                            type="text"
                                            name="help"
                                            onChange={this.onChange}
                                            value={this.props.confirmPassword}
                                        />
                                        <MDBInput
                                            containerClass="text-left mb-4"
                                            label="Why do you want to join this project?"
                                            type="text"
                                            name="why"
                                            onChange={this.onChange}
                                            value={this.props.confirmPassword}
                                        />
                                    </div>
                                    <div className="text-center d-flex justify-content-center">
                                        <MDBBtn color="primary" type="submit">
                                            Submit
                                        </MDBBtn>
                                    </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    //     return {
    //         user: state.newUsername,
    //         password: state.newPassword,
    //         confirmPassword: state.confirmPassword
    //     };
};

export default connect(mapStateToProps)(DisabilityForm);
