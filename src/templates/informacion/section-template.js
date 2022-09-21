import React from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { graphql } from 'gatsby'
import Banner from '../../components/Banner'
import BannerAdsense from '../../utilities/BannerAdsense'
import Breadcrumbs from '../../components/atoms/Breadcrumbs'
import ContainerGrecas from '../../components/molecules/ContainerGrecas'
import ItemChevron from '../../components/atoms/ItemChevronRight'
import Compartir from '../../components/atoms/Compartir'
import TopNavSec from '../../components/atoms/TopNavSec'
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next'

const Section = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const sectionTitle = t(data.strapiSection.title)
  const metadata = data.site.siteMetadata
  let sectionParent = ''
  if (data.strapiSection.strapi_parent)
    sectionParent = data.strapiSection.strapi_parent
  let seoDescription = `Artículos Informativos que hablan de ${sectionTitle} en ${metadata.estado.name}, México`
  if (pageContext.language === 'en') {
    seoDescription = `Informative articles that talk about ${sectionTitle} in ${metadata.estado.name}, Mexico`
  }
  const articles = data.articles.nodes
  const sections = data.sections.nodes

  const listItems1 = {
    title: `${t('Secciones')}`,
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
        title={`${sectionTitle} | ${t('información')}`}
        description={seoDescription}
      />

      <ContainerGrecas title={`${t('información')} de ${sectionTitle}`}>
        <div className="section-center">
          <div>
            <Breadcrumbs
              homeLink="/informacion"
              homeTitle="Información"
              tree={tree}
              endTitle={sectionTitle}
            />

            <h3 className="text-red-500 uppercase">{sectionTitle}</h3>
            <BannerAdsense className="h90 mt1 mb1" format="fluid" />
            {sections.length > 0 && (
              <div className=" mb-3">
                <h4>
                  <Trans>Secciones</Trans>
                </h4>

                <ul>
                  {sections.map((item) => {
                    if (pageContext.sections.includes(item.slug)) {
                      return (
                        <li key={item.slug}>
                          <Link to={`/informacion/${item.slug}`}>
                            <ItemChevron text={item.title} />
                          </Link>
                        </li>
                      )
                    } else return ''
                  })}
                </ul>
              </div>
            )}
            {articles.length > 0 && (
              <div className="mb-6">
                <h4>
                  <Trans>Artículos</Trans>
                </h4>
                <ul className="sm:columns-2 xl:columns-3">
                  {articles.map((item) => {
                    return (
                      <li key={item.slug}>
                        <Link to={`/info/${item.slug}`} className="border-b">
                          <ItemChevron text={item.title} />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            <div className=" text-slate-400 w-1/4">
              <Trans>Compartir</Trans>:
              <Compartir
                url={`/info/${pageContext.slug}`}
                title={sectionTitle}
              />
            </div>
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
      <TopNavSec />
    </Layout>
  )
}
export default Section

export const query = graphql`
  query($slug: String!, $estadoSlug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
