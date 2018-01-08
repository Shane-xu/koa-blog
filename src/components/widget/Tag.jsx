import React from 'react'

const tags = [
  {
    id: 1,
    name: 'tag1'
  },
  {
    id: 2,
    name: 'tag2'
  },
  {
    id: 3,
    name: 'tag3'
  },
  {
    id: 4,
    name: 'tag4'
  },
  {
    id: 5,
    name: 'tag5'
  },
  {
    id: 6,
    name: 'tag6'
  },
  {
    id: 7,
    name: 'tag7'
  },
]
const Tag = (props) => (
  <div className="widget" >
    <div className="widget-title" >
      <i className="fa fa-star-o" >标签</i>
    </div>
    <div className="tagcloud" >
      {props.tags.map(tag => (
        <a
          href="#"
          key={tag._id}
          style={{ fontSize: 15 }}
        >
          {tag.name}
        </a>
      ))}
    </div>
  </div >
)

export default Tag
