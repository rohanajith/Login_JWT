import React, { Component } from 'react';
import Nav from './components/Nav/Nav';
import LoginForm from './components/LoginForm/loginForm';
import SignupForm from './components/SignupForm/signupForm';
import './App.css';

let checkVal_login = 0,checkVal_signup = 0
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      credentials_checker:0,
      existing_username:0
    };
  }


  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/login/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if(json.username !== undefined)
           this.setState({ username: json.username })
         else{
           this.setState({ username: " ",logged_in:false })
         }
        }); 
    }
  }


  handle_login = (e, data) => {
    e.preventDefault();
    if(data){
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        if(json.user === undefined){
          checkVal_login = 1;
          this.setState({
            logged_in: false,
            displayed_form:'login',
            credentials_checker:1,

          });
       }else if(json.user){
         this.setState({
            logged_in: true,
            displayed_form: '',
            username: json.user.username
          });
       }
      });
    }
  }


  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };


  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/login/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {

        localStorage.setItem('token', json.token);
        if(typeof(json.token) === "string"){
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username,
        });
        }else{
          checkVal_signup = 1;
          this.setState({logged_in:false,username:json.username,existing_username:1,displayed_form:'signup'})
        }
      });
  };


  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };


  check = _ =>{
     checkVal_login = 0;
     checkVal_signup = 0;
  }

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          <p className="display">{this.state.logged_in ? `Hello, ${this.state.username}`: ' '}</p>
          {checkVal_login ? <div><p className="message">Wrong Username or Password</p>{this.check()}</div> : " "}
          {checkVal_signup ? <div><p className="message">Username already exists</p>{this.check()}</div> : " "}
        </h3>
      </div>
    );
  }
}

export default App;
