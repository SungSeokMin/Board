import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      boardList: null,
    };
  }

  componentDidMount() {
    axios.get('https://localhost:4000/board/readPost');
  }
  render() {
    return <div>ㅁㄴㅇ</div>;
  }
}
export default App;
