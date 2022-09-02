import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import { Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Banner from '../../components/Banner'
import Seo from '../../components/Seo'
import Breadcrumbs from '../../components/atoms/Breadcrumbs'
import ContainerGrecas from '../../components/molecules/ContainerGrecas'
import BlockGrey from '../../components/atoms/BlockGrey'
import Compartir from '../../components/atoms/Compartir'

const Article = ({ data, pageContext }) => {
  const { title, content, sections, seo_image, seo_description } = data.article

  let sectionParent = ''
  if (data.article.sections[0].strapi_parent)
    sectionParent = data.article.sections[0].strapi_parent
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
  tree.push({
    slug: data.article.sections[0].slug,
    title: data.article.sections[0].title,
  })

  return (
    <Layout linkExterno="/informacion" seoTitle={title}>
      <Seo
        title={title}
        externalImage={seo_image ? seo_image : ''}
        description={
          seo_description
            ? seo_description
            : content.data.content.substring(0, 250)
        }
      />
      <ContainerGrecas title={title}>
        <div className=" xl:flex">
          <article>
            <Breadcrumbs
              homeLink="/informacion"
              homeTitle="Información"
              tree={tree}
              endTitle={title}
            />

            <div className="section-article">
              <MDXRenderer>{content.data.childMdx.body}</MDXRenderer>
            </div>

            {sections.map((section) => (
              <Link
                key={section.slug}
                className="category topic"
                to={`/informacion/${section.slug}`}
              >
                {section.title}
              </Link>
            ))}
          </article>
          <div>
            <Banner
              title="Informacion"
              description="&nbsp;"
              listItems1={listItems1}
            />

            <BlockGrey title="compartir">
              <Compartir url={`/info/${pageContext.slug}`} title={title} />
            </BlockGrey>
          </div>
        </div>
        <br />
      </ContainerGrecas>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String) {
    article: strapiSectionArticle(id: { eq: $id }) {
      slug
      title
      seo_image
      seo_description
      content {
        data {
          content
          childMdx {
            body
          }
        }
      }
      sections {
        slug
        title
        strapi_parent {
          title
          slug
        }
      }
    }
  }
`

export default Article
