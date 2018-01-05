import React, { Component } from 'react'
import { Link } from 'react-router'

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [{
        id: 1,
        title: 'post1',
        desc: 'post desc',
        createTime: Date.now(),
      },
      {
        id: 2,
        title: 'post1',
        desc: 'post desc',
        createTime: Date.now(),
      },
      {
        id: 3,
        title: 'post1',
        desc: 'post desc',
        createTime: Date.now(),
      }, {
        id: 4,
        title: 'post1',
        desc: 'post desc',
        createTime: Date.now(),
      }, {
        id: 5,
        title: 'post1',
        desc: 'post desc',
        createTime: Date.now(),
      }]
    }
  }

  renderPost() {
    const { posts } = this.state
    return posts.map(post => (
      <div className="post" key={post.id}>
        <div className="post-title">
          {post.title}
        </div>
        <div className="post-meta">
          {post.createTime}
        </div>
        <div className="post-content">
          <p>
            {post.desc}
          </p>
        </div>
        <p className="readmore">
          <Link to={{ pathname: `post/${post.id}` }}>
            阅读全文
          </Link>
        </p>
      </div>
    ))
  }

  render() {
    return (
      <div className="content_container">
        {this.renderPost()}
      </div>
    )
  }
}

export default PostList
