import React, { Component } from 'react'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {}
    }
  }
  render() {
    return (
      <div className="content_container" >
        <div className="post" >
          <div className="post-content">
            About Me
          </div>
        </div>
      </div>
    )
  }
}

export default About
