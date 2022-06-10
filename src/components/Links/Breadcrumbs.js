import React from 'react'
import { Link } from 'gatsby'

const BreadLink = ({ category }) => {
  return (
    <>
      <Link to={`/${category.slug}`}>{category.title}</Link>
      {' > '}
    </>
  )
}

const Breadcrumbs = ({ category, tree }) => {
  return (
    <div className="breadcrumb">
      <Link to="/links.html">Directorio</Link>
      {' > '}
      {tree.map((item) => {
        return <BreadLink category={item} />
      })}
      {category.title}
    </div>
  )
}

export default Breadcrumbs
