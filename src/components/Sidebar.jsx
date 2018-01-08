import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Search,
  Category,
  Tag,
  Recent,
} from './widget'

const propTypes = {
  tags: PropTypes.array,
  categories: PropTypes.array,
}
class Siderbar extends Component {

  render() {
    const { categories, tags } = this.props
    return (
      <div id="sidebar">
        <Search />
        <Category categories={categories} />
        <Tag tags={tags} />
        <Recent />
      </div>
    )
  }
}

Siderbar.propTypes = propTypes
export default Siderbar

