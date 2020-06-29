import React from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailRounded from "@material-ui/icons/EmailRounded";
import Lock from "@material-ui/icons/Lock";
import { login } from "../queries";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {};
    }

    onChange(e) {
        if (e.target.name === "email") {
            if (
                !/^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(
                    e.target.value
                )
            ) {
                this.setState({ ...this.state, errorEmail: true });
            } else {
                this.setState({
                    ...this.state,
                    errorEmail: false,
                    email: e.target.value
                });
            }
        } else if (e.target.name === "password") {
            if (e.target.value.length === 0) {
                this.setState({ ...this.state, errorPassword: true });
            } else {
                this.setState({
                    ...this.state,
                    errorPassword: false,
                    password: e.target.value
                });
            }
        }
    }

    handlePasswordClick = () => {
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword
        });
    };

    onSubmit(e) {
		e.preventDefault();
		login(this);
    }

    render() {
        return (
            <div>
                {this.state.loginError && (
                    <h3>{this.state.loginErrorMessage}</h3>
                )}
                <form autoComplete="off" onSubmit={this.onSubmit}>
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
                        name="password"
                        onChange={this.onChange}
                        error={this.state.errorPassword}
                        helperText={
                            this.state.errorPassword ? "Invalid password" : ""
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            )
                        }}
                        style={{ width: "400px" }}
                    />
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: "40px" }}
                        type="submit"
                        disabled={
                            this.state.errorPassword || this.state.errorEmail
                        }
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default Login;
