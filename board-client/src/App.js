import React, { Component } from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import { Route, Switch, withRouter } from 'react-router-dom';
import SignIn from './pages/user/SignIn';
import SignUp from './pages/user/SignUp';
import MyPage from './pages/user/MyPage';
import Post from './pages/board/Post';
import AddPost from './pages/board/addPost';
import DetailPost from './pages/board/DetailPost';
import './App.css';
import UpdatePost from './pages/board/UpdatePost';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      boardList: [],
      // 로그인 할 때의 session 값
      session: null,
      // 해당 게시물에 대한 id 값
      id: null,
      title: '',
      content: '',
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

  handleLoginCheck = (session) => {
    this.setState({ isLogin: true, session });
  };

  handleLogout = async () => {
    await axios.post('https://localhost:4000/user/signout', null, {
      'Content-Type': 'application/json',
      withCredentials: true,
    });

    this.setState({
      isLogin: false,
      session: null,
    });
    this.props.history.push('/');
  };

  handlePostNumber = (id) => {
    this.setState({ id });
  };

  async componentDidUpdate() {
    try {
      const readPost = await axios.get(
        'https://localhost:4000/board/readPost',
        {
          withCredentials: true,
        }
      );
      this.setState({
        ...this.state,
        boardList: [...readPost.data.data],
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleDeletePost = async (id) => {
    try {
      await axios.post(
        'https://localhost:4000/board/deletePost',
        {
          id,
        },
        {
          withCredentials: true,
        }
      );
      // 게시글을 삭제 한 후 setState가 한번 발생 후 render가 된 상태로 홈페이지로 가야한다.
      this.props.history.go(-1);
    } catch (err) {
      console.log(err);
    }
  };

  handleUpdateTitle = async (title, content) => {
    this.setState({ title, content });
  };

  handleAddPost = async (title, content) => {
    try {
      await axios.post(
        'https://localhost:4000/board/addPost',
        {
          title,
          content,
        },
        {
          withCredentials: true,
        }
      );
      this.props.history.go(-1);
    } catch (err) {
      console.log(err);
    }
  };

  handleUpdatePost = async (title, content) => {
    try {
      await axios.post(
        'https://localhost:4000/board/updatePost',
        {
          title,
          content,
        },
        {
          withCredentials: true,
        }
      );
      this.props.history.go(-1);
    } catch (err) {
      console.log(err);
    }
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
            render={() => (
              <DetailPost
                handleUpdateTitle={this.handleUpdateTitle}
                handleDeletePost={this.handleDeletePost}
                sessionId={this.state.session}
                id={this.state.id}
              />
            )}
          />
          <Route
            path="/addpost"
            render={() => <AddPost handleAddPost={this.handleAddPost} />}
          />
          <Route
            path="/updatepost"
            render={() => (
              <UpdatePost
                handleUpdatePost={this.handleUpdatePost}
                title={this.state.title}
                content={this.state.content}
              />
            )}
          />
        </Switch>
        {/*// ! signup/ mypage/ signin 에서는 게시글을 보여줄 필요가 없음  } withRouter */}
      </div>
    );
  }
}
export default withRouter(App);
