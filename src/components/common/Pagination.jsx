import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  CURRENT,
  PAGE_SIZE
} from '../../constants/Pagination'

const propTypes = {
  // 当前页数
  current: PropTypes.number,
  // 每页条数
  pageSize: PropTypes.number,
  // 总数
  total: PropTypes.number,
  // 页码发生变化的回调
  onChange: PropTypes.func,
}

const defaultProps = {
  current: CURRENT,
  pageSize: PAGE_SIZE,
}

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: props.current
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      this.setState({
        current: nextProps.current
      })
    }
  }

  handleOnchange = (current) => {
    const { onChange } = this.props
    if (typeof current !== 'number') {
      throw new Error('current should be number')
    }
    this.setState({
      current
    })
    onChange && onChange(current)
  }

  handlePrev = () => {
    const { current } = this.state
    const nextCurrent = current - 1
    this.handleOnchange(nextCurrent)
  }

  handleNext = () => {
    const { current } = this.state
    const nextCurrent = current + 1
    this.handleOnchange(nextCurrent)
  }

  renderNumbers() {
    const { current } = this.state
    const { pageSize, total } = this.props;
    const length = Math.ceil(total / pageSize);
    const items = []
    for (let i = 1; i <= length; i += 1) {
      items.push(i)
    }
    return items.map((index) => {
      const isActive = index === current
      let cls = classNames({
        'page-number': true,
        current: isActive,
      })
      return (
        isActive ?
          <span className={cls} key={index}>{index}</span>
          :
          <span
            className={cls}
            key={index}
            onClick={() => this.handleOnchange(index)}
          >
            {index}
          </span>
      )
    })
  }

  renderPrev() {
    const { current } = this.state
    return current > 1 ?
      (
        <span
          className="extend prev"
          onClick={this.handlePrev}
        >
          上一页
        </span>
      ) :
      null
  }

  renderNext() {
    const { current } = this.state
    const { total, pageSize } = this.props
    const length = Math.ceil(total / pageSize);
    return current < length ?
      (
        <span
          className="extend next"
          onClick={this.handleNext}
        >
          下一页
        </span>
      ) :
      null
  }

  render() {
    return (
      <nav className="page-navigator" >
        {this.renderPrev()}
        {this.renderNumbers()}
        {this.renderNext()}
      </nav>
    )
  }
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps

export default Pagination
