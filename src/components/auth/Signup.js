import React from "react";
import { connect } from "react-redux";
import {
    updateUsername,
    updatePassword,
    updateConfirmPassword
} from "../../actions/authActions";
import "../../styles/Signup.css";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

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
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter first name"
                            name="name"
                            onChange={this.onChange}
                            value={this.props.user}
                        />
                    </div>

					<div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            name="email"
                            onChange={this.onChange}
                            value={this.props.user}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            name="password"
                            onChange={this.onChange}
                            value={this.props.password}
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            name="confirmPassword"
                            onChange={this.onChange}
                            value={this.props.confirmPassword}
                        />
                    </div>

					<button type="submit" className="btn btn-primary btn-block">
						Create my account!
                    </button>

    				<p className="no-account-yet text-right">
                        <a href="#">No account yet?</a>
                    </p>
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
