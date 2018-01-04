import React from 'react'

const recents = [
  {
    id: 1,
    name: '文章1',
    link: '#'
  },
  {
    id: 2,
    name: '文章2',
    link: '#'
  },
  {
    id: 3,
    name: '文章3',
    link: '#'
  },
  {
    id: 4,
    name: '文章4',
    link: '#'
  },
  {
    id: 5,
    name: '文章5',
    link: '#'
  },
  {
    id: 6,
    name: '文章6',
    link: '#'
  },
  {
    id: 7,
    name: '文章7',
    link: '#'
  }
]
const Recent = () => (
  <div className="widget" >
    <div className="widget-title" >
      <i className="fa fa-file-o" >最近文章</i>
    </div>
    <ul className="post-list" >
      {recents.map(post => (
        <li className="post-list-item" key={post.id} >
          <a
            className="post-list-link"
            href={post.link}
          >
            {post.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

export default Recent
