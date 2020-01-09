import React from "react";
import { connect } from "react-redux";
import {
    updatePassword,
    updateConfirmPassword,
    updateEmail,
    updateName
} from "../../actions/authActions";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput,
    MDBFormInline
} from "mdbreact";
import store from "../../store";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            radio: null,
            email: "",
            password: ""
        };
    }

    onClick = nr => () => {
        this.setState({
            radio: nr
        });
    };

    onChange(e) {
        switch (e.target.name) {
            case "email":
                updateEmail(e.target.value);
                break;

            case "password":
                updatePassword(e.target.value);
                break;

            case "name":
                updateName(e.target.value);
                break;

            default:
                updateConfirmPassword(e.target.value);
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const email = store.getState().signup.email;
        const password = store.getState().signup.newPassword;
        if (this.state.radio) {
            const userType = this.state.radio === 1 ? "assistant" : "person";
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
                            this.props.history.push("/");
                        } else {
                            addDisabledPerson(
                                resData.data.createUser._id,
                                name
                            );
                            this.props.history.push("/");
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            alert("Please select account type!");
        }

        // this.props.history.push("/dashboard");
    }

    render() {
        return (
            <div>
                    <MDBContainer>
                        <MDBRow className="d-flex justify-content-center">
                            {/* mt-3 */}
                            <MDBCol md="6">
                                <form onSubmit={this.onSubmit}>
                                    <p className="mt-3 h5 text-center">
                                        Sign up
                                    </p>
                                    <div className="mt-5 grey-text">
                                        <MDBInput
                                            containerClass="text-left"
                                            label="First name"
                                            icon="user-circle"
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            placeholder=""
                                            name="name"
                                            onChange={this.onChange}
                                            value={this.props.user}
                                        />
                                        <MDBInput
                                            containerClass="text-left"
                                            label="Last name"
                                            icon="user"
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            placeholder=""
                                            name="name"
                                            onChange={this.onChange}
                                            value={this.props.user}
                                        />
                                        <MDBInput
                                            containerClass="text-left"
                                            label="Email"
                                            icon="envelope"
                                            group
                                            type="email"
                                            validate
                                            error="wrong"
                                            success="right"
                                            placeholder=""
                                            name="email"
                                            onChange={this.onChange}
                                            value={this.props.user}
                                        />
                                        <MDBInput
                                            containerClass="text-left"
                                            label="Password"
                                            icon="lock"
                                            group
                                            type="password"
                                            validate
                                            placeholder=""
                                            name="password"
                                            onChange={this.onChange}
                                            value={this.props.password}
                                        />
                                        <MDBInput
                                            containerClass="text-left"
                                            label="Confirm password"
                                            icon="exclamation-triangle"
                                            group
                                            type="password"
                                            validate
                                            error="wrong"
                                            success="right"
                                            placeholder=""
                                            name="confirmPassword"
                                            onChange={this.onChange}
                                            value={this.props.confirmPassword}
                                        />
                                    </div>
                                    <MDBFormInline className="d-flex justify-content-center">
                                        <MDBInput
                                            gap
                                            onClick={this.onClick(1)}
                                            checked={
                                                this.state.radio === 1
                                                    ? true
                                                    : false
                                            }
                                            label="Assistant"
                                            type="radio"
                                            id="radio1"
                                            // containerClass="mr-5"
                                        />
                                        <MDBInput
                                            gap
                                            onClick={this.onClick(2)}
                                            checked={
                                                this.state.radio === 2
                                                    ? true
                                                    : false
                                            }
                                            label="Person with disability"
                                            type="radio"
                                            id="radio2"
                                            containerClass="ml-5"
                                        />
                                    </MDBFormInline>
                                    <div className="text-center d-flex justify-content-center">
                                        <MDBBtn color="primary" type="submit">
                                            Register
                                        </MDBBtn>
                                    </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.newUsername,
        password: state.newPassword,
        confirmPassword: state.confirmPassword
    };
};

export default connect(mapStateToProps)(SignupForm);
