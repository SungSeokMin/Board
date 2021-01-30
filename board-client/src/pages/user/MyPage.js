import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class MyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      userName: '',
      createdAt: '',
      writePost: [],
    };
  }

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
        <TableRow key={el.id}>
          <TableCell>{el.id}</TableCell>
          <TableCell>
            <Link
              to="/detailpost"
              className="postTitle"
              onClick={() => this.props.handlePostNumber(el.id)}
            >
              {el.title}
            </Link>
          </TableCell>
          <TableCell>{this.state.userName}</TableCell>
          <TableCell>{el.createdAt.slice(0, 10)}</TableCell>
          <TableCell>{el.hitCount}</TableCell>
          <TableCell>{el.likeCount}</TableCell>
        </TableRow>
      );
    });
    return (
      <div>
        <div className="userInfo">
          <div className="email">{this.state.email}</div>
          <div className="userName">{this.state.userName}</div>
          <div className="createdAt">{this.state.createdAt.slice(0, 10)}</div>
        </div>
        <Paper>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>글 번호</TableCell>
                <TableCell>제 목</TableCell>
                <TableCell>작성자</TableCell>
                <TableCell>작성일자</TableCell>
                <TableCell>조회수</TableCell>
                <TableCell>좋아요</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tableBody">{list}</TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
export default MyPage;
