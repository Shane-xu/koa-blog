import React from 'react'
import PropTypes from 'prop-types'
import { Link, RouteComponentProps } from 'react-router'
import { format } from 'date-fns'
import _ from 'lodash'
import { Pagination, Loading } from '../common'
import { CONF_DATE } from '../../constants/Conf'
import { PAGE, PAGE_SIZE } from '../../constants/Pagination'
import { IPost } from '../../models'

interface Props extends RouteComponentProps<void, void> {
  fetchPosts: (params: object) => Promise<object>
}

interface State {
  params: {
    id: string
    page: number
    pageSize: number
    total: number
  }
  posts: Array<IPost>
  loading: boolean
}

class PostList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const params = {
      ...props.location.query,
      ...{
        page: PAGE,
        pageSize: PAGE_SIZE,
        total: 0,
      },
    }

    this.state = {
      params,
      posts: [],
      loading: true,
    }
  }

  componentWillMount() {
    this.loadPostData()
  }

  componentWillReceiveProps(nextProps: Props) {
    const { query } = nextProps.location
    if (_.isEqual(query, this.props.location.query)) {
      let nextParams = {
        ...this.state.params,
        ...{
          word: query.word,
        },
      }

      this.setState({
        params: nextParams,
      })
      this.loadPostData(nextParams)
    }
  }

  loadPostData = (params = this.state.params) => {
    const { fetchPosts } = this.props
    const nextParams = _.omit(params, 'total')
    fetchPosts &&
      fetchPosts(nextParams)
        .then((response: any) => {
          this.setState({
            params: response.page,
            posts: response.items,
            loading: false,
          })
        })
        .catch((err: any) => console.error(err))
  }

  handlePaginationChange = (page: number) => {
    const nextParams = { ...this.state.params, page }
    this.loadPostData(nextParams)
  }

  renderPost() {
    const { posts } = this.state
    return posts.map(post => (
      <div className="post" key={post._id}>
        <h1 className="post-title">
          <Link to={{ pathname: `post/${post._id}` }}>{post.title}</Link>
        </h1>
        <div className="post-meta">
          {format(post.createTime || '', CONF_DATE)}
        </div>
        <div className="post-content">
          <p>{post.desc}</p>
        </div>
        <p className="readmore">
          <Link to={{ pathname: `post/${post._id}` }}>阅读全文</Link>
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
        onChange={this.handlePaginationChange}
      />
    )
  }

  render() {
    const { loading } = this.state
    if (loading) {
      return <Loading />
    }
    return (
      <div className="content_container">
        {this.renderPost()}
        {this.renderPagination()}
      </div>
    )
  }
}

export default PostList
