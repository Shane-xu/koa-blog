import React from 'react'
import PropTypes from 'prop-types'

const contextTypes = {
  router: PropTypes.object,
}
class Search extends React.Component {

  handleSearch = (e) => {
    const { router } = this.context
    // enter
    if (e.keyCode === 13 && e.target.value !== '') {
      router.push({
        pathname: '/posts',
        query: {
          word: e.target.value.trim()
        }
      })
    }
  }

  render() {
    return (
      <div className="widget">
        <div className="search-form" >
          <input
            type="text"
            placeholder="Search"
            onKeyDown={this.handleSearch}
          />
        </div>
      </div>
    )
  }
}

Search.contextTypes = contextTypes
export default Search
