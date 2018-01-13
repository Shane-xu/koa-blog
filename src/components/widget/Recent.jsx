import React from 'react'
import { Link } from 'react-router'
const Recent = ({ posts }) => (
  <div className="widget" >
    <div className="widget-title" >
      <i className="fa fa-file-o" >最近文章</i>
    </div>
    <ul className="post-list" >
      {posts.map(post => (
        <li className="post-list-item" key={post._id} >
          <Link
            className="post-list-link"
            to={{ pathname: `post/${post._id}` }}
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default Recent
