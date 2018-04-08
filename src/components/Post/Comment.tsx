import * as React from 'react'
import _ from 'lodash'
import { format } from 'date-fns'
import { CONF_DATETIME } from '../../constants/Conf'
import { IComment } from '../../models';

interface Props {
  post?: string
  commentList: Array<IComment>
  addComment: (commnet: IComment) => Promise<any>
}

interface State {
  commentList: Array<IComment>,
  formData: any
}


class Comment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      commentList: props.commentList,
      formData: {},
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { commentList } = this.props
    if (_.isEqual(nextProps.commentList, commentList)) {
      this.setState({
        commentList: nextProps.commentList,
      })
    }
  }

  handleInputChange = (e: React.SyntheticEvent<any>) => {
    const { formData } = this.state
    const name = e.currentTarget.name
    const value = e.currentTarget.value
    const newFormData = { ...formData, ...{ [name]: value } }
    this.setState({
      formData: newFormData,
    })
  }

  handleQuote = (coomment: IComment) => {}

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { formData } = this.state
    const { addComment, post } = this.props
    event.preventDefault()
    const newFormData = { ...formData, ...{ post } }
    addComment(newFormData).then((res: any) => {
      this.setState(prevState => {
        return {
          commentList: prevState.commentList.concat(res.comment),
          formData: {},
        }
      })
    })
  }

  renderCommentList() {
    const { commentList } = this.state
    const items = commentList.map(comment => {
      return (
        <li key={comment._id}>
          <a target="_blank" href={comment.website} className="name">
            {comment.name}
          </a>
          <span className="date">
            {format(comment.createTime || '', CONF_DATETIME)}
          </span>
          <div className="content">{comment.content}</div>
          <span
            role="button"
            tabIndex={-1}
            className="quote"
            onClick={() => this.handleQuote(comment)}
          >
            引用
          </span>
        </li>
      )
    })
    return (
      <div className="comment-list">
        {commentList.length > 0 && (
          <div className="count">共有{commentList.length}条评论</div>
        )}
        <ul>{items}</ul>
      </div>
    )
  }

  renderCommentForm() {
    return (
      <div className="comment-form">
        <h3>发布评论</h3>
        <p>
          电子邮件地址不会被公开。 必填项已用<span>*</span>标注
        </p>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <textarea
              rows={8}
              cols={45}
              name="content"
              id="content"
              placeholder="评论"
              required
              onChange={this.handleInputChange}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="姓名"
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="邮箱"
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="website"
              name="website"
              placeholder="站点"
              onChange={this.handleInputChange}
            />
          </div>
          <input type="submit" value="发表评论" className="submit" />
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="comment">
        {this.renderCommentList()}
        {this.renderCommentForm()}
      </div>
    )
  }
}

export default Comment
