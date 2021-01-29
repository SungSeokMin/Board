import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName: '',
      emailCheck: '',
      errorMessage: '',
    };
  }
  vaildateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  // ? InputValueChange
  handleInputValue = (key) => (e) => {
    if (key === 'email') {
      if (this.vaildateEmail(e.target.value)) {
        this.setState({ emailCheck: '유요한 이메일 입니다.' });
      } else {
        this.setState({ emailCheck: '유요하지 않은 이메일 입니다.' });
      }
    }
    this.setState({ [key]: e.target.value });
  };

  // ? SingUp Button Click
  handleSignUp = async () => {
    // TODO : Post/ signup
    // email, password, userName을 보낸다.
    let inputData = {
      email: this.state.email,
      password: this.state.password,
      userName: this.state.userName,
      emailcheck: this.state.emailCheck,
    };

    try {
      for (let [key, value] of Object.entries(inputData)) {
        if (key === 'emailCheck') {
          if ((value = '유요한 이메일 입니다.')) {
            return;
          }
        } else if (value === '') {
          return this.setState({
            errorMessage: `${key} 항목이 입력되지 않았습니다.`,
          });
        }
      }

      const postSignUp = await axios.post(
        'https://localhost:4000/user/signup',
        inputData
      );
      if (postSignUp) {
        alert('회원가입이 완료 되었습니다.');
        this.props.history.push('/');
      }
    } catch (err) {
      this.setState({ emailCheck: '중복된 이메일 입니다.' });
      console.log(err);
    }
  };
  render() {
    return (
      <div className="signIn">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Sign Up</h1>
          <div className="txt_filed">
            <input
              type="email"
              onChange={this.handleInputValue('email')}
              placeholder="email"
              required
            />
          </div>
          <div>{this.state.emailCheck}</div>
          <div className="txt_filed">
            <input
              type="password"
              onChange={this.handleInputValue('password')}
              placeholder="password"
              required
            />
          </div>
          <div className="txt_filed">
            <input
              type="text"
              onChange={this.handleInputValue('userName')}
              placeholder="userName"
              required
            />
          </div>
          <button type="submit" onClick={this.handleSignUp}>
            회원가입
          </button>
        </form>
        <div className="errMsg">{this.state.errorMessage}</div>
      </div>
    );
  }
}
export default withRouter(SignUp);
