import React, { Component } from 'react';

class AddPost extends Component {
  state = {
    title: '',
    content: '',
  };
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  render() {
    const { title, content } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={this.handleInputValue('title')}
          required
        />
        <input
          type="text"
          placeholder="content"
          onChange={this.handleInputValue('content')}
          required
        />
        <button onClick={() => this.props.handleAddPost(title, content)}>
          날려 ~{' '}
        </button>
      </div>
    );
  }
}

export default AddPost;
