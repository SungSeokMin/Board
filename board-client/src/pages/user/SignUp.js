import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName: '',
      errorMessage: '',
    };
  }
  vaildateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  // ? InputValueChange
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  // ? SingUp Button Click
  handleSignUp = () => {};
  render() {
    return (
      <div>
        <center>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign Up</h1>
            <input
              type="email"
              onChange={this.handleInputValue('email')}
              placeholder="email"
            />
            <input
              type="password"
              onChange={this.handleInputValue('password')}
              placeholder="password"
            />
          </form>
        </center>
      </div>
    );
  }
}
export default withRouter(SignUp);
