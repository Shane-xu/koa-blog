import React, { Component } from 'react'
import { format } from 'date-fns'
import { CONF_DATE } from '../../constants/Conf'
import { Pagination } from '../common'
import {
  PAGE,
  PAGE_SIZE
} from '../../constants/Pagination'

class Archive extends Component {
  constructor(props) {
    super(props)
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

  handlePaginationChange = (page) => {
    const nextParams = { ...this.state.params, page }
    this.loadPostData(nextParams)
  }

  renderList() {
    const { posts } = this.state
    return posts.map(post => (
      <li>
        <span className="date" >
          {format(post.createTime, CONF_DATE)}
        </span>
        <a href="#" title={post.title}>
          {post.title}
        </a>
      </li>
    ))
  }
  renderPagination() {
    const { page, total } = this.state.params
    return (
      <Pagination
        page={page}
        total={total}
        onChange={this.handlePaginationChange}
      />
    )
  }

  render() {
    return (
      <div className="content_container" >
        <div className="post" >
          <div className="post-archive" >
            <ul className="listing" >
              {this.renderList()}
            </ul>
          </div>
        </div>
        {this.renderPagination()}
      </div>
    )
  }
}

export default Archive
