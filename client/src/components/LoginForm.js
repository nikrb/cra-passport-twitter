import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    user: PropTypes.object,
    errors: PropTypes.object
  };
  render = () => {
    const {onSubmit,onChange,user,errors} = this.props;
    const spacer = {
      paddingTop: "1em",
      borderTop: "1px solid darkgrey"
    };
    const nodec = { textDecoration: "none"};
    // TODO: show signup success
    return (
      <div className="container" >
        <h2>Login</h2>
        <div className="link-btn">
          <a style={nodec} rel="external" href="http://localhost:5000/apo/login" >Login with Twitter</a>
        </div>
        <div style={spacer}>
          <form action="/" onSubmit={onSubmit} >
            {errors.summary && <p className="error-message">{errors.summary}</p>}
            <div className="form-row">Email
              <input type="text" name="email"
                value={user.email} onChange={onChange} />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-row">Password&nbsp;
              <input type="password" name="password"
                value={user.password} onChange={onChange} />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            <div style={{margin:"10px"}}>
              <button type="submit" >Login</button>
            </div>
            <div style={{fontSize:"12px",textAlign:"center"}}>
              Dont have an account? <Link to={"/signup"}>Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    );
  };
}
