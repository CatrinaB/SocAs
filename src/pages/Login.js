import React from "react";
import {
	updateToken,
	updateTokenExpiration,
} from "../redux/actions/auth-actions";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailRounded from "@material-ui/icons/EmailRounded";
import Lock from "@material-ui/icons/Lock";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {};
	}

	onChange(e) {
		if (e.target.name === "email") {
			if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(e.target.value)) {
				this.setState({ ...this.state, errorEmail: true });
			} else {
				this.setState({ ...this.state, errorEmail: false, email: e.target.value });
			}
		} else if (e.target.name === "password") {
			if (e.target.value.length === 0) {
				this.setState({ ...this.state, errorPassword: true });
			} else {
				this.setState({ ...this.state, errorPassword: false, password: e.target.value });
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
		const email = this.state.email;
		const password = this.state.password;
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
		fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
			method: "POST",
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => {
			if (res.status !== 200 && res.status !== 201) {
				console.log(`Error response for login: ${res.body}`);
				throw new Error("Something went wrong!");
			}
			return res.json();
		}).then(resData => {
			console.log(`Login request result: `, resData);

			if (resData.errors && resData.errors.length > 0) {
				let alertMessage = "";
				for (let error in resData.errors) {
					alertMessage += resData.errors[error].message + "\n";
				}
				throw new Error(alertMessage);
			} else if (resData.data.login.token) {
				updateToken(resData.data.login.token);
				updateTokenExpiration(resData.data.login.tokenExpiration);
				this.props.history.push("/dashboard");
			} else {
				throw new Error("Something went wrong!");
			}
		}).catch(err => {
			this.setState({ ...this.state, loginError: true, loginErrorMessage: err.message });
		});
	}

	render() {
		return (
			<div>
				{this.state.loginError &&
				(<h3>{this.state.loginErrorMessage}</h3>)
				}
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
									<EmailRounded/>
								</InputAdornment>
							)
						}}
						style={{ width: "400px" }}
					/>
					<br/>
					<br/>
					<TextField
						required
						id="password"
						label="Password"
						type={this.state.showPassword ? "text" : "password"}
						name="password"
						onChange={this.onChange}
						error={this.state.errorPassword}
						helperText={
							this.state.errorPassword
								? "Invalid password"
								: ""
						}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Lock/>
								</InputAdornment>
							),
						}}
						style={{ width: "400px" }}
					/>
					<br/>
					<br/>
					<Button
						variant="contained"
						color="secondary"
						style={{ marginTop: "40px" }}
						type="submit"
						disabled={this.state.errorPassword || this.state.errorEmail}
					>
						Login
					</Button>
				</form>
			</div>
		);
	}
}

export default Login;
