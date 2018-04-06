import * as React from 'react'
import { Link } from 'react-router'

interface Props {
  categories: Array<any>
}

const Category: React.SFC<Props> = ({ categories }) => (
  <div className="widget" >
    <div className="widget-title" >
      <i className="fa fa-folder-o" >分类</i>
    </div>
    <ul className="category-list" >
      {categories.map((cate) => {
        return (
          <li className="category-list-item" key={cate._id}>
            <Link
              to={{
                pathname: '/archives',
                query: {
                  category: cate._id
                }
              }}
            >
              {cate.name}
            </Link>
          </li>
        )
      })}
    </ul>
  </div>
)

export default Category
