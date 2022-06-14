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
        {' > '}
      </span>
      {tree.map((item, index) => {
        let linkTo = `${homeLink}/${item.slug}`
        if (singleUrl) linkTo = `/${item.slug}`
        return (
          <>
            <div key={index} property="itemListElement" typeof="ListItem">
              <Link property="item" typeof="WebPage" to={linkTo}>
                <span property="name">{item.title}</span>
              </Link>
              <meta property="position" content={index + 2} />
            </div>
            {' > '}
          </>
        )
      })}
      <span>{endTitle}</span>
    </Wrapper>
  )
}

export default Breadcrumbs

const Wrapper = styled.div`
  padding: 0.8rem 1.5rem;
  margin-bottom: 2rem;
  background: var(--clr-grey-10);
  border-radius: var(--radius);
  display: flex;
  gap: 4px;
`
