import React from 'react'

const categories = [
  {
    id: 1,
    name: '分类1'
  }, {
    id: 2,
    name: '分类2'
  }, {
    id: 3,
    name: '分类3'
  }, {
    id: 4,
    name: '分类4'
  }
]
const Category = () => (
  <div className="widget" >
    <div className="widget-title" >
      <i className="fa fa-folder-o" >分类</i>
    </div>
    <ul className="category-list" >
      {categories.map((cate) => {
        return (
          <li className="category-list-item" key={cate.id}>
            <a href="#">{cate.name}</a>
          </li>
        )
      })}
    </ul>
  </div>
)

export default Category
