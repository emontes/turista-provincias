import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { FcFolder } from 'react-icons/fc'
import Banner from '../Banner'
import LinkCard from './link-card'
import Title from './Title'
import Breadcrumbs from './Breadcrumbs'

const Links = ({
  category,
  tree,
  linksCategories,
  links = [],
  title,
  subtitle,
  metadata,
}) => {
  return (
    <Wrapper className="nav_main">
      <h2 className="nav_main--h2">{title}</h2>
      <div className="economy_bg">
        <div className="nav_link_details">
          <div className="section-center">
            <div>
              {category ? (
                <Breadcrumbs category={category} tree={tree} />
              ) : (
                <h3 className="section-title">{subtitle}</h3>
              )}

              {linksCategories.length > 0 && (
                <>
                  <p style={{ margin: '0 0 -2.2rem' }}>
                    Seleccione una categoría.
                  </p>
                  <ul>
                    {linksCategories.map((item) => {
                      let slug = item.slug

                      return (
                        <li key={item.slug}>
                          <Link
                            className={`category ${
                              item.featured ? 'featured' : ''
                            }`}
                            to={`/${slug}`}
                          >
                            <FcFolder /> {item.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  {links.length > 0 && <Title title="Listado de Sitios Web" />}
                </>
              )}
              {links.length > 0 &&
                links.map((item, index) => (
                  <LinkCard key={index} link={item} />
                ))}

              <h4>El directorio de enlaces web de {metadata.estado.name}</h4>
            </div>
            <div style={{ padding: '0 1rem' }}>
              <Banner title={title} description={subtitle} />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Links

const Wrapper = styled.section`
  ul {
    display: flex;
    flex-wrap: wrap;

    gap: 1rem;
    margin: 3rem auto 4rem;
  }
  .underline {
    width: 80%;
    height: 1px;
    background: var(--clr-grey-9);
    margin: 1rem auto;
    margin-bottom: 1rem;
  }
  .featured {
    border: 3px solid ${(props) => props.theme.colors.primary5}; !important ;
  }
  .category {
    display: block;
    width: 15rem;
    border: 1px solid var(--clr-grey-5);
    border-radius: var(--radius);
    box-shadow: var(--light-shadow);
    padding: 0.6rem;
    background: var(--clr-white);
    color: var(--clr-grey-8);
    font-size: 1rem;

    margin-right: 1.5rem;
    transition: var(--transition);
    :hover {
      background: var(--clr-grey-5);
      box-shadow: var(--dark-shadow);
      color: var(--clr-grey-10);
    }
  }
`
