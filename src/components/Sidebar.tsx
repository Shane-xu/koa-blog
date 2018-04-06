import * as React from 'react'

import {
  Search,
  Category,
  Tag,
  Recent,
} from './widget'

interface Props {
  tags: Array<any>,
  categories: Array<any>,
  posts: Array<any>,
}

class Siderbar extends React.Component<Props> {
  render() {
    const {
      categories,
      tags,
      posts,
     } = this.props
    return (
      <div id="sidebar">
        <Search />
        <Category categories={categories} />
        <Tag tags={tags} />
        <Recent posts={posts} />
      </div>
    )
  }
}

export default Siderbar

