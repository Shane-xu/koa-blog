import * as React from 'react'
import marked from 'marked'
import hljs from 'highlight.js'
import { Loading } from '../common'

interface Props {
  onFetchAbout: () => any
}
interface AboutConfig {
  _id?: string
  content?: string
}
interface State {
  about: AboutConfig
  loading: boolean
}
class About extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      about: {},
      loading: true,
    }
  }

  componentWillMount() {
    const { onFetchAbout } = this.props
    onFetchAbout &&
      onFetchAbout().then(res => {
        this.setState({
          about: res.about,
          loading: false,
        })
      })
  }

  renderContent() {
    const { about } = this.state
    if (!about.content) {
      return null
    }
    const content = marked(about.content)
    return (
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  render() {
    const { loading } = this.state
    if (loading) {
      return <Loading />
    }
    return (
      <div className="content_container">
        <div className="post">
          <div className="post-content">{this.renderContent()}</div>
        </div>
      </div>
    )
  }
}

export default About
