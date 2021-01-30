import React, { Component } from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import { Route, Switch, withRouter } from 'react-router-dom';
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
      isLogin: false,
      boardList: [],
      id: 0,
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

  handleLoginCheck = (loginId) => {
    this.setState({ isLogin: true, loginId });
  };

  handleLogout = async () => {
    await axios.post('https://localhost:4000/user/signout', null, {
      'Content-Type': 'application/json',
      withCredentials: true,
    });
    this.setState({
      isLogin: false,
    });
    this.props.history.push('/');
  };

  handlePostNumber = (id) => {
    this.setState({ id });
  };

  render() {
    return (
      <div className="Wrapper">
        <Nav isLogin={this.state.isLogin} handleLogout={this.handleLogout} />
        <Switch>
          <Route
            path="/signin"
            render={() => <SignIn handleLoginCheck={this.handleLoginCheck} />}
          />
          <Route path="/signup" render={() => <SignUp />} />
          <Route
            path="/mypage"
            render={() => <MyPage handlePostNumber={this.handlePostNumber} />}
          />
        </Switch>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Post
                boardList={this.state.boardList}
                handlePostNumber={this.handlePostNumber}
              />
            )}
          />
          <Route
            path="/detailpost"
            render={() => <DetailPost id={this.state.id} />}
          />
        </Switch>
        {/*// ! signup/ mypage/ signin 에서는 게시글을 보여줄 필요가 없음  } withRouter */}
      </div>
    );
  }
}
export default withRouter(App);
