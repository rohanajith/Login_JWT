import React from 'react';
import PropTypes from 'prop-types';
import './loginForm.css'

class loginForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username:'',
			password:''
		};
	}
	handleChange = e =>{
		const name = e.target.name;
		const value = e.target.value;
		this.setState((prevState) => {
			const newState = {...prevState};
			newState[name] = value;
			return newState;
		})
	}
	render(){
		return(

			<form onSubmit = {e => this.props.handle_login(e,this.state)}>
				<h2 id="head">Login</h2>
				<div className="formposition">
					<p>Username <br/>
						 <input type="name" 
						name = "username"
						required
						value = {this.state.username} 
						onChange = {this.handleChange}/>
					</p>
					<p>Password <br/>
						<input type = "password" 
						name = "password"
						required
						value = {this.state.password}
						onChange = {this.handleChange}
						/></p>
					<p><input type = "submit"/></p>
				</div>
			</form>
		);
	}
}

export default loginForm;

loginForm.propTypes={
	handle_login : PropTypes.func.isRequired
}