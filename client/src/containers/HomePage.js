import React from 'react';

export default class HomePage extends React.Component {
  render = () => {
    return (
      <div className="App">
        <h1>React Auth</h1>
        This is the home page
        <div>
          <a href="http://localhost:5000/apo/login" >Twitter Login</a>
        </div>
      </div>
    );
  };
}
