import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { Loading } from './common'

const propTypes = {
  tags: PropTypes.array,
  categories: PropTypes.array,
  posts: PropTypes.array,
  onFetchTags: PropTypes.func,
  onFetchCategories: PropTypes.func,
  onFetchLastPosts: PropTypes.func
};

const contextTypes = {
  router: PropTypes.object,
};

const childContextTypes = {
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ready: false,
    }
  }

  getChildContext() {
  }
  componentWillMount() {
    this.initData()
  }

  initData = () => {
    const {
      onFetchTags,
      onFetchCategories,
      onFetchLastPosts,
     } = this.props
    const init = []
    init.push(new Promise((resolve) => {
      onFetchTags().then(resolve);
    }))
    init.push(new Promise((resolve) => {
      onFetchCategories().then(resolve);
    }))
    init.push(new Promise((resolve) => {
      onFetchLastPosts().then(resolve);
    }))
    Promise.all(init)
      .then(() => {
        this.setState({ ready: true })
      })
  }

  render() {
    const { ready } = this.state
    const {
      children,
      tags,
      categories,
      posts,
    } = this.props;
    if (!ready) {
      return <Loading />
    }
    return (
      <div className="body_container">
        <Header />
        <div id="layout" className="pure-g">
          <div className="pure-u-1 pure-u-md-3-4">
            {children}
          </div>
          <div className="pure-u-1-4 hidden_mid_and_down">
            <Sidebar
              tags={tags}
              categories={categories}
              posts={posts}
            />
          </div>
          <div className="pure-u-1 pure-u-md-3-4" >
            <Footer />
          </div>
        </div>

      </div>
    );
  }
}

App.propTypes = propTypes;
App.contextTypes = contextTypes;
App.childContextTypes = childContextTypes;

export default App;

