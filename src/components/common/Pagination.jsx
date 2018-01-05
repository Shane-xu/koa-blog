import React, { Component } from 'react';
import classNames from 'classnames'

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: {
        page: 1,
        pageSize: 10,
        total: 40
      }
    }
  }

  renderNumbers() {
    const { pageSize, total, page } = this.state.option;
    const length = total / pageSize;
    const items = []
    for (let i = 1; i <= length; i += 1) {
      items.push(i)
    }
    return items.map((index) => {
      const isActive = index === page
      let cls = classNames({
        'page-number': true,
        current: isActive,
      })
      return (
        isActive ?
          <span className={cls} key={index}>{index}</span>
          :
          <a href="void(0)" className={cls} key={index}>{index}</a>
      )
    })
  }

  render() {
    return (
      <nav className="page-navigator" >
        <a href="#" className="extend prev">上一页</a>
        {this.renderNumbers()}
        <a href="#" className="extend next">下一页</a>
      </nav>
    )
  }
}

export default Pagination
