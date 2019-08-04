import React from 'react';
import PropTypes from 'prop-types';
import './Nav.css'

function Nav(props) {
  const logged_out_nav = (
    <ul>
      <li className = "login" onClick={() => props.display_form('login')}><span className="pointer">Login</span></li>
      <li className = "signup"onClick={() => props.display_form('signup')}><span className="pointer">Signup</span></li>
    </ul>
  );

  const logged_in_nav = (
    <ul>
      <li className = "logout" onClick={props.handle_logout}><span className="pointer">Logout</span></li>
    </ul>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};