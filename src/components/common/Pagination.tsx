import * as React from 'react'
import classNames from 'classnames'
import { PAGE, PAGE_SIZE } from '../../constants/Pagination'

interface IOnchange {
  (page: number): void
}
interface IPaginationProps {
  page?: number // 当前页数
  pageSize?: number // 每页条数
  total: number // 总数
  onChange: IOnchange // 页码发生变化的回调
}

interface IDefaultProps {
  page?: number
  pageSize?: number
}

type State = {
  page?: number
}

class Pagination extends React.Component<
  IPaginationProps & IDefaultProps,
  State
> {
  static defaultProps: IDefaultProps = {
    page: PAGE,
    pageSize: PAGE_SIZE,
  }

  constructor(props: IPaginationProps) {
    super(props)
    this.state = {
      page: props.page,
    }
  }

  componentWillReceiveProps(nextProps: IPaginationProps) {
    if (nextProps.page !== this.props.page) {
      this.setState({
        page: nextProps.page,
      })
    }
  }

  handleOnchange = (page: number) => {
    const { onChange } = this.props
    if (typeof page !== 'number') {
      throw new Error('page should be number')
    }
    this.setState({
      page,
    })
    onChange && onChange(page)
  }

  handlePrev = () => {
    const { page } = this.state
    const nextpage = page - 1
    this.handleOnchange(nextpage)
  }

  handleNext = () => {
    const { page } = this.state
    const nextpage = page + 1
    this.handleOnchange(nextpage)
  }

  renderNumbers() {
    const { page } = this.state
    const { pageSize, total } = this.props
    const length = Math.ceil(total / pageSize)
    const items = []
    for (let i = 1; i <= length; i += 1) {
      items.push(i)
    }
    return items.map(index => {
      const isActive = index === page
      let cls = classNames({
        'page-number': true,
        current: isActive,
      })
      return isActive ? (
        <span className={cls} key={index}>
          {index}
        </span>
      ) : (
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
    const { page } = this.state
    return page > 1 ? (
      <span className="extend prev" onClick={this.handlePrev}>
        上一页
      </span>
    ) : null
  }

  renderNext() {
    const { page } = this.state
    const { total, pageSize } = this.props
    const length = Math.ceil(total / pageSize)
    return page < length ? (
      <span className="extend next" onClick={this.handleNext}>
        下一页
      </span>
    ) : null
  }

  render() {
    return (
      <nav className="page-navigator">
        {this.renderPrev()}
        {this.renderNumbers()}
        {this.renderNext()}
      </nav>
    )
  }
}

export default Pagination
