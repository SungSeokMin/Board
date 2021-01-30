import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Post extends Component {
  render() {
    const lists = this.props.boardList.map((list) => {
      return (
        <TableRow key={list.id}>
          <TableCell>{list.id}</TableCell>
          <TableCell>
            <Link
              to="/detailpost"
              className="postTitle"
              onClick={() => this.props.handlePostNumber(list.id)}
            >
              {list.title}
            </Link>
          </TableCell>
          <TableCell>{list.user.userName}</TableCell>
          <TableCell>{list.createdAt.slice(0, 10)}</TableCell>
          <TableCell>{list.hitCount}</TableCell>
          <TableCell>{list.likeCount}</TableCell>
        </TableRow>
      );
    });
    return (
      <div>
        {' '}
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
            <TableBody className="tableBody">{lists}</TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
export default Post;
