import React from 'react';
import { connect } from 'react-redux';
import {
	updateUsername,
	updatePassword,
	updateConfirmPassword
} from '../../actions/authActions';

class SignupForm extends React.Component{
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e){
		switch(e.target.name){
			case 'username':
				updateUsername(e.target.value);
				break;

			case 'password':
				updatePassword(e.target.value);
				break;

			default:
				updateConfirmPassword(e.target.value);
		}
	}

	onSubmit(e){
		e.preventDefault();
		console.log(this);
		this.props.history.push('/dashboard');
	}

	render(){
		return(
			<div>
				<form onSubmit={this.onSubmit}>
					Username
					<br />
					<input type="text" placeholder="" name="username"
						onChange={ this.onChange } value={ this.props.user}/>
					<br />
					Password
					<br />
					<input type="password" placeholder="" name="password"
						onChange={ this.onChange } value={ this.props.password}/>
					<br />
					Confirm password
					<br />
					<input type="password" placeholder="" name="confirmPassword"
						onChange={ this.onChange } value={ this.props.confirmPassword}/>
					<br />
					<button type='submit'>Create my account!</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.newUsername,
		password: state.newPassword,
		confirmPassword: state.confirmPassword
	}
}

export default connect(mapStateToProps)(SignupForm);
