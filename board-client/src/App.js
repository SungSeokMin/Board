import React, { Component } from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import { Redirect, Route, Switch } from 'react-router-dom';
import SignIn from './pages/user/SignIn';
import SignUp from './pages/user/SignUp';
import MyPage from './pages/user/MyPage';
import Post from './pages/board/Post';
import DetailPost from './pages/board/DetailPost';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      boardList: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://localhost:4000/board/readPost', {
        withCredentials: true,
        'Content-Type': 'application/json',
      })
      .then((res) => this.setState({ boardList: res.data.data }))
      .catch((err) => alert(err));
  }
  handleLogout = async () => {
    await axios.post('https://localhost:4000/user/signout', null, {
      'Content-Type': 'application/json',
      withCredentials: true,
    });
    this.setState({ isLogin: false });
    return <Redirect to="/" />;
  };
  render() {
    return (
      <div className="Wrapper">
        <Nav isLogin={this.state.isLogin} handleLogout={this.handleLogout} />
        <Switch>
          <Route path="/mypage" render={() => <MyPage />} />
          <Route path="/signin" render={() => <SignIn />} />
          <Route path="/signup" render={() => <SignUp />} />
        </Switch>
        <Switch>
          <Route path="/" render={() => <Post />} />
          <Route path="detailpost" render={() => <DetailPost />} />
        </Switch>
      </div>
    );
  }
}
export default App;
