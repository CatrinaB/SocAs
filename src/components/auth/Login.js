import React from "react";
import { connect } from "react-redux";
import {
    updateEmail,
    updatePassword,
    updateToken,
    updateTokenExpiration,
    updateUserId
} from "../../actions/authActions";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

import store from "../../store";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            flag: ""
        };
    }

    onChange(e) {
        if (e.target.name === "email") {
            updateEmail(e.target.value);
        } else {
            updatePassword(e.target.value);
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const email = store.getState().signup.email;
        const password = store.getState().signup.newPassword;
        console.log(email, " ", password);
        const request = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                        userType
                    }
                }
            `
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
                console.log(resData);
                if (resData.data.login.token) {
                    this.setState({
                        flag: resData.data.login
                    });
                    updateUserId(resData.data.login.userId);
                    updateToken(resData.data.login.token);
                    updateTokenExpiration(resData.data.login.tokenExpiration);
                    this.props.history.push("/dashboard");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow className="d-flex mt-3 justify-content-center">
                        <MDBCol md="6">
                            <form onSubmit={this.onSubmit}>
                                <p className="h5 text-center mb-4">Login</p>
                                <div className="mt-5 grey-text">
                                    <MDBInput
                                        label="Email"
                                        // icon="envelope"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                        name="email"
                                        onChange={this.onChange}
                                    />
                                    <MDBInput
                                        label="Password"
                                        // icon="lock"
                                        group
                                        type="password"
                                        validate
                                        name="password"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="text-center">
                                    <MDBBtn type="submit" color="primary">
                                        Login
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
        email: state.email,
        password: state.newPassword
    };
};

export default connect(mapStateToProps)(LoginForm);
