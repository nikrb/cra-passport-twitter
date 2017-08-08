import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class SignupForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    user: PropTypes.object,
    errors: PropTypes.object
  };
  render = () => {
    const {onSubmit,onChange,user,errors} = this.props;
    return (
      <div className="container" >
        <form action="/" onSubmit={onSubmit} >
          <h2>Sign Up</h2>
          {errors.summary && <p className="error-message">{errors.summary}</p>}
          <label>Name
            <input type="text" name="name"
              value={user.name} onChange={onChange} />
          </label>
          <label>Email
            <input type="text" name="email"
              value={user.email} onChange={onChange} />
          </label>
          <label>Password
            <input type="password" name="password"
              value={user.password} onChange={onChange} />
          </label>
          <div>
            <button type="submit" >Create New Account</button>
          </div>
          <div>
            Already have an account? <Link to={"/login"}>Log in</Link>
          </div>
        </form>
      </div>
    );
  };
}
