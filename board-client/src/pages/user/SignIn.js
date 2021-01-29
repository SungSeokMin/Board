import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    errMessage: '',
  };
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleLogin = async () => {
    let inputData = {
      email: this.state.email,
      password: this.state.password,
    };

    for (let [key, value] of Object.entries(inputData)) {
      if (value === '') {
        return this.setState({
          errMessage: `${key} 값이 입력되지 않았습니다.`,
        });
      }
    }

    try {
      const postLogin = await axios.post(
        'https://localhost:4000/user/signin',
        inputData,
        {
          'Content-Type': 'application/json',
          withCredentials: true,
        }
      );

      if (postLogin) {
        const loginId = postLogin.data.data;
        this.props.handleLoginCheck(loginId);
        this.props.history.push('/');
      }
    } catch (err) {
      this.setState({
        errMessage:
          '아이디 또는 비밀번호가 일치하지 않거나, 존재하지 않는 사용자 입니다.',
      });
      console.log(err);
    }
  };
  render() {
    return (
      <div className="signUp">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Sign In</h1>
          <div className="txt_filed">
            <input
              type="email"
              onChange={this.handleInputValue('email')}
              placeholder="email"
              required
            />
          </div>
          <div className="txt_filed">
            <input
              type="password"
              onChange={this.handleInputValue('password')}
              placeholder="password"
              required
            />
          </div>
          <button type="submit" onClick={this.handleLogin}>
            로그인
          </button>
        </form>
        <div className="errMsg">{this.state.errMessage}</div>
      </div>
    );
  }
}
export default withRouter(SignIn);
