import React, { Component } from 'react'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {}
    }
  }
  render() {
    return (
      <div className="content_container" >
        <div className="post" >
          <div className="post-title">
            post title
          </div>
          <div className="post-meta">
            201523423
          </div>
          <div className="post-content">
            post content
          </div>
        </div>
      </div>
    )
  }
}

export default Post
