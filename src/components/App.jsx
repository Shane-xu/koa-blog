import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import Loading from './common/Loading'

const propTypes = {
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
    // const init = []
    // init.push(new Promise((resolve) => {
    //   loggedIn() && fetchMenu().then(resolve);
    // }))

    // Promise.all(init)
    //   .then(() => {
    //     this.setState({ ready: true })
    //   })
  }

  handleOnToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  renderLoading() {
    return (
      <Loading />
    )
  }

  render() {
    const { children } = this.props;

    return (
      <div className="body_container">
        <Header />
        <div id="layout" className="pure-g">
          <div className="pure-u-1 pure-u-md-3-4">
            {children}
          </div>
          <div className="pure-u-1-4 hidden_mid_and_down">
            <Sidebar />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = propTypes;
App.contextTypes = contextTypes;
App.childContextTypes = childContextTypes;

export default App;

