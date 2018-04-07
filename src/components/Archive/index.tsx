import * as React from 'react'
import _ from 'lodash'
import { format } from 'date-fns'
import { Link, RouteComponentProps } from 'react-router'
import { CONF_DATE } from '../../constants/Conf'
import { Pagination, Loading } from '../common'
import { PAGE, PAGE_SIZE } from '../../constants/Pagination'

interface Props extends RouteComponentProps<void, void> {
  fetchPosts: (params: any) => any
}

interface State {
  params: {
    page?: number
    pageSize?: number
    total?: number
    tag?: string
    category?: string
  }
  posts: Array<any>
  loading: boolean
}
class Archive extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { location } = props
    this.state = {
      params: {
        page: PAGE,
        pageSize: PAGE_SIZE,
        total: 0,
        tag: location.query.tag,
        category: location.query.category,
      },
      posts: [],
      loading: true,
    }
  }
  componentWillMount() {
    const { query } = this.props.location
    if (_.isUndefined(query.tag) || _.isUndefined(query.category)) {
      this.loadPostData()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { query } = nextProps.location
    if (_.isEqual(query, this.props.location.query)) {
      let nextParams = {
        ...this.state.params,
        ...{
          tag: query.tag,
          category: query.category,
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
      // TODO: response 统一声明文件
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
    let nextParams = { ...this.state.params, page }
    this.loadPostData(nextParams)
  }

  renderList() {
    const { posts } = this.state
    return posts.map(post => (
      <li key={post._id}>
        <span className="date">{format(post.createTime, CONF_DATE)}</span>
        <Link to={{ pathname: `post/${post._id}` }}>{post.title}</Link>
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
    const { loading } = this.state

    if (loading) {
      return <Loading />
    }
    return (
      <div className="content_container">
        <div className="post">
          <div className="post-archive">
            <ul className="listing">{this.renderList()}</ul>
          </div>
        </div>
        {this.renderPagination()}
      </div>
    )
  }
}
export default Archive
