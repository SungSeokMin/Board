import axios from 'axios';
import React, { Component } from 'react';

class DetailPost extends Component {
  state = {
    title: '',
    content: '',
    userName: '',
    hitCount: '',
    likeCount: '',
    createdAt: '',
  };
  componentDidMount() {
    axios
      .post(
        'https://localhost:4000/board/detailPost',
        { id: this.props.id },
        { withCredentials: true }
      )
      .then((res) => {
        const {
          title,
          content,
          user,
          hitCount,
          likeCount,
          createdAt,
        } = res.data.data;
        this.setState({
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
    const {
      title,
      content,
      userName,
      hitCount,
      likeCount,
      createdAt,
    } = this.state;
    console.log(userName);
    let date = `${createdAt.slice(0, 10)} ${createdAt.slice(11, 16)}`;
    return (
      <div className="detailPage">
        <div className="detail_header">
          <h2>{title}</h2>
          <p>{userName}</p>
          <p>{date}</p>
          <p>{hitCount}</p>
        </div>
        <div className="detail_content">
          <p>{content}</p>
        </div>
      </div>
    );
  }
}
export default DetailPost;
