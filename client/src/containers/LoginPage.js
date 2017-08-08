import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';

export default class LoginPage extends React.Component {
  state = {
    errors: {},
    user: { email: "", password:""}
  };
  changeUser = ( event) => {
    // event target name not user name!
    const {name, value} = event.target;
    const user = this.state.user;
    user[name] = value;
    this.setState( {user});
  };
  processForm = (event) => {
    event.preventDefault();
    const {email, password} = this.state.user;
    console.log( `email:[${email}] password:[${password}]`);
  };
  render = () => {
    return (
      <LoginForm onSubmit={this.processForm} onChange={this.changeUser}
        user={this.state.user} errors={this.state.errors} />
    );
  };
}
