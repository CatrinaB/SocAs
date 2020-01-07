import React from "react";
import { connect } from "react-redux";
import { updateEmail, updatePassword } from "../../actions/authActions";
import "../../styles/Login.css";

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
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
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

                    <button type="submit" className="btn btn-primary btn-block">
                        Login
                    </button>

                    <p className="forgot-password text-right">
                        <a href="#">Forgot password?</a>
                    </p>
                </form>
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
