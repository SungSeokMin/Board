import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.jpeg';
class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <img src={logo} alt="logo" />
        <p className="title">게시판</p>
        {this.props.isLogin ? (
          <div className="btn-box">
            <Link className="link-btn" to="/mypage">
              My Page
            </Link>
            <button
              className="link-btn"
              onClick={() => this.props.handleLogout()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="btn-box">
            <Link className="link-btn" to="/signin">
              Sign In
            </Link>
            <Link className="link-btn" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    );
  }
}
export default Nav;
