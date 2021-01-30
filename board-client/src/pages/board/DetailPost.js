import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
        console.log(res);
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

  handleDeletePost = async () => {
    try {
      const deletePost = await axios.post(
        'https://localhost:4000/board/deletePost',
        {
          id: this.props.id,
        },
        {
          withCredentials: true,
        }
      );
      if (deletePost.status === 200) {
        console.log('hi');
        this.props.history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.props.id);
    const {
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
        <button onClick={this.handleDeletePost}>삭제</button>
      </div>
    );
  }
}
export default withRouter(DetailPost);
