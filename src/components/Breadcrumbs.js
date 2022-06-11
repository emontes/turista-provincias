import React from 'react'
import { Link } from 'gatsby'

const Breadcrumbs = ({ homeLink, homeTitle, tree, endTitle, singleUrl }) => {
  console.log('El afamado tree en Bradcrumbs: ', tree)
  return (
    <div
      className="breadcrumb"
      itemScope
      itemType="http://data-vocabulary.org/Breadcrumb"
    >
      <Link itemProp="url" to={homeLink}>
        <span itemProp="title">{homeTitle}</span>
      </Link>
      {' > '}
      {tree.map((item, index) => {
        let linkTo = `${homeLink}/${item.slug}`
        if (singleUrl) linkTo = `/${item.slug}`
        return (
          <>
            <div
              key={index}
              itemScope
              itemType="http://data-vocabulary.org/Breadcrumb"
            >
              <Link itemProp="url" to={linkTo}>
                <span itemProp="title">{item.title}</span>
              </Link>
            </div>
            {' > '}
          </>
        )
      })}
      <div>{endTitle}</div>
    </div>
  )
}

export default Breadcrumbs
