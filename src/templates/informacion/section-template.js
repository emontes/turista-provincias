import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import Banner from '../../components/Banner'
import BannerAdsense from '../../utilities/BannerAdsense'

const Section = ({ data, pageContext }) => {
  const sectionTitle = data.strapiSection.title
  let sectionParent = ''
  if (data.strapiSection.strapi_parent)
    sectionParent = data.strapiSection.strapi_parent
  const seoDescription = `Artículos Informativos que hablan de ${sectionTitle} en Chiapas, México`
  const articles = data.articles.nodes
  const sections = data.sections.nodes

  const listItems1 = {
    title: 'Secciones',
    items: pageContext.sectionsMaster,
    linkTo: 'informacion',
  }

  return (
    <Layout seoTitle={sectionTitle} linkExterno="/informacion">
      <Seo
        title={`${sectionTitle} | Información`}
        description={seoDescription}
      />
      <section className=" nav_main">
        <h2 className="nav_main--h2">{sectionTitle}</h2>
        <div className="economy_bg">
          <div className="nav_link_details">
            <div className="section-center">
              <div>
                <div className="breadcrumb">
                  <Link to="/informacion">Información</Link>
                  {' > '}
                  {sectionParent && (
                    <>
                      <Link to={`/informacion/${sectionParent.slug}`}>
                        {sectionParent.title}
                      </Link>
                      {' > '}
                    </>
                  )}

                  {sectionTitle}
                </div>

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
          </div>
        </div>
      </section>
    </Layout>
  )
}
export default Section

export const query = graphql`
  query($slug: String!) {
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
        estado: { slug: { eq: "chiapas" } }
        sections: { elemMatch: { slug: { eq: $slug } } }
      }
    ) {
      nodes {
        title
        slug
      }
    }
  }
`
