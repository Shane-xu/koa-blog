import React, { Component } from 'react'
import { Link } from 'react-router'

class Header extends Component {
  constructor(props) {
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
          <hi className="hidden">Superman Blog</hi>
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
