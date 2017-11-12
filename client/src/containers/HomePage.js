import React from 'react';
import {checkStatus, parseJSON} from '../modules/util';

export default class HomePage extends React.Component {
  authClick = () => {
    fetch( "/apo/user")
    .then( checkStatus)
    .then( parseJSON)
    .then( (response) => {
      console.log( "/apo/user response:", response);
    })
    .catch( (err) => {
      console.log( "/apo/user failed:", err);
    });
  };
  render = () => {
    return (
      <div className="App">
        <h1>React Auth</h1>
        This is the home page
        <button onClick={this.authClick} >
          authed?
        </button>
      </div>
    );
  };
}
