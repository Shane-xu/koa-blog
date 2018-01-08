import React from 'react'

const Category = ({categories}) => (
  <div className="widget" >
    <div className="widget-title" >
      <i className="fa fa-folder-o" >分类</i>
    </div>
    <ul className="category-list" >
      {categories.map((cate) => {
        return (
          <li className="category-list-item" key={cate._id}>
            <a href="#">{cate.name}</a>
          </li>
        )
      })}
    </ul>
  </div>
)

export default Category
