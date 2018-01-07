import React, { Component } from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import { format } from 'date-fns'
import { CONF_DATE } from '../../constants/Conf'

const propTypes = {
  params: PropTypes.object,
  fetchPostById: PropTypes.func
}

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {}
    }
  }

  componentWillMount() {
    this.loadPost()
  }

  loadPost = () => {
    const { params, fetchPostById } = this.props
    if (!params.id) {
      throw new Error('post id should be exist')
    }
    fetchPostById && fetchPostById(params.id)
      .then((res) => {
        this.setState({
          post: res.post
        })
      })
  }

  renderContent() {
    const { post } = this.state
    if (!post.content) {
      return null;
    }
    const content = marked(post.content)
    return (
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: content }} />
    )
  }

  render() {
    const { post } = this.state
    return (
      <div className="content_container" >
        <div className="post" >
          <div className="post-title">
            {post.title}
          </div>
          <div className="post-meta">
            {format(post.createTime, CONF_DATE)}
          </div>
          <div className="post-content">
            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = propTypes
export default Post
