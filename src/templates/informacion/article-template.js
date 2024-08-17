import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../../components/Layout'
import { Link } from 'gatsby'
import Banner from '../../components/Banner'
import Seo from '../../components/Seo'
import Breadcrumbs from '../../components/atoms/Breadcrumbs'
import ContainerGrecas from '../../components/molecules/ContainerGrecas'
import BlockGrey from '../../components/atoms/BlockGrey'
import Compartir from '../../components/atoms/Compartir'
import TopNavSec from '../../components/atoms/TopNavSec'

const Article = ({ data, pageContext }) => {
  // const { title, content, sections, seo_image, seo_description } = data.article
  const { title, content } = data.article

  let items = [];
	pageContext.sectionsMaster.map((section, index) => {
		const slug = section.secname
			.replace(/\s+/g, "_")
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		const item = {
			slug: slug,
			title: section.secname,
		};
		items.push(item);
	});

	const listItems1 = {
		title: "Secciones",
		items: items,
		linkTo: "informacion",
	};

  let tree = [];
		let item = {
			slug: data.section.secname
				.replace(/\s+/g, "_")
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, ""),
			title: data.section.secname,
		};
    tree.push(item);


  return (
    <Layout linkExterno="/informacion" seoTitle={title}>
      <Seo
        title={title}
        // externalImage={seo_image ? seo_image : ''}
        // description={
        //   seo_description
        //     ? seo_description
        //     : content.data.content.substring(0, 250)
        // }
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

           
            <div className="section-article p-4" dangerouslySetInnerHTML={{ __html: content }} />

            {/* {sections.map((section) => (
              <Link
                key={section.slug}
                className="category topic"
                to={`/informacion/${section.slug}`}
              >
                {section.title}
              </Link>
            ))} */}
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
      <TopNavSec />
    </Layout>
  )
}

export default Article


export const pageQuery = graphql`
  query($artid: String!, $secid: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    article: sectionArticle(artid: { eq: $artid }) {
      title
      content
    }
    section: section(secid: { eq: $secid }) {
      secname
      parentid
    }
  }
`
