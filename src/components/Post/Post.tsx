import * as React from 'react'
import marked from 'marked'
import _ from 'lodash'
import { format } from 'date-fns'
import hljs, { COMMENT } from 'highlight.js'
import { Link, RouteComponentProps } from 'react-router'
import { Loading } from '../common'
import { CONF_DATE } from '../../constants/Conf'
import { scrollTo } from '../../utils/dom'
import Comment from './Comment'
import { IPost, IComment, ITag } from '../../models'

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
})
type Params = {
  id: string
}

interface Props extends RouteComponentProps<Params, void> {
  onFetchPostById: (id: string) => Promise<object>
  onAddVisitCount: (id: string) => Promise<object>
  onAddComment: (commnet: IComment) => Promise<object>
  onFetchCommentsByPostId: (id: string) => Promise<object>
}

interface State {
  post?: IPost
  prev?: IPost
  next?: IPost
  loading: boolean
  visitCount?: number | null
  commentList?: Array<IComment>
}

class Post extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      post: {},
      prev: {},
      next: {},
      loading: true,
      visitCount: null,
      commentList: [],
    }
  }

  componentWillMount() {
    this.loadPost()
  }

  componentWillReceiveProps(nextProps: Props) {
    const { params } = nextProps
    // TODO: props 路由对象如何处理
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

  loadPost = (id: string = '') => {
    const { params, onFetchPostById, onFetchCommentsByPostId } = this.props
    if (!params.id) {
      throw new Error('post id should be exist')
    }
    id = id || params.id

    onFetchPostById &&
      onFetchPostById(id).then((res: any) => {
        this.setState({
          post: res.post,
          loading: false,
          prev: res.prev,
          next: res.next,
        })
        this.handleVisitCount(id)
      })

    onFetchCommentsByPostId(id).then((res: any) => {
      this.setState({
        commentList: res.items,
      })
    })
  }

  handleVisitCount = (id: string) => {
    const { onAddVisitCount } = this.props
    onAddVisitCount &&
      onAddVisitCount(id).then((res: any) => {
        this.setState({
          visitCount: res.visitCount,
        })
      })
  }

  renderContent() {
    const { post } = this.state
    if (_.isUndefined(post)) {
      return null
    } else {
      const content = marked(post.content || '')
      return (
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )
    }
  }

  renderMeta() {
    const { post, visitCount } = this.state

    return (
      post && (
        <div className="post-meta">
          {post.createTime && format(post.createTime, CONF_DATE)}
          <span>&nbsp;|&nbsp;</span>
          <span className="category">
            <Link
              to={{
                pathname: '/archives',
                query: {
                  category: post.category ? post.category._id : '',
                },
              }}
            >
              {post.category && post.category.name}
            </Link>
          </span>
          <span id="leancloud_counter">
            &nbsp;|&nbsp;
            <span id="leancloud_value_page_pv">{visitCount}</span>
            <span> Views</span>
          </span>
        </div>
      )
    )
  }

  renderTags() {
    const { post = {} } = this.state
    const { tags } = post
    const tagsItems =
      tags &&
      tags.map((tag: ITag) => (
        <Link
          to={{
            pathname: '/archives',
            query: {
              tag: tag._id,
            },
          }}
          key={tag._id}
        >
          {tag.name}
        </Link>
      ))

    return <div className="tags">{tagsItems}</div>
  }

  renderPostNav() {
    const { prev, next } = this.state
    return (
      <div className="post-nav">
        {prev && (
          <Link className="pre" to={{ pathname: `post/${prev._id}` }}>
            {prev.title}
          </Link>
        )}
        {next && (
          <Link className="next" to={{ pathname: `post/${next._id}` }}>
            {next.title}
          </Link>
        )}
      </div>
    )
  }

  renderComment() {
    const { commentList = [], post = {} } = this.state
    const { onAddComment } = this.props
    return (
      <Comment
        commentList={commentList}
        addComment={onAddComment}
        post={post._id}
      />
    )
  }

  render() {
    const { post, loading } = this.state

    if (loading) {
      return <Loading />
    }
    return (
      <div className="content_container">
        <div className="post">
          <div className="post-title">{post && post.title}</div>
          {this.renderMeta()}
          <div className="post-content">{this.renderContent()}</div>
          {this.renderTags()}
          {this.renderPostNav()}
          {this.renderComment()}
        </div>
      </div>
    )
  }
}

export default Post
