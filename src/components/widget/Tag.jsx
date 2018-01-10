import React from 'react'
import { Link } from 'react-router'

const Tag = (props) => (
  <div className="widget" >
    <div className="widget-title" >
      <i className="fa fa-star-o" >标签</i>
    </div>
    <div className="tagcloud" >
      {props.tags.map(tag => (
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
      ))}
    </div>
  </div >
)

export default Tag
