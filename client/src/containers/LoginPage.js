import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import Actions from './Actions';
import Auth from '../modules/Auth';

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
    Actions.postLogin( this.state.user)
    .then( (response) => {
      this.setState( { errors: {}});
      console.log( "login response:", response);
      Auth.authenticateUser( response.token);
    })
    .catch( (err) => {
      console.error( "login failed:", err);
    });
  };
  render = () => {
    return (
      <LoginForm onSubmit={this.processForm} onChange={this.changeUser}
        user={this.state.user} errors={this.state.errors} />
    );
  };
}
