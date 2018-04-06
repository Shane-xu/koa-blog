import React from 'react'
import { Link } from 'react-router'

interface Props {
  tags: Array<any>
}

interface ITag {
  _id: string
  name: string
}

const Tag: React.SFC<Props> = props => (
  <div className="widget">
    <div className="widget-title">
      <i className="fa fa-star-o">标签</i>
    </div>
    <div className="tagcloud">
      {props.tags.map((tag: ITag) => (
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
      ))}
    </div>
  </div>
)

export default Tag
