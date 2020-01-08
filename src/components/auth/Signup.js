import React from "react";
import { connect } from "react-redux";
import {
    updateUsername,
    updatePassword,
    updateConfirmPassword
} from "../../actions/authActions";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput,
    MDBFormInline
} from "mdbreact";

class SignupForm extends React.Component {
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
        switch (e.target.name) {
            case "username":
                updateUsername(e.target.value);
                break;

            case "password":
                updatePassword(e.target.value);
                break;

            default:
                updateConfirmPassword(e.target.value);
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
                    <MDBContainer>
                        <MDBRow className="d-flex justify-content-center">
                            {/* mt-3 */}
                            <MDBCol md="6">
                                <form>
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
                </form>
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
