import React from "react";
import { connect } from "react-redux";
import {
	updateEmail,
	updatePassword,
	updateToken,
	updateTokenExpiration,
	updateUserId
} from "../../redux/actions/auth-actions";
import { Button } from "@material-ui/core";
import store from "../../redux/store";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailRounded from "@material-ui/icons/EmailRounded";
import Lock from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";

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
			if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(e.target.value)) {
				this.setState({ ...this.state, errorEmail: true });
				updateEmail(e.target.value);
			} else {
				this.setState({ ...this.state, errorEmail: false });
			}
		} else {
			updatePassword(e.target.value);
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const email = store.getState().signup.email;
		const password = store.getState().signup.newPassword;
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
		}).then(res => {
			if (res.status !== 200 && res.status !== 201) {
				console.log('ERROR');
				throw new Error("Failed!");
			}
			return res.json();
		}).then(resData => {
			console.log(`Login request result: `, resData);

			if (resData.errors && resData.errors.length > 0) {
				let alertMessage = "";
				for (let error in resData.errors) {
					alertMessage += resData.errors[error].message + "\n";
				}
				alert(alertMessage);
			} else if (resData.data.login.token) {
				this.setState({
					flag: resData.data.login
				});
				updateUserId(resData.data.login.userId);
				updateToken(resData.data.login.token);
				updateTokenExpiration(resData.data.login.tokenExpiration);
				this.props.history.push("/dashboard");
			} else {
				alert('Something went wrong');
			}
		}).catch(err => {
			console.log("Login error: ", err);
			alert("Something went wrong");
		});
	}

	render() {
		return (
			<div style={{ marginTop: "140px" }}>
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
						value={this.props.email}
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
									<Lock/>
								</InputAdornment>
							),
							endAdornment: (
								<IconButton
									aria-label="toggle password visibility"
									onClick={this.handlePasswordClick}
									onMouseDown={this.handleMouseDownPassword}
								>
									{this.state.showPassword ? (
										<VisibilityOff/>
									) : (
										<Visibility/>
									)}
								</IconButton>
							)
						}}
						style={{ width: "400px" }}
					/>
					<br/>
					<br/>
					<Button
						variant="contained"
						color="primary"
						style={{ marginTop: "40px" }}
						type="submit"
					>
						Login
					</Button>
				</form>
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
