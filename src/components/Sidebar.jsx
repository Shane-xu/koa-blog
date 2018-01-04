import React, { Component } from 'react'
import {
  Search,
  Category,
  Tag,
  Recent,
} from './widget'

class Siderbar extends Component {

  render() {
    return (
      <div id="sidebar">
        <Search />
        <Category />
        <Tag />
        <Recent />
      </div>
    )
  }
}

export default Siderbar

