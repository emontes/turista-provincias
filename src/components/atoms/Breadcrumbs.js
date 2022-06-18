import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Breadcrumbs = ({ homeLink, homeTitle, tree, endTitle, singleUrl }) => {
  return (
    <Wrapper vocab="http://schema.org/" typeof="BreadcrumbList">
      <span property="itemListElement" typeof="ListItem">
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
    </Wrapper>
  )
}

export default Breadcrumbs

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  list-style: none;
  background-color: var(--clr-grey-10);
  border-radius: 0.25rem;

  .breadcrumb {
    ::before {
      display: inline-block;
      padding-right: 0.5rem;
      padding-left: 0.5rem;
      color: #6c757d;
      content: '/';
    }
  }
`
