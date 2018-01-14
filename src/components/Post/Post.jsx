import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import marked from 'marked'
import { format } from 'date-fns'
import hljs from 'highlight.js'
import { Link } from 'react-router'
import { Loading } from '../common'
import { CONF_DATE } from '../../constants/Conf'
import { scrollTo } from '../../utils/dom'

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
})

const propTypes = {
  params: PropTypes.object,
  onFetchPostById: PropTypes.func,
  onAddVisitCount: PropTypes.func
}

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {},
      prev: null,
      next: null,
      loading: true,
      visitCount: null,
    }
  }

  componentWillMount() {
    this.loadPost()
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps

    if (params.id !== this.props.params.id) {
      this.setState({
        loading: true,
      })
      this.loadPost(params.id)
    }
  }

  componentDidUpdate() {
    scrollTo()
  }

  loadPost = (id) => {
    const { params, onFetchPostById } = this.props
    if (!params.id) {
      throw new Error('post id should be exist')
    }
    onFetchPostById && onFetchPostById(id || params.id)
      .then((res) => {
        this.setState({
          post: res.post,
          loading: false,
          prev: res.prev,
          next: res.next,
        })
        this.handleVisitCount(params.id)
      })
  }



  handleVisitCount = (id) => {
    const { onAddVisitCount } = this.props
    onAddVisitCount && onAddVisitCount(id)
      .then((res) => {
        this.setState({
          visitCount: res.visitCount
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

  renderMeta() {
    const { post, visitCount } = this.state
    return (
      <div className="post-meta">
        {format(post.createTime, CONF_DATE)}
        <span>&nbsp;|&nbsp;</span>
        <span className="category" >
          <Link
            to={{
              pathname: '/archives',
              query: {
                category: post.category._id
              }
            }}
          >
            {post.category.name}
          </Link>
        </span>
        <span id="leancloud_counter">
          &nbsp;|&nbsp;
          <span id="leancloud_value_page_pv">
            {visitCount}
          </span>
          <span> Views</span>
        </span>
      </div>
    )
  }

  renderTags() {
    const { tags } = this.state.post
    const tagsItems = tags.map(tag => (
      <Link
        to={{
          pathname: '/archives',
          query: {
            tag: tag._id
          }
        }}
        key={tag._id}
      >
        {tag.name}
      </Link>
    ))

    return (
      <div className="tags">
        {tagsItems}
      </div>
    )
  }

  renderPostNav() {
    const { prev, next } = this.state
    return (
      <div className="post-nav" >
        {
          prev && (
            <Link
              className="prev"
              to={{ pathname: `post/${prev._id}` }}
            >
              {prev.title}
            </Link>
          )
        }
        {
          next && (
            <Link
              className="next"
              to={{ pathname: `post/${next._id}` }}
            >
              {next.title}
            </Link>
          )
        }
      </div>
    )
  }

  render() {
    const { post, loading } = this.state

    if (loading) {
      return <Loading />
    }
    return (
      <div className="content_container" >
        <div className="post" >
          <div className="post-title">
            {post.title}
          </div>
          {this.renderMeta()}
          <div className="post-content">
            {this.renderContent()}
          </div>
          {this.renderTags()}
          {this.renderPostNav()}
        </div>
      </div>
    )
  }
}

Post.propTypes = propTypes
export default Post
