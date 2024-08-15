import React from 'react'
import { Link } from 'gatsby'
import { ImHome } from 'react-icons/im'
import breadLine from '../../assets/images/breadcrumb.png'

const Breadcrumbs = ({ homeLink, homeTitle, tree, endTitle, singleUrl }) => {
  return (
    <div className="flex flex-wrap list-none p-4" vocab="http://schema.org/" typeof="BreadcrumbList">
      <Link to="/" title="Home" className="home">
        <ImHome />
      </Link>
      <span property="itemListElement" typeof="ListItem" className="breadcrumb ml-2">
        <Link property="item" typeof="WebPage" to={homeLink}>
          <span property="name">{homeTitle}</span>
        </Link>
        <meta property="position" content="1" />
      </span>
      {tree.map((item, index) => {
        let linkTo = `${homeLink}/${item.slug}`
        if (singleUrl) linkTo = `/${item.slug}`
        return (
          <div key={index} className="breadcrumb ml-2" property="itemListElement" typeof="ListItem">
            <span className="mx-2 text-gray-500">/</span>
            <Link property="item" typeof="WebPage" to={linkTo}>
              <span property="name">{item.title}</span>
            </Link>
            <meta property="position" content={index + 2} />
          </div>
        )
      })}
      <span className="breadcrumb ml-2">
        <span className="mx-2 text-gray-500">/</span>
        {endTitle}
      </span>
      <div className="w-full h-2 mt-2" style={{ backgroundImage: `url(${breadLine})` }}></div>
    </div>
  )
}

export default Breadcrumbs
