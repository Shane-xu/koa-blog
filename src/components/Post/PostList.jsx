import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { format } from 'date-fns'
import { Pagination } from '../common'
import { CONF_DATE } from '../../constants/Conf'
import {
  PAGE,
  PAGE_SIZE
} from '../../constants/Pagination'

const propTypes = {
  fetchPosts: PropTypes.func,
}

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        page: PAGE,
        pageSize: PAGE_SIZE,
        total: 0,
      },
      posts: []
    }
  }

  componentWillMount() {
    this.loadPostData()
  }

  loadPostData = (params) => {
    const { fetchPosts } = this.props
    fetchPosts && fetchPosts(params || this.state.params)
      .then((response) => {
        this.setState({
          params: response.page,
          posts: response.items,
        })
      })
      .catch(err => console.error(err))
  }

  renderPost() {
    const { posts } = this.state
    return posts.map(post => (
      <div className="post" key={post._id}>
        <h1 className="post-title">
          <Link to={{ pathname: `post/${post._id}` }}>
            {post.title}
          </Link>
        </h1>
        <div className="post-meta">
          {format(post.createTime, CONF_DATE)}
        </div>
        <div className="post-content">
          <p>
            {post.desc}
          </p>
        </div>
        <p className="readmore">
          <Link to={{ pathname: `post/${post._id}` }}>
            阅读全文
          </Link>
        </p>
      </div>
    ))
  }

  renderPagination() {
    const { page, total } = this.state.params
    return (
      <Pagination
        page={page}
        total={total}
      />
    )
  }

  render() {
    return (
      <div className="content_container">
        {this.renderPost()}
        {this.renderPagination()}
      </div>
    )
  }
}

PostList.propTypes = propTypes
export default PostList
