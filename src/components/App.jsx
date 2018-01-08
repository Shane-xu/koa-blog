import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { Loading } from './common'

const propTypes = {
  tags: PropTypes.array,
  categories: PropTypes.array,
  fetchTags: PropTypes.func,
  fetchCategories: PropTypes.func
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
    const { fetchTags, fetchCategories } = this.props
    const init = []
    init.push(new Promise((resolve) => {
      fetchTags().then(resolve);
    }))
    init.push(new Promise((resolve) => {
      fetchCategories().then(resolve);
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

