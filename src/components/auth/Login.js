import React from 'react';
import { connect } from 'react-redux';
import {
	updateEmail,
	updatePassword
} from '../../actions/authActions';

class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e){
        if(e.target.name === 'email')
            updateEmail(e.target.value);
        else
            updatePassword(e.target.value);
	}

	onSubmit(e){
		e.preventDefault();
		this.props.history.push('/dashboard');
	}

	render(){
		return(
			<div>
				<form onSubmit={this.onSubmit}>
					Email
					<br />
					<input type="email" placeholder="" name="email"
						onChange={ this.onChange } value={ this.props.user}/>
					<br />
					Password
					<br />
					<input type="password" placeholder="" name="password"
						onChange={ this.onChange } value={ this.props.password}/>
					<br />
                    <button type="submit">Login</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.newUsername,
		password: state.newPassword
	}
}

export default connect(mapStateToProps)(LoginForm);
