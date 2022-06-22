import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { ImHome } from 'react-icons/im'
import breadLine from '../../assets/images/breadcrumb.png'

const Breadcrumbs = ({ homeLink, homeTitle, tree, endTitle, singleUrl }) => {
  return (
    <Wrapper vocab="http://schema.org/" typeof="BreadcrumbList">
      <Link to="/" title="Home" className="home">
        <ImHome />
      </Link>
      <span property="itemListElement" typeof="ListItem" className="breadcrumb">
        <Link property="item" typeof="WebPage" to={homeLink}>
          <span property="name">{homeTitle}</span>
        </Link>
        <meta property="position" content="1" />
      </span>
      {tree.map((item, index) => {
        let linkTo = `${homeLink}/${item.slug}`
        if (singleUrl) linkTo = `/${item.slug}`
        return (
          <div
            key={index}
            className="breadcrumb"
            property="itemListElement"
            typeof="ListItem"
          >
            <Link property="item" typeof="WebPage" to={linkTo}>
              <span property="name">{item.title}</span>
            </Link>
            <meta property="position" content={index + 2} />
          </div>
        )
      })}
      <span className="breadcrumb">{endTitle}</span>
      <div className="brlines"></div>
    </Wrapper>
  )
}

export default Breadcrumbs

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 1rem;

  .breadcrumb {
    ::before {
      display: inline-block;
      padding-right: 0.5rem;
      padding-left: 0.5rem;
      color: #6c757d;
      content: '/';
    }
  }

  .home {
    width: 21px;
    height: 21px;
    background-color: #fff;
    border-radius: 100px;
    padding: 2px 3px 0;
    transition: 0.3s;
    :hover {
      background-color: #222;
      color: #fff;
    }
  }

  .brlines {
    height: 8px;
    width: 100%;
    margin: 10px 0 0;
    background: url(${breadLine});
  }
`
