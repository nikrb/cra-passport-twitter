import React from 'react';
import {Redirect} from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Actions from './Actions';
import Auth from '../modules/Auth';

export default class LoginPage extends React.Component {
  state = {
    errors: {},
    user: { email: "", password:""},
    redirectToReferrer: false
  };
  componentWillMount = () => {
    console.log( "LoginPage props:", this.props);
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
    Actions.postLogin( {email, password})
    .then( (response) => {
      console.log( "login response:", response);
      Auth.authenticateUser( response.token);
      this.setState( { errors: {}, redirectToReferrer: true});
      this.props.onLogin();
    })
    .catch( (err) => {
      console.error( "login failed:", err);
    });
  };
  render = () => {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      );
    }
    return (
      <LoginForm onSubmit={this.processForm} onChange={this.changeUser}
        user={this.state.user} errors={this.state.errors} />
    );
  };
}
