import React from "react";
import { connect } from "react-redux";
import { 
	updateEmail, 
	updatePassword } from "../../actions/authActions";
import { 
	MDBContainer, 
	MDBRow, 
	MDBCol, 
	MDBInput, 
	MDBBtn 
} from "mdbreact";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        if (e.target.name === "email") updateEmail(e.target.value);
        else updatePassword(e.target.value);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.history.push("/dashboard");
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow className="d-flex mt-3 justify-content-center">
                        <MDBCol md="6">
                            <form>
                                <p className="h5 text-center mb-4">Login</p>
                                <div className="mt-5 grey-text">
                                    <MDBInput containerClass="text-left"
                                        label="Email"
                                        icon="envelope"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                    />
                                    <MDBInput containerClass="text-left"
                                        label="Password"
                                        icon="lock"
                                        group
                                        type="password"
                                        validate
                                    />
                                </div>
                                <div className="text-center">
                                    <MDBBtn color="primary">Login</MDBBtn>
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
        password: state.newPassword
    };
};

export default connect(mapStateToProps)(LoginForm);
