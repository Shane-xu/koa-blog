import React, { Component } from 'react'
import { format } from 'date-fns'
import { CONF_DATE } from '../../constants/Conf'

class Archive extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [{
        id: 1,
        title: 'post1',
        createTime: Date.now()
      }, {
        id: 2,
        title: 'post2',
        createTime: Date.now()
      }, {
        id: 3,
        title: 'post3',
        createTime: Date.now()
      }, {
        id: 4,
        title: 'post4',
        createTime: Date.now()
      }, {
        id: 5,
        title: 'post5',
        createTime: Date.now()
      }, {
        id: 6,
        title: 'post6',
        createTime: Date.now()
      }, {
        id: 7,
        title: 'post7',
        createTime: Date.now()
      }]
    }
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
      </div>
    )
  }
}

export default Archive
