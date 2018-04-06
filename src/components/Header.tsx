import * as React from 'react'
import { Link } from 'react-router'
interface Props {}
interface State {
  navs: Array<{
    name: string
    link: string
    icon: string
  }>
}
class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      navs: [
        {
          name: '首页',
          link: '/',
          icon: 'home',
        },
        {
          name: '归档',
          link: '/archives',
          icon: 'archive',
        },
        {
          name: '关于',
          link: '/about',
          icon: 'user',
        },
      ],
    }
  }
  renderNav() {
    const { navs } = this.state
    return navs.map(nav => {
      const iconClass = `fa fa-${nav.icon}`
      return (
        <Link
          to={nav.link}
          key={nav.name}
          activeClassName="current"
          onlyActiveOnIndex
        >
          <i className={iconClass}>{nav.name}</i>
        </Link>
      )
    })
  }

  render() {
    return (
      <div id="header">
        <div className="site-name">
          <h1 className="hidden">Superman Blog</h1>
          <a href="./" id="logo">
            Superman Blog
          </a>
          {/* <p className="description"></p> */}
          <div id="nav-menu">{this.renderNav()}</div>
        </div>
      </div>
    )
  }
}

export default Header
