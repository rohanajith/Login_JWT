import React from 'react';
import PropTypes from 'prop-types';
import './SignUpForm.css'

class signupForm extends React.Component{
	constructor(){
		super();
		this.state={
			username:'',
			password:''
		}
	}
	handleChange = e =>{
		const name = e.target.name
		const value = e.target.value
		this.setState(prevState => {
			const newState = {...prevState};
			newState[name] = value;
			return newState;
		})
	}
	render(){
		return(
			<form onSubmit = {e => this.props.handle_signup(e,this.state)}> 
				<h2>Signup</h2>
				<div className = "formposition">
					<p>Username <br/>
						<input type="text"
						name = "username"
						required
						value = {this.state.value}
						onChange = {this.handleChange}/>
					</p>
					<p>Password <br/>
						<input type="password"
						name = "password"
						required
						value = {this.state.password}
						onChange = {this.handleChange}/>
					</p>
					<p><input type="submit"/></p>
				</div>
			</form>
		);
	}
}
export default signupForm;

signupForm.propTypes = {
	handle_signup : PropTypes.func.isRequired
}