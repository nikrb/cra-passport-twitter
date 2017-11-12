import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, NavLink } from 'react-router-dom';
import './App.css';
import HomePage from './containers/HomePage';
import {checkStatus, parseJSON} from './modules/util';

export default class App extends Component {
  render() {
    const right_margin = {
      marginRight: "10px"
    };
    return (
      <Router>
        <div>
          <div className="nav">
            <ul>
              <div className="nav-box">
                <li><NavLink to="/" exact>Home</NavLink></li>
              </div>
              <div className="nav-box">
                <a href="/apo/login" >Twitter Login</a>
              </div>
            </ul>
          </div>

          <hr/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
          </Switch>
        </div>
      </Router>
    );
  }
};
