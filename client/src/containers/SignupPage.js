import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from '../components/SignupForm';

export default class SignupPage extends React.Component {
  state = {
    errors: {},
    user: {
      email: "",
      name: "",
      password: ""
    }
  };
  changeUser = ( event) => {
    // event target name, not user name!
    const {name, value} = event.target;
    const user = this.state.user;
    user[name] = value;
    this.setState( {user});
  };
  processForm = (event) => {
    event.preventDefault();
    const {name, email, password} = this.state.user;
    console.log( `name:[${name}] email:[${email}] password:[${password}]`);
  };
  render = () => {
    return (
      <SignupForm onSubmit={this.processForm} onChange={this.changeUser}
        user={this.state.user} errors={this.state.errors} />
    );
  };
}
