import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, NavLink } from 'react-router-dom';
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
              <div className="nav-box">
                <li><NavLink to="/" exact>Home</NavLink></li>
                <li><NavLink to="/profile" exact>Profile</NavLink></li>
              </div>
              <div className="nav-box">
                { Auth.isUserAuthenticated()?
                  <li onClick={this.logout}>Logout</li>:
                  <li><NavLink to="/login" exact>Login</NavLink></li>
                }
                { Auth.isUserAuthenticated()?"":
                  <li><NavLink to="/signup" exact>Signup</NavLink></li>
                }
              </div>
            </ul>
          </div>

          <hr/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/login" render={props=>
                <LoginPage {...props} onLogin={this.login} />} />
            <Route path="/signup" component={SignupPage} />
            <AuthRoute path="/profile" component={Profile} />
            <Route path="*" render={props => <Redirect to='/' {...props} /> } />
          </Switch>
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
