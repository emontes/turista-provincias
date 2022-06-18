import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import Banner from '../../components/Banner'
import BannerAdsense from '../../utilities/BannerAdsense'
import Breadcrumbs from '../../components/atoms/Breadcrumbs'
import ContainerGrecas from '../../components/molecules/ContainerGrecas'

const Section = ({ data, pageContext }) => {
  const sectionTitle = data.strapiSection.title
  const metadata = data.site.siteMetadata
  let sectionParent = ''
  if (data.strapiSection.strapi_parent)
    sectionParent = data.strapiSection.strapi_parent
  const seoDescription = `Artículos Informativos que hablan de ${sectionTitle} en ${metadata.estado.name}, México`
  const articles = data.articles.nodes
  const sections = data.sections.nodes

  const listItems1 = {
    title: 'Secciones',
    items: pageContext.sectionsMaster,
    linkTo: 'informacion',
  }

  let tree = []
  if (sectionParent) {
    let item = {
      slug: sectionParent.slug,
      title: sectionParent.title,
    }
    tree.push(item)
  }

  return (
    <Layout seoTitle={sectionTitle} linkExterno="/informacion">
      <Seo
        title={`${sectionTitle} | Información`}
        description={seoDescription}
      />
      <ContainerGrecas title={`Información de ${sectionTitle}`}>
        <div className="section-center">
          <div>
            <Breadcrumbs
              homeLink="/informacion"
              homeTitle="Información"
              tree={tree}
              endTitle={sectionTitle}
            />

            <h3 className="section-title">{sectionTitle}</h3>
            {sections.length > 0 && (
              <>
                <h4>Secciones</h4>
                <ul>
                  {sections.map((item) => {
                    if (pageContext.sections.includes(item.slug)) {
                      return (
                        <li key={item.slug}>
                          <Link to={`/informacion/${item.slug}`}>
                            {item.title}
                          </Link>
                        </li>
                      )
                    } else return ''
                  })}
                </ul>
                <br />
              </>
            )}
            {articles.length > 0 && (
              <>
                <h4>Artículos</h4>
                <ul>
                  {articles.map((item) => {
                    return (
                      <li key={item.slug}>
                        <Link to={`/info/${item.slug}`}>{item.title}</Link>
                      </li>
                    )
                  })}
                </ul>
              </>
            )}
            <BannerAdsense />
          </div>
          <div style={{ padding: '0 1rem 1rem' }}>
            <Banner
              title="Información"
              description={seoDescription}
              listItems1={listItems1}
            />
          </div>
        </div>
      </ContainerGrecas>
    </Layout>
  )
}
export default Section

export const query = graphql`
  query($slug: String!, $estadoSlug: String!) {
    strapiSection(slug: { eq: $slug }) {
      title
      strapi_parent {
        title
        slug
      }
    }
    sections: allStrapiSection(
      filter: { strapi_parent: { slug: { eq: $slug } } }
    ) {
      nodes {
        title
        slug
      }
    }
    articles: allStrapiSectionArticle(
      filter: {
        estado: { slug: { eq: $estadoSlug } }
        sections: { elemMatch: { slug: { eq: $slug } } }
      }
    ) {
      nodes {
        title
        slug
      }
    }
    site {
      siteMetadata {
        description
        estado {
          name
          slug
          slogan
        }
      }
    }
  }
`
