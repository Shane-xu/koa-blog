import React, { Component } from 'react'

class Comment extends Component {
  handleSubmit = e => {
    e.preventDefault()
  }
  render() {
    return (
      <div className="comment">
        <h3>发布评论</h3>
        <p>
          电子邮件地址不会被公开。 必填项已用<span>*</span>标注
        </p>
        <form>
          <div className="input-group">
            <textarea
              rows="8"
              cols="45"
              placeholder="评论"
              required="required"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="姓名"
              required="required"
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="邮箱"
              required="required"
            />
          </div>
          <div className="input-group">
            <input type="text" name="site" placeholder="站点" />
          </div>
          <input
            type="submit"
            value="发表评论"
            className="submit"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    )
  }
}

export default Comment
