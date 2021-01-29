import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class MyPage extends Component {
  state = {
    email: '',
    userName: '',
    createdAt: '',
    writePost: [],
  };

  async componentDidMount() {
    // get 요청
    try {
      const getInfo = await axios.get('https://localhost:4000/user/info', {
        withCredentials: true,
      });
      const { userInfo, boardInfo } = getInfo.data;
      this.setState({
        email: userInfo.email,
        userName: userInfo.userName,
        createdAt: userInfo.createdAt,
        writePost: this.state.writePost.concat(...boardInfo),
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    let list = this.state.writePost.map((el) => {
      return (
        <tr key={el.id}>
          <td>{el.id}</td>
          <td>
            <Link
              to="/detailpost"
              className="postTitle"
              onClick={() => this.props.handlePostNumber(el.id)}
            >
              {el.title}
            </Link>
          </td>
          <td>{this.state.userName}</td>
          <td>{el.createdAt.slice(0, 10)}</td>
          <td>{el.hitCount}</td>
          <td>{el.likeCount}</td>
        </tr>
      );
    });
    return (
      <div>
        <div className="userInfo">
          <div className="email">{this.state.email}</div>
          <div className="userName">{this.state.userName}</div>
          <div className="createdAt">{this.state.createdAt.slice(0, 10)}</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>글 번호</th>
              <th>제 목</th>
              <th>작성자</th>
              <th>작성일자</th>
              <th>조회수</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <tbody className="tableBody">{list}</tbody>
        </table>
      </div>
    );
  }
}
export default MyPage;
