import React, { Component } from 'react';
import axios from 'axios';

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
        <div className="table" key={el.id}>
          <p>{el.id}</p>
          <p>{el.title}</p>
          <p>{this.state.userName}</p>
          <p>{el.createdAt.slice(0, 10)}</p>
          <p>{el.hitCount}</p>
          <p>{el.likeCount}</p>
        </div>
      );
    });
    return (
      <div>
        <div>
          <div className="email">{this.state.email}</div>
          <div className="userName">{this.state.userName}</div>
          <div className="createdAt">{this.state.createdAt.slice(0, 10)}</div>
        </div>
        {list}
      </div>
    );
  }
}
export default MyPage;
