import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import Profile from './containers/ProfilePage';
import Auth from './modules/Auth';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </ul>
          </div>

          <hr/>

          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <AuthRoute path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
