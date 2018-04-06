import * as React from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { Loading } from './common'

interface Props {
  tags: Array<any>,
  categories: Array<any>,
  posts: Array<any>,
  onFetchTags: () => Promise<any>,
  onFetchCategories: () => Promise<any>,
  onFetchLastPosts: () => Promise<any>
}

interface State {
  ready: boolean
}
interface contextTypes {
  router: any
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ready: false,
    }
  }

  getChildContext() {}
  componentWillMount() {
    this.initData()
  }

  initData = () => {
    const { onFetchTags, onFetchCategories, onFetchLastPosts } = this.props
    const init = []
    init.push(
      new Promise(resolve => {
        onFetchTags().then(resolve)
      }),
    )
    init.push(
      new Promise(resolve => {
        onFetchCategories().then(resolve)
      }),
    )
    init.push(
      new Promise(resolve => {
        onFetchLastPosts().then(resolve)
      }),
    )
    Promise.all(init).then(() => {
      this.setState({ ready: true })
    })
  }

  render() {
    const { ready } = this.state
    const { children, tags, categories, posts } = this.props
    if (!ready) {
      return <Loading />
    }
    return (
      <div className="body_container">
        <Header />
        <div id="layout" className="pure-g">
          <div className="pure-u-1 pure-u-md-3-4">{children}</div>
          <div className="pure-u-1-4 hidden_mid_and_down">
            <Sidebar tags={tags} categories={categories} posts={posts} />
          </div>
          <div className="pure-u-1 pure-u-md-3-4">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default App
