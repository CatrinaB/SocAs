import React from "react";
import { connect } from "react-redux";
import {
    updatePassword,
    updateConfirmPassword,
    updateEmail,
    updateName,
    updateUserId
} from "../../actions/authActions";
// import {
//     MDBContainer,
//     MDBRow,
//     MDBCol,
//     MDBBtn,
//     MDBInput,
//     MDBFormInline
// } from "mdbreact";
import store from "../../store";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";
import EmailRounded from "@material-ui/icons/EmailRounded";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    FormControl
} from "@material-ui/core";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            user: "",
            radio: null,
            email: "",
            error: false,
            showPassword: false,
            errorConfirm: false,
            showConfirmPassword: false,
            errorEmail: false
        };
        this.onChange = this.onChange.bind(this);
        this.handlePasswordClick = this.handlePasswordClick.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.handleConfirmPasswordClick = this.handleConfirmPasswordClick.bind(
            this
        );
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    // onClick = nr => () => {
    //     this.setState({
    //         radio: nr
    //     });
    // };

    handleRadioChange = e => {
        this.setState({ ...this.state, radio: e.target.value });
    };

    handlePasswordClick = () => {
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword
        });
    };

    handleMouseDownPassword = e => {
        e.preventDefault();
    };

    onChange(e) {
        console.log(this.state);
        switch (e.target.name) {
            case "email":
                updateEmail(e.target.value);
                if (
                    !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(
                        e.target.value
                    )
                ) {
                    this.setState({ ...this.state, errorEmail: true });
                } else {
                    this.setState({ ...this.state, errorEmail: false });
                }
                break;

            case "password":
                updatePassword(e.target.value);
                if (e.target.value.length < 8) {
                    this.setState({ error: true });
                } else {
                    this.setState({ error: false });
                }
                break;

            case "name":
                updateName(e.target.value);
                break;

            case "confirmPassword":
                updateConfirmPassword(e.target.value);
                if (e.target.value !== this.props.password) {
                    this.setState({ ...this.state, errorConfirm: true });
                } else {
                    this.setState({ ...this.state, errorConfirm: false });
                }
                break;

            default:
                // updateConfirmPassword(e.target.value);
                console.log(e.target.name);
        }
    }

    handleConfirmPasswordClick = () => {
        this.setState({
            ...this.state,
            showConfirmPassword: !this.state.showConfirmPassword
        });
    };

    onSubmit(e) {
        e.preventDefault();
        const email = store.getState().signup.email;
        const password = store.getState().signup.newPassword;
        console.log(email, "  ", password);
        if (this.state.radio) {
            const userType =
                this.state.radio === "Assistant" ? "assistant" : "person";
            const name = store.getState().signup.name;

            const request = {
                query: `
                mutation {
                    createUser(userInput: {
                        email: "${email}"
                        password: "${password}"
                        userType: "${userType}"
                    }) {
        				_id
                        userType
                    }
                }
            `
            };

            const addAssistant = (userId, name) => {
                const assistantRequest = {
                    query: `
        			mutation {
        				createAssistant(newAssistantInput: {
        					_id: "${userId}"
        					name: "${name}"
        				}) {
        					_id
        					name
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
                        updateUserId(resData.data.createAssistant._id);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            };

            const addDisabledPerson = (userId, name) => {
                const personRequest = {
                    query: `
        			mutation {
        				createPerson(newDisabledPersonInput: {
        					_id: "${userId}"
        					name: "${name}"
        				}) {
        					_id
        					name
        				}
        			}
        		`
                };
                fetch("http://localhost:8000/graphql", {
                    method: "POST",
                    body: JSON.stringify(personRequest),
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
                        console.log("pers ", resData);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            };

            fetch("http://localhost:8000/graphql", {
                method: "POST",
                body: JSON.stringify(request),
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
                    console.log(resData.data.createUser);
                    if (resData.data.createUser) {
                        if (resData.data.createUser.userType === "assistant") {
                            addAssistant(resData.data.createUser._id, name);
                            this.props.history.push("/assistantForm");
                        } else {
                            addDisabledPerson(
                                resData.data.createUser._id,
                                name
                            );
                            this.props.history.push("/disabledForm");
                        }
                    }
                })
                .catch(err => {
                    alert(err.message);
                });
        } else {
            alert("Please select account type!");
        }

        //this.props.history.push("/assistantForm");
    }

    render() {
        return (
            <div style={{ marginTop: "140px" }}>
                <form autoComplete="off" onSubmit={this.onSubmit}>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        name="name"
                        onChange={this.onChange}
                        value={this.props.user}
                        //error={this.state.error}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            )
                        }}
                        style={{ width: "400px" }}
                    />
                    <br />
                    <br />
                    <TextField
                        required
                        id="email"
                        label="E-mail address"
                        name="email"
                        error={this.state.errorEmail}
                        helperText={
                            this.state.errorEmail
                                ? "Invalid e-mail address"
                                : ""
                        }
                        onChange={this.onChange}
                        value={this.props.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailRounded />
                                </InputAdornment>
                            )
                        }}
                        style={{ width: "400px" }}
                    />
                    <br />
                    <br />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type={this.state.showPassword ? "text" : "password"}
                        helperText={
                            this.state.error ? "Password too short" : ""
                        }
                        name="password"
                        onChange={this.onChange}
                        value={this.props.password}
                        error={this.state.error}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handlePasswordClick}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            )
                        }}
                        style={{ width: "400px" }}
                    />
                    <br />
                    <br />
                    <TextField
                        required
                        id="confirmPassword"
                        label="Confirm password"
                        type={
                            this.state.showConfirmPassword ? "text" : "password"
                        }
                        helperText={
                            this.state.errorConfirm
                                ? "The two passwords don't match"
                                : ""
                        }
                        name="confirmPassword"
                        onChange={this.onChange}
                        value={this.props.confirmPassword}
                        error={this.state.errorConfirm}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleConfirmPasswordClick}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showConfirmPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            )
                        }}
                        style={{ width: "400px" }}
                    />
                    <br />
                    <br />
                    <FormControl component="fieldset">
                        <FormLabel component="label" required>
                            Account type
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-label="account-type"
                            name="account"
                            value={this.state.radio}
                            onChange={this.handleRadioChange}
                        >
                            <FormControlLabel
                                value="Assistant"
                                control={<Radio color="primary" />}
                                label="Assistant"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="Disabled person"
                                control={<Radio color="primary" />}
                                label="Disabled Person"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "40px" }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </div>
            // <div>
            //     <MDBContainer>
            //         <MDBRow className="d-flex justify-content-center">
            //             {/* mt-3 */}
            //             <MDBCol md="6">
            //                 <form onSubmit={this.onSubmit}>
            //                     <p className="mt-3 h5 text-center">Sign up</p>
            //                     <div className="mt-5 grey-text">
            //                         <MDBInput
            //                             containerClass="text-left"
            //                             label="First name"
            //                             icon="user-circle"
            //                             group
            //                             type="text"
            //                             validate
            //                             error="wrong"
            //                             success="right"
            //                             placeholder=""
            //                             name="name"
            //                             onChange={this.onChange}
            //                             value={this.props.user}
            //                             required
            //                         />
            //                         <MDBInput
            //                             containerClass="text-left"
            //                             label="Last name"
            //                             icon="user"
            //                             group
            //                             type="text"
            //                             validate
            //                             error="wrong"
            //                             success="right"
            //                             placeholder=""
            //                             name="name"
            //                             onChange={this.onChange}
            //                             value={this.props.user}
            //                         />
            //                         <MDBInput
            //                             containerClass="text-left"
            //                             label="Email"
            //                             icon="envelope"
            //                             group
            //                             type="email"
            //                             validate
            //                             error="wrong"
            //                             success="right"
            //                             placeholder=""
            //                             name="email"
            //                             onChange={this.onChange}
            //                             value={this.props.user}
            //                             required
            //                         />
            //                         <MDBInput
            //                             containerClass="text-left"
            //                             label="Password"
            //                             icon="lock"
            //                             group
            //                             type="password"
            //                             validate
            //                             placeholder=""
            //                             name="password"
            //                             onChange={this.onChange}
            //                             value={this.props.password}
            //                             required
            //                         />
            //                         <MDBInput
            //                             containerClass="text-left"
            //                             label="Confirm password"
            //                             icon="exclamation-triangle"
            //                             group
            //                             type="password"
            //                             validate
            //                             error="wrong"
            //                             success="right"
            //                             placeholder=""
            //                             name="confirmPassword"
            //                             onChange={this.onChange}
            //                             value={this.props.confirmPassword}
            //                             required
            //                         />
            //                     </div>
            //                     <MDBFormInline className="d-flex justify-content-center">
            //                         <MDBInput
            //                             gap
            //                             onClick={this.onClick(1)}
            //                             checked={
            //                                 this.state.radio === 1
            //                                     ? true
            //                                     : false
            //                             }
            //                             label="Assistant"
            //                             type="radio"
            //                             id="radio1"
            //                             // containerClass="mr-5"
            //                         />
            //                         <MDBInput
            //                             gap
            //                             onClick={this.onClick(2)}
            //                             checked={
            //                                 this.state.radio === 2
            //                                     ? true
            //                                     : false
            //                             }
            //                             label="Person with disability"
            //                             type="radio"
            //                             id="radio2"
            //                             containerClass="ml-5"
            //                         />
            //                     </MDBFormInline>
            //                     <div className="text-center d-flex justify-content-center">
            //                         <MDBBtn color="primary" type="submit">
            //                             Register
            //                         </MDBBtn>
            //                     </div>
            //                 </form>
            //             </MDBCol>
            //         </MDBRow>
            //     </MDBContainer>
            // </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("xxx", state);
    return {
        user: state.signup.name,
        password: state.signup.newPassword,
        confirmPassword: state.signup.confirmPassword
    };
};

export default connect(mapStateToProps)(SignupForm);
