import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UpdatePost extends Component {
  state = {
    title: this.props.title,
    content: this.props.content,
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    console.log(this.props);
    const { title, content } = this.state;
    return (
      <div>
        <input
          type="text"
          value={title}
          placeholder="title"
          onChange={this.handleInputValue('title')}
          required
        />
        <input
          type="text"
          value={content}
          placeholder="content"
          onChange={this.handleInputValue('content')}
          required
        />
        <button onClick={() => this.props.handleUpdatePost(title, content)}>
          날려 ~{' '}
        </button>
      </div>
    );
  }
}
export default withRouter(UpdatePost);
