import React from 'react'
import PropTypes from 'prop-types'

interface ContextTypes {
  router: any
}
class Search extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { router } = this.context
    // enter
    if (e.keyCode === 13 && e.currentTarget.value !== '') {
      router.push({
        pathname: '/posts',
        query: {
          word: e.currentTarget.value.trim(),
        },
      })
    }
  }

  render() {
    return (
      <div className="widget">
        <div className="search-form">
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
export default Search
