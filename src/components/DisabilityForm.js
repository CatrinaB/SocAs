import React from "react";
import { connect } from "react-redux";

import {
    updateGender,
    updateExperience,
    updateDOB
} from "../redux/actions/auth-actions";

import { FormControl, TextField, Button } from "@material-ui/core";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import SelectMenu from "./options/SelectMenu";
import RadioMenu from "./options/RadioMenu";
import CheckboxMenu from "./options/CheckboxMenu";
import logger from "../utils/logger";

class DisabilityForm extends React.Component {
    state = {
		radio: "",
		gender: null,
		date: null,
		status: null,
		strangerExperience: null,
		checkedMotor: false,
		checkedAuditory: false,
		checkedVision: false,
		checkedMental: false,
		seriousness: "",
		checkedSchoolworkExp: false,
		checkedOccasionalExp: false,
		checkedPermanentExp: false,
		checkedSchoolwork: false,
		checkedOccasional: false,
		checkedPermanent: false,
		dateError: false,
		dateErrorText: "",
		timeAssistance: "",
		stateAid: "",
		reason: ""
	};

    constructor(props) {
        super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	
	calculateDate() {
        let date = new Date();
        let year = date.getFullYear();
        let diff = year - 14;
        return new Date(`${diff}-${date.getMonth() + 1}-${date.getDate()}`);
    }

    onClick = nr => () => {
        this.setState({
            radio: nr
        });
    };

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
				logger.silly(e.target.name);
				switch (e.target.name) {
					case "gender":
						updateGender(e.target.value);
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
	
					case "seriousness":
						this.setState({
							...this.state,
							seriousness: e.target.value
						});
						break;
	
					case "timeAssistance":
						this.setState({
							...this.state,
							timeAssistance: e.target.value
						});
						break;
	
					case "strangersExperience":
						this.setState({
							...this.state,
							strangersExperience: e.target.value
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

					case "stateAid":
						this.setState({
							...this.state,
							stateAid: e.target.value
						});
						break;

					case "reason":
						this.setState({
							...this.state,
							reason: e.target.value
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
        this.props.history.push("/dashboard");
    }

    render() {
        return (
            <div>
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
							radioGroupValue={this.state.strangersExperience}
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
								
						<TextField
							id="reason"
							label="Why do you want to join this project?"
							multiline
							rowsMax={4}
							value={this.state.reason}
							onChange={this.handleChange}
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
        dob: state.auth.dob
    };
};

export default connect(mapStateToProps)(DisabilityForm);
