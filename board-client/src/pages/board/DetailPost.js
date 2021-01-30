import axios from 'axios';
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class DetailPost extends Component {
  state = {
    id: '',
    userId: '',
    title: '',
    content: '',
    userName: '',
    hitCount: '',
    likeCount: '',
    createdAt: '',
  };
  componentDidMount() {
    // 해당 게시물에 대한 id
    axios
      .post(
        'https://localhost:4000/board/detailPost',
        { id: this.props.id },
        { withCredentials: true }
      )
      .then((res) => {
        const {
          id,
          userId,
          title,
          content,
          user,
          hitCount,
          likeCount,
          createdAt,
        } = res.data.data;
        this.setState({
          id,
          userId,
          title,
          content,
          userName: user.userName,
          hitCount,
          likeCount,
          createdAt,
        });
      });
  }

  render() {
    // TODO isLogin이 true이고 해당 게시물의 id와 로그인 한 id가 일치할 경우 삭제버튼을 보여준다.
    // props의 id와 state의 id가 같으면
    const {
      id,
      userId,
      title,
      content,
      userName,
      hitCount,
      likeCount,
      createdAt,
    } = this.state;
    let date = `${createdAt.slice(0, 10)} ${createdAt.slice(11, 16)}`;
    return (
      <div className="detailPage">
        <div className="detail_header">
          <h2>{title}</h2>
          <p>{userName}</p>
          <p>{date}</p>
          <p>{hitCount}</p>
          <p>{likeCount}</p>
        </div>
        <div className="detail_content">
          <p>{content}</p>
        </div>
        {userId === this.props.sessionId && (
          <button onClick={() => this.props.handleDeletePost(id)}>삭제</button>
        )}
      </div>
    );
  }
}
export default withRouter(DetailPost);
