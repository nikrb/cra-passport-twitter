import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import Profile from './containers/ProfilePage';
import Auth from './modules/Auth';

export default class App extends Component {
  state = {
    is_logged_in : Auth.isUserAuthenticated()
  };

  logout = () => {
    Auth.deauthenticateUser();
    this.setState( {is_logged_in: false});
  };
  // FIXME: this is horrible right?
  login = () => {
    this.setState( {is_logged_in: true});
  };

  render() {
    return (
      <Router>
        <div>
          <div className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              { Auth.isUserAuthenticated()?
                <li onClick={this.logout}>Logout</li>:
                <li><Link to="/login">Login</Link></li>
              }
              { Auth.isUserAuthenticated()?"":<li><Link to="/signup">Signup</Link></li> }
            </ul>
          </div>

          <hr/>

          <Route exact path="/" component={HomePage}/>
          <Route path="/login" render={props=>
              <LoginPage {...props} onLogin={this.login} />} />
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
